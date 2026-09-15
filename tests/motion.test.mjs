import test from "node:test";
import assert from "node:assert/strict";
import { cameraDuration, cameraEase, shouldRenderFrame } from "../app/motion.mjs";

test("active camera travel renders at both 60 and 120 Hz without an artificial cap", () => {
  for (const hz of [60, 120]) assert.equal(shouldRenderFrame(1000 / hz, true, false), true);
});

test("idle scenery is limited to 20 fps, while input invalidation renders immediately", () => {
  assert.equal(shouldRenderFrame(49, false, false), false);
  assert.equal(shouldRenderFrame(50, false, false), true);
  assert.equal(shouldRenderFrame(1, false, true), true);
});

test("camera duration grows smoothly with distance and stays bounded", () => {
  assert.equal(cameraDuration(-1), 520);
  let previous = cameraDuration(0);
  for (let distance = 0.1; distance <= 100; distance += 0.1) {
    const current = cameraDuration(distance);
    assert.ok(current >= previous && current <= 1200);
    assert.ok(current - previous < 30);
    previous = current;
  }
  assert.ok(cameraDuration(8.01) - cameraDuration(7.99) <= 1);
});

test("camera easing arrives exactly, with no overshoot or abrupt endpoint velocity", () => {
  assert.equal(cameraEase(-1), 0);
  assert.equal(cameraEase(2), 1);
  assert.equal(cameraEase(0), 0);
  assert.equal(cameraEase(1), 1);
  let previous = 0;
  for (let step = 0; step <= 100; step++) {
    const current = cameraEase(step / 100);
    assert.ok(current >= previous && current <= 1);
    previous = current;
  }
  assert.ok(cameraEase(0.01) < 0.00001);
  assert.ok(1 - cameraEase(0.99) < 0.00001);
});
