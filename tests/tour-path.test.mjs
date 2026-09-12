import test from "node:test";
import assert from "node:assert/strict";
import { buildTourPath, dampTourValue, resolveTourFrame, tourRoomOffset } from "../app/tour-path.mjs";

const rooms = [1500, 320, 900, 200, 0, 440].map((overflow) => ({ overflow, scale: 1.2 }));
const path = buildTourPath(1000, rooms);

test("starts in the garden and ends with the complete contact content", () => {
  assert.equal(resolveTourFrame(path, 0).from, 0);
  const end = resolveTourFrame(path, path.distance);
  assert.equal(end.type, "read");
  assert.equal(end.room, 5);
  assert.equal(end.scrollTop, 440);
  assert.equal(end.totalProgress, 1);
});

test("every room gets a stationary camera and its entire reading range", () => {
  for (let room = 0; room < rooms.length; room++) {
    const start = resolveTourFrame(path, tourRoomOffset(path, room));
    assert.equal(start.type, "read");
    assert.equal(start.room, room);
    assert.equal(start.from, start.to);
    assert.equal(start.scrollTop, 0);
    const segment = path.segments[start.segmentIndex];
    assert.equal(resolveTourFrame(path, segment.end - 1).scrollTop, rooms[room].overflow);
  }
});

test("camera travel endpoints are continuous in either scroll direction", () => {
  for (let i = 1; i < path.segments.length; i++) {
    assert.equal(path.segments[i].start, path.segments[i - 1].end);
    assert.ok(Math.abs(path.segments[i].from - path.segments[i - 1].to) < 0.00001);
  }
});

test("mobile content determines length, not a fixed desktop timeline", () => {
  const mobile = buildTourPath(640, rooms.map((room) => ({ ...room, overflow: room.overflow * 3, scale: 0.95 })));
  assert.ok(mobile.distance > path.distance);
  assert.equal(resolveTourFrame(mobile, mobile.distance).scrollTop, 1320);
});

test("out-of-range positions clamp safely, including empty Press content", () => {
  assert.equal(resolveTourFrame(path, -100).from, 0);
  assert.equal(resolveTourFrame(path, Infinity).totalProgress, 1);
  assert.equal(resolveTourFrame(path, tourRoomOffset(path, 4)).scrollTop, 0);
  assert.equal(tourRoomOffset(path, -1), 0);
});

test("fast scrolling and skipped room boundaries never teleport the camera", () => {
  let camera = 3;
  for (const target of [9, 15, -12, 30]) {
    const next = dampTourValue(camera, target, 1 / 60);
    assert.ok(Math.abs(next - camera) < Math.abs(target - camera) * 0.2);
    assert.notEqual(next, target);
    camera = next;
  }
});

test("camera damping is frame-rate independent and settles for reading", () => {
  let fast = 0, slow = 0;
  for (let i = 0; i < 30; i++) fast = dampTourValue(fast, 20, 1 / 60);
  for (let i = 0; i < 15; i++) slow = dampTourValue(slow, 20, 1 / 30);
  assert.ok(Math.abs(fast - slow) < 0.00001);
  for (let i = 0; i < 90; i++) fast = dampTourValue(fast, 20, 1 / 60);
  assert.equal(fast, 20);
  assert.equal(dampTourValue(20, 20, 1 / 60), 20);
});
