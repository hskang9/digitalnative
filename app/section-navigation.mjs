const directions = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };
const nativeControls = 'input, textarea, select, video, audio, [role="textbox"], [role="slider"], [role="spinbutton"], [role="combobox"], [role="listbox"], [role="menu"], [role="tablist"], [role="radiogroup"]';

// null leaves the event entirely to the browser or the focused control.
export function sectionKeyAction(event, { current, count, reading = false, hasSelection = false }) {
  const direction = directions[event.key];
  if (!direction || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.isComposing || hasSelection) return null;
  if (event.target?.isContentEditable || event.target?.closest?.(nativeControls)) return null;
  const vertical = event.key === "ArrowUp" || event.key === "ArrowDown";
  if (vertical && (reading || event.target?.closest?.(".room-surface"))) return { type: "read" };
  // Holding a key should neither skip rooms nor fall through to page scrolling.
  return { type: "section", room: event.repeat ? current : Math.max(-1, Math.min(count - 1, current + direction)) };
}
