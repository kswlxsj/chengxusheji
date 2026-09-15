// 噪点色阶层级数：离散色阶，派生 thresholds
const PALETTE_LEVELS = 15;

const NOISE_CONFIG = Object.freeze({
  targetPixelSize: 6,
  minWidth: 96,
  maxWidth: 280,
  maxHeight: 220,
  // 噪点帧间隔 ms（33≈30FPS）
  frameInterval: 33,
  paletteTransitionDurationMs: 300,
  paletteTransitionEpsilon: 0.0005,
  baseFrequency: 4.1,
  secondOctaveWeight: 0.46,
  secondOctaveTemporalMultiplier: 2.65,
  speed: 0.000026,
  temporalSpeed: 0.00002,
  amplitude: 1.28,
  seed: 41,
  directionChangeMinMs: 1400,
  directionChangeMaxMs: 3200,
  directionResponseMs: 450,
  primaryPaletteVariables: ["--ink", "--wine", "--ochre", "--peach", "--ice"],
  secondaryPaletteVariables: [
    "--noise-secondary-deep",
    "--noise-secondary-slate",
    "--noise-secondary-periwinkle",
    "--noise-secondary-coral",
    "--noise-secondary-frost",
  ],
  paletteLevels: PALETTE_LEVELS,
  thresholds: Array.from(
    { length: PALETTE_LEVELS - 1 },
    (_, index) => (index + 1) / PALETTE_LEVELS,
  ),
  paletteTransitionStartRatio: 0.5,
  maxScrollSpeedMultiplier: 24,
  scrollVelocityForMaxSpeed: 2,
  scrollSpeedRiseMs: 90,
  scrollSpeedDecayMs: 500,
  // “滚动中”判定窗口 ms：停止则平滑回落
  scrollBoostRecentMs: 250,
  maxAnimationStepMs: 250,
});

// 内容滚轮灵敏度：小=短距
const CONTENT_SCROLL_SENSITIVITY = 0.5;

// 平滑滚动时长 ms
const SMOOTH_SCROLL_DURATION_MS = 180;

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

// 平滑滚轮滚动：累积目标位 + rAF 缓动，防 scrollTop 跳变
// trapAlways=true（弹窗）恒吞滚轮防透传；false（简介）仅溢出时接管
function createSmoothWheelScroller(element, trapAlways) {
  let target = element.scrollTop;
  let rafId = null;
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function step(start, startTime) {
    const progress = Math.min((performance.now() - startTime) / SMOOTH_SCROLL_DURATION_MS, 1);
    element.scrollTop = start + (target - start) * easeOutCubic(progress);

    if (progress < 1) {
      rafId = requestAnimationFrame(() => step(start, startTime));
    } else {
      element.scrollTop = target;
      rafId = null;
    }
  }

  function handleWheel(event) {
    if (event.deltaY === 0 && event.deltaX === 0) return;

    const canScroll = element.scrollHeight > element.clientHeight;
    if (!trapAlways && !canScroll) return;

    const lineHeight = Number.parseFloat(window.getComputedStyle(element).lineHeight) || 16;
    const scrollAmount = event.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? event.deltaY * lineHeight
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? event.deltaY * element.clientHeight
        : event.deltaY;

    const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
    const start = element.scrollTop;
    if (rafId === null) target = start;

    target = clamp(target + scrollAmount * CONTENT_SCROLL_SENSITIVITY, 0, maxScroll);

    // reduced-motion：直接跳位，免动画
    if (reduceMotionQuery.matches) {
      stop();
      element.scrollTop = target;
      event.preventDefault();
      return;
    }

    const startTime = performance.now();
    stop();
    rafId = requestAnimationFrame(() => step(start, startTime));
    event.preventDefault();
  }

  function reset() {
    stop();
    target = element.scrollTop;
  }

  return { handleWheel, reset };
}

function hexToRgb(hex) {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function readCssPalette(variableNames) {
  const rootStyles = window.getComputedStyle(document.documentElement);

  return variableNames.map((variableName) => {
    const value = rootStyles.getPropertyValue(variableName).trim();

    if (!/^#[\da-f]{6}$/i.test(value)) {
      throw new Error(`CSS color variable ${variableName} must use the #rrggbb format.`);
    }

    return hexToRgb(value);
  });
}

function createDiscretePalette(stopColors, levels) {
  return Array.from({ length: levels }, (_, index) => {
    const position = (index / (levels - 1)) * (stopColors.length - 1);
    const startIndex = Math.min(Math.floor(position), stopColors.length - 2);
    const amount = position - startIndex;

    return stopColors[startIndex].map((channel, channelIndex) =>
      Math.round(channel + (stopColors[startIndex + 1][channelIndex] - channel) * amount),
    );
  });
}

function mixPalettes(primaryPalette, secondaryPalette, amount) {
  return primaryPalette.map((primaryColor, colorIndex) =>
    primaryColor.map((channel, channelIndex) =>
      Math.round(
        channel + (secondaryPalette[colorIndex][channelIndex] - channel) * amount,
      ),
    ),
  );
}

function hash2D(x, y, seed) {
  let value = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
}

function smoothStep(value) {
  return value * value * (3 - 2 * value);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function hash3D(x, y, z, seed) {
  let value = Math.imul(x, 374761393)
    + Math.imul(y, 668265263)
    + Math.imul(z, 362437)
    + Math.imul(seed, 1442695041);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
}

function valueNoise3D(x, y, z, seed) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const z0 = Math.floor(z);
  const tx = smoothStep(x - x0);
  const ty = smoothStep(y - y0);
  const tz = smoothStep(z - z0);

  const frontTop = lerp(hash3D(x0, y0, z0, seed), hash3D(x0 + 1, y0, z0, seed), tx);
  const frontBottom = lerp(
    hash3D(x0, y0 + 1, z0, seed),
    hash3D(x0 + 1, y0 + 1, z0, seed),
    tx,
  );
  const backTop = lerp(
    hash3D(x0, y0, z0 + 1, seed),
    hash3D(x0 + 1, y0, z0 + 1, seed),
    tx,
  );
  const backBottom = lerp(
    hash3D(x0, y0 + 1, z0 + 1, seed),
    hash3D(x0 + 1, y0 + 1, z0 + 1, seed),
    tx,
  );

  return lerp(lerp(frontTop, frontBottom, ty), lerp(backTop, backBottom, ty), tz);
}

function createNoiseBackground(canvas) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;

  let primaryPalette;
  let secondaryPalette;

  try {
    primaryPalette = createDiscretePalette(
      readCssPalette(NOISE_CONFIG.primaryPaletteVariables),
      NOISE_CONFIG.paletteLevels,
    );
    secondaryPalette = createDiscretePalette(
      readCssPalette(NOISE_CONFIG.secondaryPaletteVariables),
      NOISE_CONFIG.paletteLevels,
    );
  } catch (error) {
    console.warn("Noise background disabled because its CSS palette is invalid.", error);
    return;
  }

  const palettePage = document.querySelector("[data-palette-page]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let imageData;
  let noiseLevels;
  let animationFrame = null;
  let lastNoiseFrameTime = -Infinity;
  let lastAnimationTime = null;
  let lastScrollTime = performance.now();
  let lastScrollY = window.scrollY;
  let scrollBoost = 0;
  let scrollBoostTarget = 0;
  let paletteMixCurrent = 0;
  let paletteMixTarget = 0;
  let paletteMixStart = 0;
  let paletteTransitionStartTime = null;
  let flowX = 0;
  let flowY = 0;
  let directionX = 1;
  let directionY = -0.58;
  let targetDirectionX = directionX;
  let targetDirectionY = directionY;
  let nextDirectionChangeTime = null;
  let directionSequence = 0;
  let temporalPhase = 0;
  let resizeTimer;

  function resizeBuffer() {
    const width = clamp(
      Math.ceil(window.innerWidth / NOISE_CONFIG.targetPixelSize),
      NOISE_CONFIG.minWidth,
      NOISE_CONFIG.maxWidth,
    );
    const height = Math.min(
      Math.ceil((width * window.innerHeight) / window.innerWidth),
      NOISE_CONFIG.maxHeight,
    );

    if (canvas.width === width && canvas.height === height && imageData) return;

    canvas.width = width;
    canvas.height = height;
    imageData = context.createImageData(width, height);
    noiseLevels = new Uint8Array(width * height);
  }

  function paletteIndex(value) {
    for (let index = 0; index < NOISE_CONFIG.thresholds.length; index += 1) {
      if (value < NOISE_CONFIG.thresholds[index]) return index;
    }
    return primaryPalette.length - 1;
  }

  function paletteMixAmount() {
    if (!palettePage) return 0;

    const transitionDistance = window.innerHeight * NOISE_CONFIG.paletteTransitionStartRatio;
    if (transitionDistance <= 0) return 1;

    return clamp(
      (transitionDistance - palettePage.getBoundingClientRect().top) / transitionDistance,
      0,
      1,
    );
  }

  function setPaletteTarget(timestamp) {
    const nextTarget = paletteMixAmount();

    if (Math.abs(nextTarget - paletteMixCurrent) <= NOISE_CONFIG.paletteTransitionEpsilon) {
      paletteMixCurrent = nextTarget;
      paletteMixTarget = nextTarget;
      paletteTransitionStartTime = null;
      return;
    }

    paletteMixStart = paletteMixCurrent;
    paletteMixTarget = nextTarget;
    paletteTransitionStartTime = timestamp;
  }

  function updatePaletteMix(timestamp) {
    if (paletteTransitionStartTime === null) return false;

    const progress = clamp(
      (timestamp - paletteTransitionStartTime) / NOISE_CONFIG.paletteTransitionDurationMs,
      0,
      1,
    );
    const easedProgress = 1 - (1 - progress) ** 3;
    paletteMixCurrent = lerp(paletteMixStart, paletteMixTarget, easedProgress);

    if (progress >= 1) {
      paletteMixCurrent = paletteMixTarget;
      paletteTransitionStartTime = null;
    }

    return true;
  }

  function directionRandom(sequence, salt) {
    return hash2D(sequence, salt, NOISE_CONFIG.seed + 101);
  }

  function scheduleNextDirection(timestamp) {
    directionSequence += 1;
    const angle = directionRandom(directionSequence, 17) * Math.PI * 2;
    const interval = lerp(
      NOISE_CONFIG.directionChangeMinMs,
      NOISE_CONFIG.directionChangeMaxMs,
      directionRandom(directionSequence, 31),
    );

    targetDirectionX = Math.cos(angle);
    targetDirectionY = Math.sin(angle);
    nextDirectionChangeTime = timestamp + interval;
  }

  function advanceNoise(timestamp, elapsed) {
    if (nextDirectionChangeTime === null || timestamp >= nextDirectionChangeTime) {
      scheduleNextDirection(timestamp);
    }

    const directionAmount = elapsed > 0
      ? 1 - Math.exp(-elapsed / NOISE_CONFIG.directionResponseMs)
      : 0;
    directionX = lerp(directionX, targetDirectionX, directionAmount);
    directionY = lerp(directionY, targetDirectionY, directionAmount);

    const directionLength = Math.hypot(directionX, directionY);
    if (directionLength > 0.001) {
      directionX /= directionLength;
      directionY /= directionLength;
    }

    const temporalSpeedMultiplier = 1 + scrollBoost;
    const flowDistance = elapsed * NOISE_CONFIG.speed;
    flowX += directionX * flowDistance;
    flowY += directionY * flowDistance;
    temporalPhase += elapsed * NOISE_CONFIG.temporalSpeed * temporalSpeedMultiplier;
  }

  function updateNoiseField() {
    resizeBuffer();

    const width = canvas.width;
    const height = canvas.height;
    const octaveWeight = NOISE_CONFIG.secondOctaveWeight;
    let levelOffset = 0;

    for (let y = 0; y < height; y += 1) {
      const normalizedY = (y / height) * NOISE_CONFIG.baseFrequency + flowY;

      for (let x = 0; x < width; x += 1) {
        const normalizedX = (x / width) * NOISE_CONFIG.baseFrequency + flowX;
        const base = valueNoise3D(
          normalizedX,
          normalizedY,
          temporalPhase,
          NOISE_CONFIG.seed,
        );
        const detail = valueNoise3D(
          normalizedX * 2.03 - flowX * 0.32,
          normalizedY * 2.03 + flowY * 0.21,
          temporalPhase * NOISE_CONFIG.secondOctaveTemporalMultiplier,
          NOISE_CONFIG.seed + 17,
        );
        const combined = (base + detail * octaveWeight) / (1 + octaveWeight);
        const amplified = clamp((combined - 0.5) * NOISE_CONFIG.amplitude + 0.5, 0, 1);
        noiseLevels[levelOffset] = paletteIndex(amplified);
        levelOffset += 1;
      }
    }
  }

  function renderColors() {
    const pixels = imageData.data;
    const palette = mixPalettes(primaryPalette, secondaryPalette, paletteMixCurrent);

    for (let index = 0; index < noiseLevels.length; index += 1) {
      const color = palette[noiseLevels[index]];
      const pixelOffset = index * 4;
      pixels[pixelOffset] = color[0];
      pixels[pixelOffset + 1] = color[1];
      pixels[pixelOffset + 2] = color[2];
      pixels[pixelOffset + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);
  }

  function animate(timestamp) {
    const elapsed = lastAnimationTime === null
      ? 0
      : Math.min(timestamp - lastAnimationTime, NOISE_CONFIG.maxAnimationStepMs);
    const isReceivingScroll = timestamp - lastScrollTime <= NOISE_CONFIG.scrollBoostRecentMs;
    const desiredBoost = isReceivingScroll ? scrollBoostTarget : 0;
    const responseTime = desiredBoost > scrollBoost
      ? NOISE_CONFIG.scrollSpeedRiseMs
      : NOISE_CONFIG.scrollSpeedDecayMs;
    const smoothingAmount = elapsed > 0 ? 1 - Math.exp(-elapsed / responseTime) : 0;

    scrollBoost += (desiredBoost - scrollBoost) * smoothingAmount;
    advanceNoise(timestamp, elapsed);
    const paletteChanged = updatePaletteMix(timestamp);
    lastAnimationTime = timestamp;

    const shouldUpdateNoise = timestamp - lastNoiseFrameTime >= NOISE_CONFIG.frameInterval;
    if (shouldUpdateNoise) {
      updateNoiseField();
      lastNoiseFrameTime = timestamp;
    }

    if (shouldUpdateNoise || paletteChanged) {
      renderColors();
    }
    animationFrame = window.requestAnimationFrame(animate);
  }

  function stop() {
    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    lastAnimationTime = null;
    nextDirectionChangeTime = null;
  }

  function start() {
    stop();
    resizeBuffer();
    paletteMixCurrent = paletteMixAmount();
    paletteMixTarget = paletteMixCurrent;
    paletteTransitionStartTime = null;
    updateNoiseField();
    renderColors();

    if (!reducedMotion.matches && !document.hidden) {
      lastNoiseFrameTime = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  function handleResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      imageData = undefined;
      resizeBuffer();

      if (reducedMotion.matches) {
        paletteMixCurrent = paletteMixAmount();
        paletteMixTarget = paletteMixCurrent;
        paletteTransitionStartTime = null;
      } else {
        setPaletteTarget(performance.now());
      }

      updateNoiseField();
      renderColors();
      lastNoiseFrameTime = performance.now();
    }, 160);
  }

  function handleScroll() {
    const now = performance.now();
    const currentScrollY = window.scrollY;
    const elapsed = Math.max(now - lastScrollTime, 1);
    const velocity = Math.abs(currentScrollY - lastScrollY) / elapsed;

    // 全页滚动按速度连续加速（不限过渡区）；停滚回落由 animate 判 isReceivingScroll
    scrollBoostTarget = clamp(
      velocity / NOISE_CONFIG.scrollVelocityForMaxSpeed,
      0,
      1,
    ) * (NOISE_CONFIG.maxScrollSpeedMultiplier - 1);
    lastScrollTime = now;
    lastScrollY = currentScrollY;
    setPaletteTarget(now);

    if (reducedMotion.matches) {
      paletteMixCurrent = paletteMixTarget;
      paletteTransitionStartTime = null;
      renderColors();
    }
  }

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("visibilitychange", start);

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", start);
  } else {
    reducedMotion.addListener(start);
  }

  start();
}

const noiseCanvas = document.querySelector("[data-noise-canvas]");
if (noiseCanvas) createNoiseBackground(noiseCanvas);

const emailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector("#copy-status");
let statusTimer;

async function copyEmail() {
  if (!emailButton || !copyStatus) return;

  const email = emailButton.dataset.copyEmail;

  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "邮箱已复制到剪贴板。";
  } catch {
    copyStatus.textContent = `请手动复制：${email}`;
  }

  window.clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2400);
}

emailButton?.addEventListener("click", copyEmail);

const yearElement = document.querySelector("[data-current-year]");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

const markdownParser = typeof window.marked?.Marked === "function"
  ? new window.marked.Marked({ breaks: false, gfm: false })
  : null;

function createMarkdownFragment(markdown) {
  if (!markdownParser) throw new Error("Markdown parser is unavailable.");

  const rendered = markdownParser.parse(
    markdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""),
  );
  const template = document.createElement("template");
  template.innerHTML = rendered;
  return template.content;
}

function readEmbeddedMarkdown(source) {
  for (const template of document.querySelectorAll("template[data-embedded-markdown]")) {
    if (template.dataset.embeddedMarkdown === source) {
      return template.content.textContent;
    }
  }

  throw new Error(`Embedded Markdown source not found: ${source}`);
}

function renderMarkdown(container, source) {
  const fragment = createMarkdownFragment(readEmbeddedMarkdown(source));

  if (container.classList.contains("about__body")) {
    const columns = document.createElement("div");
    columns.className = "about__columns";
    columns.append(fragment);
    container.replaceChildren(columns);
  } else {
    container.replaceChildren(fragment);
  }
}

const aboutMarkdown = document.querySelector(".about__body[data-markdown-source]");
if (aboutMarkdown) {
  renderMarkdown(aboutMarkdown, aboutMarkdown.dataset.markdownSource);

  const aboutPanel = aboutMarkdown.closest(".about");
  const aboutScroller = createSmoothWheelScroller(aboutMarkdown, false);
  aboutPanel?.addEventListener("wheel", aboutScroller.handleWheel);
}

const directionDialog = document.querySelector("[data-direction-dialog]");
const dialogHeading = directionDialog?.querySelector("[data-dialog-heading]");
const dialogContent = directionDialog?.querySelector("[data-dialog-content]");
const dialogClose = directionDialog?.querySelector("[data-dialog-close]");
const dialogScroller = directionDialog && dialogContent
  ? createSmoothWheelScroller(dialogContent, true)
  : null;
let dialogTrigger = null;

function openDirectionDialog(trigger) {
  if (!directionDialog || !dialogHeading || !dialogContent || !dialogClose) return;

  const source = trigger.dataset.markdownSource;
  const title = trigger.dataset.dialogTitle;
  if (!source || !title) return;

  dialogTrigger = trigger;
  dialogHeading.textContent = title;

  if (!directionDialog.open) directionDialog.showModal();
  dialogClose.focus();

  renderMarkdown(dialogContent, source);

  dialogScroller?.reset();
}

for (const trigger of document.querySelectorAll(".work-card__trigger[data-markdown-source]")) {
  trigger.addEventListener("click", () => openDirectionDialog(trigger));
}

dialogClose?.addEventListener("click", () => directionDialog.close());

directionDialog?.addEventListener("click", (event) => {
  if (event.target === directionDialog) directionDialog.close();
});

directionDialog?.addEventListener("close", () => {
  dialogTrigger?.focus();
  dialogTrigger = null;
});

// passive false，保证 preventDefault 生效
if (directionDialog && dialogScroller) {
  directionDialog.addEventListener("wheel", dialogScroller.handleWheel, { passive: false });
}

// 弹窗开启：捕获期拦滚轮，防透传背景滚动（内容滚动仍归平滑器）
document.addEventListener("wheel", (event) => {
  if (!directionDialog?.open) return;
  event.preventDefault();
}, { capture: true, passive: false });

// 焦点陷阱：弹窗打开时拉回逃逸焦点
document.addEventListener("focusin", (event) => {
  if (!directionDialog?.open) return;
  if (directionDialog.contains(event.target)) return;
  dialogClose?.focus();
});
