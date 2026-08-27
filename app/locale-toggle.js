"use client";

const STORAGE_KEY = "dn-locale";

/**
 * Flips the locale on <html>. Which button reads as active is decided by
 * CSS off that same attribute, so this component holds no state and never
 * disagrees with what the boot script already painted.
 */
function setLocale(locale) {
  const root = document.documentElement;
  root.setAttribute("data-locale", locale);
  root.lang = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode — the choice just won't outlive the session */
  }
}

export default function LocaleToggle() {
  return (
    <div className="lang-toggle" role="group" aria-label="Language / 언어">
      <button
        aria-label="English"
        className="lang-btn"
        data-set="en"
        onClick={() => setLocale("en")}
        type="button"
      >
        EN
      </button>
      <button
        aria-label="한국어"
        className="lang-btn"
        data-set="ko"
        onClick={() => setLocale("ko")}
        type="button"
      >
        KO
      </button>
    </div>
  );
}
