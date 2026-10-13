import test from "node:test";
import assert from "node:assert/strict";
import { SCENE_BOOT } from "../app/scene-boot.mjs";

function fixture() {
  const timers = new Map(), listeners = new Map(), events = [];
  const doc = {
    documentElement: { dataset: {} },
    addEventListener(type, fn, capture) { assert.equal(capture, true); listeners.set(type, fn); },
    removeEventListener(type, fn, capture) {
      assert.equal(capture, true);
      if (listeners.get(type) === fn) listeners.delete(type);
    },
  };
  const win = {
    setTimeout(fn, delay) { assert.equal(delay, 15000); timers.set(1, fn); return 1; },
    clearTimeout(id) { timers.delete(id); },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    dispatchEvent(event) { events.push(event); },
  };
  // Execute the actual inline payload, without any module closure or React.
  new Function("window", "document", SCENE_BOOT)(win, doc);
  return {
    win, doc, timers, listeners, events,
    timeout() { [...timers.values()].forEach((fn) => fn()); },
    click(selector, options = {}) {
      const event = {
        button: 0, defaultPrevented: false,
        target: { closest: (query) => query === selector },
        preventDefault() { this.defaultPrevented = true; },
        ...options,
      };
      listeners.get("click")?.(event);
      return event;
    },
  };
}

test("the inline watchdog reveals native content when hydration never starts", () => {
  const f = fixture();
  f.timeout(); f.timeout();
  assert.equal(f.doc.documentElement.dataset.sceneFallback, "timeout");
  assert.deepEqual(f.events.map(({ type, detail }) => [type, detail]), [["dn-scene-fallback", "timeout"]]);
  assert.equal(f.timers.size, 0);
  assert.equal(f.listeners.size, 0);
});

test("the skip button works before React and cancels the watchdog", () => {
  const f = fixture();
  const event = f.click(".scene-loader-skip");
  assert.equal(event.defaultPrevented, true);
  assert.equal(f.doc.documentElement.dataset.sceneFallback, "skipped");
  assert.equal(f.timers.size, 0);
  assert.equal(f.events.length, 1);
});

test("header anchors reveal content without blocking native navigation", () => {
  const f = fixture();
  const event = f.click('a[href^="#"]');
  assert.equal(event.defaultPrevented, false);
  assert.equal(f.doc.documentElement.dataset.sceneFallback, "skipped");
});

test("modified clicks, unrelated controls, and prevented events do not skip", () => {
  const f = fixture();
  f.click(".unrelated");
  for (const options of [{ button: 1 }, { altKey: true }, { ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { defaultPrevented: true }]) {
    f.click(".scene-loader-skip", options);
  }
  assert.equal(f.events.length, 0);
  assert.equal(f.timers.size, 1);
});

test("the ready handoff removes the guard without changing the scene", () => {
  const f = fixture();
  const queuedTimeout = [...f.timers.values()][0];
  f.win.__dnSceneBoot.finish();
  queuedTimeout(); f.click('a[href^="#"]');
  assert.equal(f.timers.size, 0);
  assert.equal(f.listeners.size, 0);
  assert.equal(f.events.length, 0);
  assert.equal(f.doc.documentElement.dataset.sceneFallback, undefined);
});
