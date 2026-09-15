import test from "node:test";
import assert from "node:assert/strict";
import { sectionKeyAction } from "../app/section-navigation.mjs";

const context = { current: 1, count: 6 };
const action = (key, event = {}, state = {}) => sectionKeyAction({ key, ...event }, { ...context, ...state });

test("arrows move exactly one room in the expected direction", () => {
  for (const key of ["ArrowLeft", "ArrowUp"]) assert.deepEqual(action(key), { type: "section", room: 0 });
  for (const key of ["ArrowRight", "ArrowDown"]) assert.deepEqual(action(key), { type: "section", room: 2 });
});

test("the complete garden-to-contact route is bounded without wrapping", () => {
  let current = -1;
  for (const expected of [0, 1, 2, 3, 4, 5, 5]) {
    current = action("ArrowRight", {}, { current }).room;
    assert.equal(current, expected);
  }
  for (const expected of [4, 3, 2, 1, 0, -1, -1]) {
    current = action("ArrowLeft", {}, { current }).room;
    assert.equal(current, expected);
  }
});

test("held arrows stay in the requested room, but reading keys keep repeating", () => {
  assert.deepEqual(action("ArrowRight", { repeat: true }), { type: "section", room: 1 });
  assert.deepEqual(action("ArrowDown", { repeat: true }, { reading: true }), { type: "read" });
});

test("reading reserves vertical arrows and retains horizontal section navigation", () => {
  for (const key of ["ArrowUp", "ArrowDown"]) assert.deepEqual(action(key, {}, { reading: true }), { type: "read" });
  assert.deepEqual(action("ArrowRight", {}, { reading: true }), { type: "section", room: 2 });
  const target = { closest: (selector) => selector === ".room-surface" };
  assert.deepEqual(action("ArrowDown", { target }), { type: "read" });
});

test("browser shortcuts, composition, handled events, and text selection are untouched", () => {
  for (const flag of ["altKey", "ctrlKey", "metaKey", "shiftKey", "isComposing", "defaultPrevented"]) {
    assert.equal(action("ArrowRight", { [flag]: true }), null);
  }
  assert.equal(action("ArrowRight", {}, { hasSelection: true }), null);
  for (const key of ["Tab", "Enter", " ", "Home", "End", "PageDown"]) assert.equal(action(key), null);
});

test("editable fields, media, and arrow-key widgets retain their keyboard controls", () => {
  assert.equal(action("ArrowRight", { target: { isContentEditable: true } }), null);
  for (const selector of ["input", "textarea", "select", "video", "audio", '[role="slider"]', '[role="tablist"]']) {
    const target = { closest: (selectors) => selectors.split(", ").includes(selector) };
    assert.equal(action("ArrowRight", { target }), null);
  }
});
