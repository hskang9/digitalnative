import test from "node:test";
import assert from "node:assert/strict";
import { buildTourPath, dampTourValue, resolveTourFrame, resolveTourPanel, resolveTourSummary, roomCameraStop, tourRoomOffset } from "../app/tour-path.mjs";
import { SPACES } from "../app/spaces.js";

const rooms = [1500, 320, 900, 200, 0, 440].map((overflow) => ({ overflow, scale: 1.2 }));
const path = buildTourPath(1000, rooms);

test("one stationary garden opening leads directly to Products", () => {
  const opening = path.segments[0];
  assert.equal(opening.type, "garden");
  assert.ok(opening.end <= 500);
  for (const position of [0, opening.end / 2, opening.end - 1]) {
    const frame = resolveTourFrame(path, position);
    assert.equal(frame.room, -1);
    assert.equal(frame.from, 0);
    assert.equal(frame.to, 0);
    assert.equal(resolveTourPanel(frame).opacity, 0);
  }
  const entry = resolveTourFrame(path, opening.end);
  assert.equal(entry.type, "travel");
  assert.equal(entry.room, 0);
  assert.equal(entry.from, 0);
  assert.equal(entry.to, roomCameraStop(0));
});

test("each room is introduced then reveals details at the same camera stop", () => {
  assert.deepEqual(path.segments.slice(1, 13).map(({ type, room }) => [type, room]), [
    ["travel", 0], ["overview", 0], ["reveal", 0], ["read", 0],
    ["travel", 1], ["overview", 1], ["reveal", 1], ["read", 1],
    ["travel", 2], ["overview", 2], ["reveal", 2], ["read", 2],
  ]);
  assert.equal(path.segments.filter(({ type }) => type === "garden").length, 1);
});

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
  const contentDistance = (route) => route.segments.filter(({ type }) => type === "read").reduce((sum, segment) => sum + segment.overflow * segment.scale, 0);
  assert.ok(contentDistance(mobile) > contentDistance(path));
  assert.ok(mobile.distance > buildTourPath(640, rooms).distance);
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

test("every room's text is fully visible throughout continuous reading", () => {
  for (const step of [1, 33, 160, 500]) {
    for (let y = 0; y <= path.distance; y += step) {
      const frame = resolveTourFrame(path, y), panel = resolveTourPanel(frame);
      if (frame.type !== "read") continue;
      assert.equal(panel.room, frame.room);
      assert.equal(panel.opacity, 1);
      assert.equal(panel.scrollTop, frame.scrollTop);
    }
  }
});

test("Products, Practice, and Partnership never share a reading surface", () => {
  for (const room of [0, 1, 2]) {
    const panel = resolveTourPanel(resolveTourFrame(path, tourRoomOffset(path, room)));
    assert.equal(panel.room, room);
    assert.equal(panel.opacity, 1);
    assert.equal(panel.scrollTop, 0);
  }
});

test("travel fades only the neighboring rooms and restores scroll positions in reverse", () => {
  for (const segment of path.segments.filter((segment) => segment.type === "travel")) {
    const at = (progress) => resolveTourPanel(resolveTourFrame(path, segment.start + (segment.end - segment.start) * progress));
    const departure = at(0.1);
    assert.equal(departure.room, segment.room - 1);
    assert.equal(at(0.5).opacity, 0);
    // Arrival is the room's summary, not its detail wall.
    assert.equal(at(0.9).opacity, 0);
    if (segment.room > 0) {
      assert.equal(departure.scrollTop, rooms[segment.room - 1].overflow);
      assert.ok(departure.opacity > 0 && departure.opacity < 1);
      assert.equal(at(0).opacity, 1);
    }
  }
});

test("all six rooms have distinct bilingual summaries, including the correct Clarity mapping", () => {
  assert.equal(SPACES.length, rooms.length);
  for (const space of SPACES) {
    for (const field of ["title", "body", "action"]) {
      assert.ok(space.summary[field].en.length > 0);
      assert.ok(space.summary[field].ko.length > 0);
    }
  }
  assert.equal(new Set(SPACES.map((space) => space.summary.title.en)).size, rooms.length);
  assert.equal(SPACES.find((space) => space.summary.title.en.startsWith("Clarity.")).id, "capabilities");
  assert.equal(SPACES[2].en, "Work together");
});

test("summary text holds with its own stationary exterior camera, forward or backward", () => {
  for (const segment of path.segments.filter(({ type }) => type === "overview")) {
    assert.equal(segment.from, segment.to);
    assert.equal(segment.to, roomCameraStop(segment.room));
    for (const progress of [0, 0.1, 0.5, 0.9, 0.99]) {
      const frame = resolveTourFrame(path, segment.start + (segment.end - segment.start) * progress);
      assert.deepEqual(resolveTourSummary(frame), { room: segment.room, opacity: 1, interactive: true });
      assert.equal(resolveTourPanel(frame).opacity, 0);
    }
    const landing = resolveTourFrame(path, tourRoomOffset(path, segment.room, "overview"));
    assert.equal(landing.type, "overview");
    assert.equal(landing.room, segment.room);
  }
});

test("summaries never overlap detail walls or appear in another room", () => {
  for (let y = 0; y <= path.distance; y += 13) {
    const frame = resolveTourFrame(path, y);
    const summary = resolveTourSummary(frame), panel = resolveTourPanel(frame);
    if (summary.opacity > 0) {
      assert.equal(summary.room, frame.room);
      assert.equal(panel.opacity, 0);
    }
    if (frame.type === "garden" || frame.type === "read") assert.equal(summary.opacity, 0);
  }
});

test("revealing details fades the summary without moving the camera", () => {
  for (const segment of path.segments.filter(({ type }) => type === "reveal")) {
    const at = (progress) => resolveTourFrame(path, segment.start + (segment.end - segment.start) * progress);
    assert.equal(resolveTourSummary(at(0)).opacity, 1);
    assert.equal(resolveTourSummary(at(0.5)).opacity, 0);
    assert.equal(resolveTourPanel(at(0.5)).opacity, 0);
    assert.equal(resolveTourPanel(at(0.9)).room, segment.room);
    assert.ok(resolveTourPanel(at(0.9)).opacity > 0);
    assert.equal(resolveTourPanel(at(0.9)).scrollTop, 0);
    assert.equal(segment.to, roomCameraStop(segment.room));
    assert.equal(segment.from, segment.to);
  }
});

test("only room-to-room travel changes camera targets, including in reverse", () => {
  for (const room of rooms.keys()) {
    const stages = path.segments.filter((segment) => segment.room === room && segment.type !== "travel");
    assert.equal(new Set(stages.flatMap(({ from, to }) => [from, to])).size, 1);
    for (const segment of stages) {
      for (const progress of [0, 0.25, 0.5, 0.75, 0.99]) {
        const frame = resolveTourFrame(path, segment.start + progress * (segment.end - segment.start));
        assert.equal(frame.from, roomCameraStop(room));
        assert.equal(frame.to, roomCameraStop(room));
      }
    }
  }
  assert.equal(path.segments.filter(({ from, to }) => from !== to).length, rooms.length);
});
