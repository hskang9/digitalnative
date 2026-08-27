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
export default function ScrollReveal() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = Array.from(document.querySelectorAll("[data-reveal]"));

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
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
