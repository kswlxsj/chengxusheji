(function () {
  "use strict";

  const FRAME_SOURCES = [
    "assets/op/op-1.png",
    "assets/op/op-2.png",
    "assets/op/op-3.png",
    "assets/op/op-4.png"
  ];

  // 每一帧对应的底部文字（新增）
  const FRAME_CAPTIONS = [
    "第一章 · 启程",
    "第二章 · 风起",
    "第三章 · 远航",
    "第四章 · 抵达"
  ];

  const FADE_DURATION_MS = 700;

  const overlay = document.querySelector("#home-op");
  if (!overlay) return;

  const page = document.querySelector(".site-shell");
  const frames = Array.from(overlay.querySelectorAll(".home-op-frame"));
  const progressItems = Array.from(overlay.querySelectorAll(".home-op-progress span"));
  const captionEl = document.querySelector("#home-op-caption");
  const nextButton = document.querySelector("#home-op-next");
  const skipButton = document.querySelector("#home-op-skip");

  let activeFrameIndex = 0;
  let availableFrames = [];
  let finished = false;

  page.inert = true;
  page.setAttribute("aria-hidden", "true");

  /* ---------- 图片预加载 ---------- */
  function loadFrame(source) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(source);
      image.onerror = () => resolve(null);
      image.src = source;
    });
  }

  /* ---------- 进度点 ---------- */
  function updateProgress(index) {
    progressItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-past", itemIndex < index);
      item.classList.toggle("is-active", itemIndex === index);
    });
  }

  /* ---------- 底部文字 ---------- */
  function updateCaption(index) {
    if (!captionEl) return;
    const text = FRAME_CAPTIONS[index] || "";
    captionEl.textContent = text;
    // 触发淡入动画（可选）
    captionEl.classList.remove("is-visible");
    // 强制重排，让动画能重新触发
    void captionEl.offsetWidth;
    captionEl.classList.add("is-visible");
  }

  /* ---------- 显示某一帧 ---------- */
  function showFrame(index) {
    if (finished) return;

    const nextFrame = frames[index % frames.length];
    const currentFrame = frames[(index - 1) % frames.length];

    nextFrame.src = availableFrames[index];
    nextFrame.classList.add("is-active");
    if (currentFrame && currentFrame !== nextFrame) {
      currentFrame.classList.remove("is-active");
    }

    updateProgress(index);
    updateCaption(index);

    // 最后一帧时把「下一张」变成「完成」或禁用
    if (nextButton) {
      const isLast = index >= availableFrames.length - 1;
      nextButton.textContent = isLast ? "完成" : "下一张";
    }
  }

  /* ---------- 点击「下一张」 ---------- */
  function goNext() {
    if (finished) return;

    const nextIndex = activeFrameIndex + 1;
    if (nextIndex >= availableFrames.length) {
      finish();
      return;
    }

    activeFrameIndex = nextIndex;
    showFrame(activeFrameIndex);
  }

  /* ---------- 结束 ---------- */
  function finish() {
    if (finished) return;
    finished = true;

    overlay.classList.add("is-leaving");
    overlay.setAttribute("aria-hidden", "true");

    window.setTimeout(() => {
      overlay.hidden = true;
      page.inert = false;
      page.removeAttribute("aria-hidden");
      const firstAction = document.querySelector(".home-action");
      if (firstAction instanceof HTMLElement) firstAction.focus();
    }, FADE_DURATION_MS);
  }

  /* ---------- 启动 ---------- */
  function start(loadedFrames) {
    availableFrames = loadedFrames;
    if (!availableFrames.length) {
      finish();
      return;
    }

    showFrame(0);
  }

  /* ---------- 事件绑定 ---------- */
  if (nextButton) nextButton.addEventListener("click", goNext);
  if (skipButton) skipButton.addEventListener("click", finish);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !event.repeat) finish();
    // 可选：回车 / 空格也触发下一张
    if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
      // 避免焦点在按钮上时重复触发
      if (document.activeElement === nextButton) return;
      goNext();
    }
  });

  /* ---------- 预加载并开始 ---------- */
  Promise.all(FRAME_SOURCES.map(loadFrame)).then((loadedFrames) => {
    start(loadedFrames.filter(Boolean));
  });
})();