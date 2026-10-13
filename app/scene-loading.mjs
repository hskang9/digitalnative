// Own the asynchronous scene's lifetime, including late downloads after a skip.
export function startSceneLoad({ load, create, onCreated, onReady, onFallback, onPhase, clock = globalThis, timeout = 15000 }) {
  let stopped = false, ready = false, scene = null, frame = 0;
  const timer = clock.setTimeout(() => fallback("timeout"), timeout);

  function release() {
    clock.clearTimeout(timer);
    clock.cancelAnimationFrame(frame);
    scene?.dispose();
    scene = null;
  }
  function fallback(reason) {
    if (stopped) return;
    stopped = true;
    release();
    onFallback(reason);
  }
  function rendered() {
    if (stopped || ready) return;
    ready = true;
    clock.clearTimeout(timer);
    onReady();
  }

  // Paint the lightweight loader before importing or constructing the world.
  // There is no artificial minimum wait: reveal on the first rendered frame.
  frame = clock.requestAnimationFrame(() => {
    frame = clock.requestAnimationFrame(() => {
      Promise.resolve().then(() => stopped ? null : load()).then((module) => {
        if (stopped) return;
        onPhase("rendering");
        frame = clock.requestAnimationFrame(() => {
          if (stopped) return;
          try {
            scene = create(module, () => fallback("unavailable"), rendered);
            if (stopped) { release(); return; }
            if (!scene) { fallback("unavailable"); return; }
            onCreated(scene);
          } catch {
            fallback("unavailable");
          }
        });
      }).catch(() => fallback("unavailable"));
    });
  });

  return {
    isReady() { return ready && !stopped; },
    useFallback: fallback,
    skip() { fallback("skipped"); },
    dispose() { stopped = true; release(); },
  };
}
