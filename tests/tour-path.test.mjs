import test from "node:test";
import assert from "node:assert/strict";
import { buildTourPath, resolveTourFrame, tourRoomOffset } from "../app/tour-path.mjs";

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
