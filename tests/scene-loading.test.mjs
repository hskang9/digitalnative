import test from "node:test";
import assert from "node:assert/strict";
import { startSceneLoad } from "../app/scene-loading.mjs";

function fixture(options = {}) {
  let id = 0, rendered, fail, disposed = 0, loads = 0, creates = 0;
  const frames = new Map(), timers = new Map(), events = [];
  const scene = { dispose: () => disposed++ };
  const clock = {
    requestAnimationFrame(fn) { frames.set(++id, fn); return id; },
    cancelAnimationFrame(key) { frames.delete(key); },
    setTimeout(fn) { timers.set(++id, fn); return id; },
    clearTimeout(key) { timers.delete(key); },
    frame() { const pending = [...frames.values()]; frames.clear(); pending.forEach((fn) => fn()); },
    timeout() { const pending = [...timers.values()]; timers.clear(); pending.forEach((fn) => fn()); },
  };
  const session = startSceneLoad({
    clock,
    load: () => { loads++; return options.load ? options.load() : Promise.resolve({}); },
    create: (module, onFailure, onRendered) => {
      creates++; rendered = onRendered; fail = onFailure;
      return options.create ? options.create(module, onFailure, onRendered, scene) : scene;
    },
    onPhase: (phase) => events.push(phase),
    onCreated: () => events.push("created"),
    onReady: () => events.push("ready"),
    onFallback: (reason) => events.push(reason),
  });
  return {
    clock, session, events, frames, timers,
    rendered: () => rendered(), fail: () => fail(),
    counts: () => ({ disposed, loads, creates }),
  };
}

const settle = () => new Promise((resolve) => setImmediate(resolve));
async function construct(f) {
  f.clock.frame(); f.clock.frame(); await settle(); f.clock.frame();
}

test("loader paints first and reveals only after the scene's first rendered frame", async () => {
  const f = fixture();
  assert.equal(f.counts().loads, 0);
  f.clock.frame();
  assert.equal(f.counts().loads, 0);
  f.clock.frame(); await settle();
  assert.deepEqual(f.events, ["rendering"]);
  assert.equal(f.counts().creates, 0);
  f.clock.frame();
  assert.deepEqual(f.events, ["rendering", "created"]);
  assert.equal(f.session.isReady(), false);
  f.rendered(); f.rendered();
  assert.deepEqual(f.events, ["rendering", "created", "ready"]);
  assert.equal(f.timers.size, 0);
  assert.equal(f.session.isReady(), true);
  f.session.dispose();
});

test("skipping before startup cancels construction and the timeout", async () => {
  const f = fixture();
  f.session.skip();
  await construct(f);
  assert.deepEqual(f.events, ["skipped"]);
  assert.deepEqual(f.counts(), { loads: 0, creates: 0, disposed: 0 });
  assert.equal(f.timers.size, 0);
});

test("late hydration honors an existing HTML fallback without starting the scene", async () => {
  const f = fixture();
  f.session.useFallback("timeout");
  await construct(f);
  assert.deepEqual(f.events, ["timeout"]);
  assert.deepEqual(f.counts(), { loads: 0, creates: 0, disposed: 0 });
  assert.equal(f.timers.size, 0);
});

test("a late module download cannot resurrect a skipped scene", async () => {
  let finish;
  const f = fixture({ load: () => new Promise((resolve) => { finish = resolve; }) });
  f.clock.frame(); f.clock.frame(); await settle();
  f.session.skip(); finish({}); await settle(); f.clock.frame();
  assert.deepEqual(f.events, ["skipped"]);
  assert.equal(f.counts().creates, 0);
});

test("download failures and unsupported WebGL fall back instead of loading forever", async () => {
  for (const options of [
    { load: () => Promise.reject(new Error("offline")) },
    { create: () => null },
    { create: () => { throw new Error("renderer failed"); } },
  ]) {
    const f = fixture(options);
    await construct(f);
    assert.equal(f.events.at(-1), "unavailable");
    assert.equal(f.timers.size, 0);
  }
});

test("a scene that never renders times out and releases its resources", async () => {
  const f = fixture();
  await construct(f); f.clock.timeout(); f.rendered();
  assert.deepEqual(f.events, ["rendering", "created", "timeout"]);
  assert.equal(f.counts().disposed, 1);
});

test("context loss after readiness still offers the complete fallback", async () => {
  const f = fixture();
  await construct(f); f.rendered(); f.fail(); f.fail(); f.session.dispose();
  assert.deepEqual(f.events, ["rendering", "created", "ready", "unavailable"]);
  assert.equal(f.session.isReady(), false);
  assert.equal(f.counts().disposed, 1);
});

test("unmounting during construction prevents readiness and disposes once", async () => {
  const f = fixture();
  await construct(f); f.session.dispose(); f.rendered(); f.clock.timeout();
  assert.deepEqual(f.events, ["rendering", "created"]);
  assert.equal(f.counts().disposed, 1);
  assert.equal(f.frames.size, 0);
});

test("a synchronous creation failure still releases a returned scene", async () => {
  const f = fixture({ create: (_, fail, __, scene) => { fail(); return scene; } });
  await construct(f);
  assert.deepEqual(f.events, ["rendering", "unavailable"]);
  assert.equal(f.counts().disposed, 1);
});
