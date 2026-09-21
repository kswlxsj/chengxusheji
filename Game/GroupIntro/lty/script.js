(function () {
  "use strict";

  const canvas = document.getElementById("waveCanvas");
  const context = canvas.getContext("2d");
  let width;
  let height;
  let baseline;
  let time = 0;
  const bubbles = [];
  const wave = { amplitude: 22, frequency: 0.015, speed: 0.3 };

  function resize() {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
    baseline = height * 0.5;
  }

  function waveY(x) {
    return baseline + wave.amplitude * Math.sin(wave.frequency * x + time * wave.speed);
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height);
    for (let x = 0; x <= width; x += 1) context.lineTo(x, waveY(x));
    context.lineTo(width, height);
    context.closePath();
    context.fillStyle = "#D4E9FF";
    context.fill();

    for (const bubble of bubbles) {
      bubble.y -= 0.8;
      if (bubble.y > waveY(bubble.x)) {
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,255,255,0.6)";
        context.fill();
      }
    }
    time += 0.02;
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("mousedown", (event) => bubbles.push({
    x: event.clientX,
    y: event.clientY,
    r: 4 + Math.random() * 8
  }));
})();
