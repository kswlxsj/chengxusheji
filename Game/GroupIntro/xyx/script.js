(function () {
  "use strict";

  const root = document.documentElement;
  const cloudLayer = document.querySelector(".clouds");

  function buildPixelCloudSVG() {
    const key = (x, y) => `${x},${y}`;
    const cells = new Set();
    const blobs = [[16, 8, 7], [6, 9, 6], [26, 9, 6], [10, 5, 5], [21, 5, 4]];
    blobs.forEach(([centerX, centerY, radius]) => {
      for (let y = centerY - radius; y <= centerY + radius; y += 1) {
        for (let x = centerX - radius; x <= centerX + radius; x += 1) {
          const dx = x - centerX;
          const dy = y - centerY;
          if (dx * dx + dy * dy <= radius * radius) cells.add(key(x, y));
        }
      }
    });
    const columns = new Map();
    cells.forEach((entry) => {
      const [x, y] = entry.split(",").map(Number);
      if (!columns.has(x)) columns.set(x, []);
      columns.get(x).push(y);
    });
    const flat = new Set();
    columns.forEach((values, x) => {
      const minimum = Math.min(...values);
      const maximum = Math.max(...values);
      for (let y = minimum; y <= maximum; y += 1) flat.add(key(x, y));
    });
    const rows = new Map();
    flat.forEach((entry) => {
      const [x, y] = entry.split(",").map(Number);
      if (!rows.has(y)) rows.set(y, []);
      rows.get(y).push(x);
    });
    let rectangles = "";
    rows.forEach((values, y) => {
      values.sort((left, right) => left - right);
      let start = values[0];
      let previous = values[0];
      for (let index = 1; index <= values.length; index += 1) {
        const x = values[index];
        if (index === values.length || x !== previous + 1) {
          rectangles += `<rect class="pcell" x="${start}" y="${y}" width="${previous - start + 1}" height="1"/>`;
          start = x;
        }
        previous = x;
      }
    });
    return `<svg class="pixel-cloud" viewBox="-2 -2 36 20" xmlns="http://www.w3.org/2000/svg">${rectangles}</svg>`;
  }

  for (let index = 0; index < 7; index += 1) {
    const cloud = document.createElement("span");
    const duration = 38 + Math.random() * 30;
    cloud.className = "cloud";
    cloud.style.setProperty("--dur", `${duration}s`);
    cloud.style.setProperty("--delay", `${-Math.random() * duration}s`);
    cloud.style.animationDuration = `${duration}s`;
    cloud.style.animationDelay = `${-Math.random() * duration}s`;
    cloud.style.top = `${3 + Math.random() * 46}%`;
    const shape = document.createElement("span");
    shape.className = "shape";
    shape.style.transform = `scale(${0.9 + Math.random() * 1.1})`;
    shape.innerHTML = buildPixelCloudSVG();
    cloud.appendChild(shape);
    cloudLayer.appendChild(cloud);
  }

  const rainCanvas = document.getElementById("rainCanvas");
  const rainContext = rainCanvas.getContext("2d");
  const rainDrops = [];
  let rainFrame = null;

  function resizeRain() {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
  }
  function startRain() {
    resizeRain();
    rainDrops.length = 0;
    const count = Math.min(240, Math.round(window.innerWidth / 6));
    for (let index = 0; index < count; index += 1) {
      rainDrops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * -rainCanvas.height,
        len: 12 + Math.random() * 12,
        speed: 9 + Math.random() * 8
      });
    }
    cancelAnimationFrame(rainFrame);
    function frame() {
      rainContext.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      rainContext.strokeStyle = "rgba(205, 228, 255, .5)";
      rainContext.lineWidth = 1.3;
      rainContext.beginPath();
      for (const drop of rainDrops) {
        drop.y += drop.speed;
        drop.x -= drop.speed * 0.35;
        if (drop.y > rainCanvas.height + 20) {
          drop.y = -20;
          drop.x = Math.random() * rainCanvas.width;
        }
        if (drop.x < -20) drop.x = rainCanvas.width + 20;
        rainContext.moveTo(drop.x, drop.y);
        rainContext.lineTo(drop.x + 2, drop.y - drop.len);
      }
      rainContext.stroke();
      rainFrame = requestAnimationFrame(frame);
    }
    frame();
  }
  function stopRain() {
    cancelAnimationFrame(rainFrame);
    rainContext.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
  }

  const weatherButtons = document.querySelectorAll(".weather-switch button");
  function setWeather(rain) {
    root.classList.toggle("rain", rain);
    root.classList.toggle("dark", rain);
    weatherButtons.forEach((button) => {
      button.classList.toggle("active", (button.dataset.weather === "rain") === rain);
    });
    if (rain) startRain();
    else stopRain();
    try { localStorage.setItem("weather", rain ? "rain" : "clear"); } catch (_error) { /* 无痕模式允许失败 */ }
  }
  weatherButtons.forEach((button) => {
    button.addEventListener("click", () => setWeather(button.dataset.weather === "rain"));
  });
  try {
    let mode = localStorage.getItem("weather");
    const queryWeather = new URLSearchParams(location.search).get("weather");
    if (queryWeather === "rain" || queryWeather === "clear") mode = queryWeather;
    setWeather(mode === "rain");
  } catch (_error) { setWeather(false); }
  window.addEventListener("resize", () => {
    if (root.classList.contains("rain")) startRain();
  });

  const avatarImage = document.getElementById("avatarImg");
  avatarImage.addEventListener("load", () => avatarImage.classList.add("ready"));
  if (avatarImage.complete && avatarImage.naturalWidth > 0) avatarImage.classList.add("ready");
  const avatarBox = document.getElementById("avatarBox");
  avatarBox.addEventListener("click", () => {
    avatarBox.classList.remove("pop");
    void avatarBox.offsetWidth;
    avatarBox.classList.add("pop");
  });
  avatarBox.addEventListener("animationend", () => avatarBox.classList.remove("pop"));

  const roles = ["计算机科学与技术 · 25级", "喜欢 阴天 / 雨天 / 晴天 ", "Nice to meet you !"];
  const roleElement = document.getElementById("role");
  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  function tick() {
    const current = roles[roleIndex];
    roleElement.textContent = current.slice(0, characterIndex);
    if (!deleting) {
      characterIndex += 1;
      if (characterIndex > current.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
      setTimeout(tick, 120);
    } else {
      characterIndex -= 1;
      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(tick, 50);
    }
  }
  tick();

  const sections = document.querySelectorAll("section[id]");
  const navigationLinks = document.querySelectorAll(".nav-links a");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => toTop.classList.toggle("show", window.pageYOffset > 420));
  toTop.addEventListener("click", () => {
    if (document.documentMode) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
