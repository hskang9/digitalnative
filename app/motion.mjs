// Active travel follows the display refresh rate; quiet ambient motion is cheaper.
export function shouldRenderFrame(elapsed, active, dirty) {
  return dirty || active || elapsed >= 50;
}

export function cameraDuration(distance) {
  return Math.round(520 + Math.min(680, Math.sqrt(Math.max(0, distance)) * 85));
}

// Zero velocity and acceleration at either end, without overshooting a room.
export function cameraEase(progress) {
  const t = Math.max(0, Math.min(1, progress));
  return t * t * t * (t * (t * 6 - 15) + 10);
}
