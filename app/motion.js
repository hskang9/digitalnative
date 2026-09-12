"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = [...document.querySelectorAll("[data-reveal]")];
    const videos = [...document.querySelectorAll("video[data-inview]")];
    if (!("IntersectionObserver" in window)) return;
    const revealer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.remove("reveal-pending");
        revealer.unobserve(target);
      });
    }, { threshold: 0.08 });
    if (!preference.matches) {
      targets.forEach((el) => {
        el.classList.add("reveal-pending");
        el.style.transitionDelay = `${Math.min(Number(el.dataset.revealStep || 0), 3) * 60}ms`;
        revealer.observe(el);
      });
    }
    const visibleVideos = new Set();
    const updateVideos = () => videos.forEach((video) => {
      if (visibleVideos.has(video) && !preference.matches && !document.hidden) {
        video.play()?.catch(() => {});
      } else video.pause();
    });
    const player = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleVideos.add(target);
        else visibleVideos.delete(target);
      });
      updateVideos();
    }, { threshold: 0.25 });
    videos.forEach((video) => player.observe(video));
    const onPreference = () => {
      if (preference.matches) targets.forEach((el) => el.classList.remove("reveal-pending"));
      updateVideos();
    };
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", updateVideos);
    return () => {
      revealer.disconnect();
      player.disconnect();
      videos.forEach((video) => video.pause());
      targets.forEach((el) => el.classList.remove("reveal-pending"));
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", updateVideos);
    };
  }, []);
  return null;
}
