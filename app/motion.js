"use client";

import { useEffect } from "react";

/**
 * Mechanical motion controller.
 *
 * - [data-reveal] elements are held down/faded until they enter the viewport,
 *   then released in document order with a per-group stagger.
 * - <video data-inview> only plays while it is actually on screen.
 *
 * Everything degrades to "already visible" when JS is off or when the visitor
 * has asked for reduced motion.
 */

/**
 * The hero rolls its odometer and prints the manifest on load — it is above
 * the fold, so there is nothing to wait for.
 *
 * Nothing here starts hidden: the markup already rests in the finished
 * state, so a visitor who never triggers the motion (reduced motion, JS
 * off, a background tab) still sees the whole hero. `is-armed` is what
 * puts it back to the start, and only JS ever adds it.
 */
function playHero(reduced) {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;

  startField(hero.querySelector("[data-field]"), reduced);

  if (reduced) return;

  hero.classList.add("is-armed");
  hero.classList.remove("is-playing");
  void hero.offsetWidth;
  hero.classList.add("is-playing");

  hero.querySelectorAll("[data-reel]").forEach((strip) => {
    const digit = Number(strip.dataset.reel);
    strip.style.transform = "translateY(0)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        strip.style.transform = `translateY(-${digit * 10}%)`;
      });
    });
  });
}

/**
 * Press ink drifting behind the type. Capped at 16% so the small text still
 * clears AA against the lightest point the field reaches — the CSS halftone
 * screen sits on top of this.
 */
function startField(canvas, reduced) {
  if (!canvas || reduced) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const lights = [
    { x: 0.16, y: 0.28, r: 0.46, s: 0.000110, p: 0.0, a: 1.0 },
    { x: 0.58, y: 0.70, r: 0.40, s: 0.000150, p: 2.0, a: 0.85 },
    { x: 0.88, y: 0.22, r: 0.36, s: 0.000095, p: 4.0, a: 0.7 },
    { x: 0.42, y: 0.90, r: 0.32, s: 0.000175, p: 1.0, a: 0.6 },
  ];

  let box;

  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    box = rect;
  }

  size();
  window.addEventListener("resize", size);

  (function frame(t) {
    ctx.clearRect(0, 0, box.width, box.height);
    lights.forEach((l) => {
      const x = (l.x + Math.sin(t * l.s + l.p) * 0.1) * box.width;
      const y = (l.y + Math.cos(t * l.s * 1.3 + l.p) * 0.08) * box.height;
      const rad = l.r * Math.max(box.width, box.height);
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, `rgba(244,244,240,${0.16 * l.a})`);
      g.addColorStop(1, "rgba(244,244,240,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(frame);
  })(0);
}

export default function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = Array.from(document.querySelectorAll("[data-reveal]"));

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      playHero(reduced);
      return;
    }

    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const step = Number(el.dataset.revealStep || 0);
          el.style.transitionDelay = `${step * 70}ms`;
          el.classList.add("is-revealed");
          revealer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    targets.forEach((el) => revealer.observe(el));

    playHero(reduced);

    const videos = Array.from(document.querySelectorAll("video[data-inview]"));
    const player = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    videos.forEach((video) => player.observe(video));

    return () => {
      revealer.disconnect();
      player.disconnect();
    };
  }, []);

  return null;
}
