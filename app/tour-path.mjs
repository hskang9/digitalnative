const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smooth = (value) => value * value * (3 - 2 * value);

// Content state never changes the camera: exactly one stop per room.
export const roomCameraStop = (room) => room < 0 ? 0 : room + 1;

// Follow the rendered pose, not a segment-local mix that resets at boundaries.
export function dampTourValue(current, target, delta) {
  if (Math.abs(target - current) < 0.002) return target;
  return current + (target - current) * (1 - Math.exp(-Math.max(0, delta) * 12));
}

// Each room: travel once, hold its summary, reveal details without moving.
// Reading distance scales with actual content, including the last contact/footer.
export function buildTourPath(viewportHeight, rooms) {
  const height = Math.max(1, viewportHeight);
  // Summaries belong to individual rooms, never to a separate garden sequence.
  const segments = [{ type: "garden", start: 0, end: height * 0.4, from: 0, to: 0, room: -1 }];
  rooms.forEach(({ overflow, scale }, room) => {
    const start = segments.at(-1).end;
    const destination = roomCameraStop(room);
    const arrival = start + height * 0.8;
    segments.push({ type: "travel", start, end: arrival, from: roomCameraStop(room - 1), to: destination, room });
    const entry = arrival + height * 0.9;
    const reading = entry + height * 0.28;
    segments.push({ type: "overview", start: arrival, end: entry, from: destination, to: destination, room });
    segments.push({ type: "reveal", start: entry, end: reading, from: destination, to: destination, room });
    const lead = height * 0.18;
    const contentDistance = Math.max(0, overflow) * Math.max(0.01, scale);
    segments.push({ type: "read", start: reading, end: reading + lead + contentDistance + height * 0.3,
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
    from: segment.from,
    to: segment.to,
    mix: garden ? 0 : progress,
    room: segment.room,
    scrollTop: segment.type === "read" ? clamp((y - segment.start - segment.lead) / segment.scale, 0, segment.overflow) : 0,
    departingScrollTop: segment.type === "travel" ? (path.segments[segmentIndex - 1].overflow || 0) : 0,
    totalProgress: y / path.distance,
  };
}

// Visibility follows scroll distance, not camera settling or a CSS timer.
// Short rooms must remain readable even when the user never stops scrolling.
export function resolveTourPanel(frame) {
  if (frame.type === "read") return { room: frame.room, opacity: 1, scrollTop: frame.scrollTop };
  if (frame.type === "travel") {
    const progress = clamp(frame.progress, 0, 1);
    if (progress < 0.22 && frame.room > 0) {
      return { room: frame.room - 1, opacity: 1 - smooth(progress / 0.22), scrollTop: frame.departingScrollTop };
    }
  }
  if (frame.type === "reveal" && frame.progress > 0.55) {
    return { room: frame.room, opacity: smooth(clamp((frame.progress - 0.55) / 0.45, 0, 1)), scrollTop: 0 };
  }
  return { room: -1, opacity: 0, scrollTop: 0 };
}

export function resolveTourSummary(frame) {
  if (frame.type === "overview") return { room: frame.room, opacity: 1, interactive: true };
  if (frame.type === "travel" && frame.progress > 0.72) {
    return { room: frame.room, opacity: smooth(clamp((frame.progress - 0.72) / 0.28, 0, 1)), interactive: false };
  }
  if (frame.type === "reveal" && frame.progress < 0.45) {
    return { room: frame.room, opacity: 1 - smooth(clamp(frame.progress / 0.45, 0, 1)), interactive: false };
  }
  return { room: -1, opacity: 0, interactive: false };
}

export function tourRoomOffset(path, room, view = "read") {
  if (room < 0) return 0;
  const segment = path.segments.find((item) => item.type === view && item.room === room);
  return segment ? segment.start + (segment.lead ? segment.lead * 0.5 : (segment.end - segment.start) * 0.15) : 0;
}
