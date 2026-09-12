const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// Follow the rendered pose, not a segment-local mix that resets at boundaries.
export function dampTourValue(current, target, delta) {
  if (Math.abs(target - current) < 0.002) return target;
  return current + (target - current) * (1 - Math.exp(-Math.max(0, delta) * 12));
}

// One native scrollbar: garden, camera travel, then a stationary reading pause.
// Reading distance scales with actual content, including the last contact/footer.
export function buildTourPath(viewportHeight, rooms) {
  const height = Math.max(1, viewportHeight);
  const segments = [{ type: "garden", start: 0, end: height * 1.8, from: 0, to: 0.6, room: -1 }];
  rooms.forEach(({ overflow, scale }, room) => {
    const start = segments.at(-1).end;
    const destination = room + 1.08;
    const arrival = start + height * 0.8;
    segments.push({ type: "travel", start, end: arrival, from: room ? room + 0.08 : 0.6, to: destination, room });
    const lead = height * 0.18;
    const contentDistance = Math.max(0, overflow) * Math.max(0.01, scale);
    segments.push({ type: "read", start: arrival, end: arrival + lead + contentDistance + height * 0.3,
      from: destination, to: destination, room, lead, overflow: Math.max(0, overflow), scale: Math.max(0.01, scale) });
  });
  return { segments, distance: segments.at(-1).end };
}

export function resolveTourFrame(path, position) {
  const y = clamp(position, 0, path.distance);
  const index = path.segments.findIndex((segment) => y < segment.end);
  const segmentIndex = index < 0 ? path.segments.length - 1 : index;
  const segment = path.segments[segmentIndex];
  const progress = clamp((y - segment.start) / (segment.end - segment.start), 0, 1);
  const garden = segment.type === "garden";
  return {
    type: segment.type, segmentIndex, progress,
    from: garden ? progress * 0.6 : segment.from,
    to: garden ? progress * 0.6 : segment.to,
    mix: garden ? 0 : progress,
    room: segment.room,
    chapter: garden ? Math.min(2, Math.floor(progress * 3)) : 3,
    scrollTop: segment.type === "read" ? clamp((y - segment.start - segment.lead) / segment.scale, 0, segment.overflow) : 0,
    totalProgress: y / path.distance,
  };
}

export function tourRoomOffset(path, room) {
  if (room < 0) return 0;
  const segment = path.segments.find((item) => item.type === "read" && item.room === room);
  return segment ? segment.start + segment.lead * 0.5 : 0;
}
