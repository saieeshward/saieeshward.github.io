/* ========================================
   NEURAL-BG.JS - Faint node mesh behind the hero (home page only).
   Vanilla canvas, no dependencies. Static single frame under
   prefers-reduced-motion; rAF paused when hero is offscreen.
   ======================================== */

(function () {
  "use strict";

  var hero = document.querySelector(".hero-section");
  if (!hero || !window.requestAnimationFrame) return;

  var canvas = document.createElement("canvas");
  canvas.className = "hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  hero.insertBefore(canvas, hero.firstChild);

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var EDGE_DIST = 110;
  var POINTER_DIST = 150;
  var nodes = [];
  var width = 0;
  var height = 0;
  var pointer = { x: -1e4, y: -1e4 };
  var rafId = null;
  var heroVisible = true;
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function resize() {
    var rect = hero.getBoundingClientRect();
    var oldW = width, oldH = height;
    width = rect.width;
    height = rect.height;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.max(18, Math.min(55, Math.floor(width * height / 26000)));
    if (nodes.length && oldW && oldH) {
      // Rescale existing positions so a resize doesn't visually pop
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].x *= width / oldW;
        nodes[i].y *= height / oldH;
      }
    }
    while (nodes.length < count) {
      var speed = 0.1 + Math.random() * 0.1;
      var angle = Math.random() * Math.PI * 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.2 + Math.random() * 0.6
      });
    }
    nodes.length = count;
  }

  function draw(step) {
    ctx.clearRect(0, 0, width, height);
    var i, j, a, b, d, dx, dy, alpha;

    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      if (step) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0) a.x += width; else if (a.x > width) a.x -= width;
        if (a.y < 0) a.y += height; else if (a.y > height) a.y -= height;

        dx = pointer.x - a.x;
        dy = pointer.y - a.y;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0 && d < POINTER_DIST) {
          a.vx += (dx / d) * 0.006;
          a.vy += (dy / d) * 0.006;
          // Keep drift slow even after repeated pointer pulls
          var v = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
          if (v > 0.35) { a.vx *= 0.35 / v; a.vy *= 0.35 / v; }
        }
      }
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(94, 234, 212, 0.30)";
      ctx.fill();
    }

    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = a.x - b.x;
        dy = a.y - b.y;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d < EDGE_DIST) {
          alpha = (1 - d / EDGE_DIST) * 0.09;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = "rgba(94, 234, 212, " + alpha.toFixed(3) + ")";
          ctx.stroke();
        }
      }
      dx = a.x - pointer.x;
      dy = a.y - pointer.y;
      d = Math.sqrt(dx * dx + dy * dy);
      if (d < POINTER_DIST) {
        alpha = (1 - d / POINTER_DIST) * 0.16;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.strokeStyle = "rgba(94, 234, 212, " + alpha.toFixed(3) + ")";
        ctx.stroke();
      }
    }
  }

  function loop() {
    draw(true);
    rafId = window.requestAnimationFrame(loop);
  }

  function start() {
    if (rafId === null && heroVisible && !document.hidden && !motionQuery.matches) {
      rafId = window.requestAnimationFrame(loop);
    }
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function onPointerMove(e) {
    var rect = hero.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  }

  function onPointerLeave() {
    pointer.x = -1e4;
    pointer.y = -1e4;
  }

  function applyMotionPreference() {
    if (motionQuery.matches) {
      stop();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      onPointerLeave();
      draw(false);
    } else {
      hero.addEventListener("pointermove", onPointerMove);
      hero.addEventListener("pointerleave", onPointerLeave);
      start();
    }
  }

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      if (motionQuery.matches) draw(false);
    }, 150);
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      if (heroVisible) start(); else stop();
    }).observe(hero);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  if (motionQuery.addEventListener) {
    motionQuery.addEventListener("change", applyMotionPreference);
  }

  resize();
  applyMotionPreference();
})();
