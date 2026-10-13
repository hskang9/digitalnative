// Runs before hydration, so a missing client chunk cannot trap the HTML loader.
export function installSceneGuard(win, doc) {
  let finished = false;
  const timer = win.setTimeout(() => fallback("timeout"), 15000);
  function finish() {
    finished = true;
    win.clearTimeout(timer);
    doc.removeEventListener("click", onClick, true);
  }
  function fallback(reason) {
    if (finished) return;
    finish();
    doc.documentElement.dataset.sceneFallback = reason;
    win.dispatchEvent(new win.CustomEvent("dn-scene-fallback", { detail: reason }));
  }
  function onClick(event) {
    if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest?.(".scene-loader-skip")) {
      event.preventDefault(); fallback("skipped");
    } else if (event.target.closest?.('a[href^="#"]')) {
      fallback("skipped");
    }
  }
  win.__dnSceneBoot = { finish };
  doc.addEventListener("click", onClick, true);
}

export const SCENE_BOOT = `(${installSceneGuard.toString()})(window, document);`;
