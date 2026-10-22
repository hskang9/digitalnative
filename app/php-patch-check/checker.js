"use client";

import { useEffect, useState } from "react";
import { C, CONTACT_EMAIL, CTA, DETAIL, ERRORS, FIXED, MAX_BULK, META_LABELS, STATS, STATUS } from "./copy";

// The checker runs as a Vercel Function in its own project, because this site is a
// static export. CORS there only admits digitalnative.vip and local dev.
const API = "https://php2shell-check.vercel.app/api/check";
const STATS_API = "https://php2shell-check.vercel.app/api/stats";

const RANK = { vulnerable: 0, eol: 1, "needs-patch-level": 2, hidden: 3, error: 4, "no-signs": 5, "not-php": 6, patched: 7 };
const TONE = { vulnerable: "bad", eol: "bad", "needs-patch-level": "warn", hidden: "warn", error: "muted", "no-signs": "muted", "not-php": "ok", patched: "ok" };

export function L({ t }) {
  return (
    <>
      <span data-l="en">{t.en}</span>
      <span data-l="ko">{t.ko}</span>
    </>
  );
}

// Tracks <html data-locale> for the few strings that can't be two spans
// (placeholders, <option>, share text, the clipboard).
function useLocale() {
  const [locale, setLocale] = useState("en");
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setLocale(root.getAttribute("data-locale") === "ko" ? "ko" : "en");
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-locale"] });
    return () => obs.disconnect();
  }, []);
  return locale;
}

async function runCheck(url) {
  try {
    const res = await fetch(`${API}?url=${encodeURIComponent(url)}`);
    return { input: url, ...(await res.json()) };
  } catch {
    return { input: url, error: "unreachable" };
  }
}

function judge(full) {
  const [maj, min, pat] = full.split(".").map(Number);
  if (maj > 8 || (maj === 8 && min > 5)) return "patched";
  if (maj < 8 || min <= 1) return "eol";
  return pat >= Number(FIXED[`${maj}.${min}`].split(".")[2]) ? "patched" : "vulnerable";
}

const CTA_STATUSES = new Set(["vulnerable", "eol", "needs-patch-level", "hidden", "no-signs", "error"]);

function ResultCta({ r }) {
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const status = r.error ? "error" : r.status;
  const label = r.error ? (ERRORS[r.error] || ERRORS.unreachable)[locale] : STATUS[status][locale];
  const site = r.finalUrl || r.input;
  const body = [
    CTA.intro[locale],
    "",
    `${site}`,
    `${label}${r.php ? ` (PHP ${r.php.full})` : ""}`,
    r.platforms?.length ? `${META_LABELS.platform[locale]}: ${r.platforms.join(", ")}` : "",
    r.evidence?.length ? `${CTA.evidence[locale]}: ${r.evidence.join("; ")}` : "",
  ].filter((line, i) => line || i === 1).join("\n");
  const resultUrl = `${location.origin}${location.pathname}?site=${encodeURIComponent(r.input)}`;

  return (
    <div className="ppc-cta">
      <p><L t={CTA.lead} /></p>
      <ul>{CTA.points.map((p, i) => <li key={i}><L t={p} /></li>)}</ul>
      <div className="ppc-row">
        <a className="ppc-btn is-primary" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${CTA.subject[locale]} · ${r.host || r.input}`)}&body=${encodeURIComponent(body)}`}>
          <L t={CTA.review} />
        </a>
        <button
          type="button"
          className="ppc-btn is-ghost"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(resultUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              /* clipboard blocked */
            }
          }}
        >
          <L t={copied ? C.copied : CTA.copyResult} />
        </button>
      </div>
    </div>
  );
}

function ResultCard({ r, compact = false, cta = false }) {
  if (r.pending) {
    return (
      <div className="ppc-card is-loading is-compact">
        <span className="ppc-spinner" aria-hidden="true" />
        {r.input}
      </div>
    );
  }
  const status = r.error ? "error" : r.status;
  const v = r.php?.version;
  const branch = v ? v.split(".").slice(0, 2).join(".") : null;
  const facts = { v, branch, fixed: FIXED[branch] || "", platforms: (r.platforms || []).join(", "), full: r.php?.full };
  const title = r.error ? ERRORS[r.error] || ERRORS.unreachable : STATUS[status];
  const detail = r.error ? null : DETAIL[status](facts);
  const showDistro = r.php?.distro && (status === "vulnerable" || status === "eol");
  const showInside = ["hidden", "no-signs", "needs-patch-level"].includes(status);

  return (
    <article className={`ppc-card tone-${TONE[status]}${compact ? " is-compact" : ""}`}>
      <header>
        <strong className="ppc-badge"><L t={title} /></strong>
        {compact && <span className="ppc-host">{r.host || r.input}</span>}
      </header>
      {detail && (
        <p>
          <L t={detail} />
          {showInside && <> <a href="#inside">check-php.php ↓</a></>}
        </p>
      )}
      {showDistro && <p className="ppc-note"><L t={DETAIL.distro(facts)} /></p>}
      {!r.error && (r.php || r.platforms?.length || (!compact && r.finalUrl)) ? (
        <p className="ppc-meta">
          {r.php && <span><b>PHP</b> {r.php.full} <i>({r.php.source})</i></span>}
          {r.platforms?.length > 0 && <span><b><L t={META_LABELS.platform} /></b> {r.platforms.join(", ")}</span>}
          {!compact && r.finalUrl && <span><b><L t={META_LABELS.checked} /></b> {r.finalUrl}</span>}
        </p>
      ) : null}
      {!compact && r.evidence?.length > 0 && (
        <p className="ppc-meta"><span><b><L t={CTA.evidence} /></b> {r.evidence.join(" · ")}</span></p>
      )}
      {cta && CTA_STATUSES.has(status) && <ResultCta r={r} />}
    </article>
  );
}

export function SingleCheck() {
  const locale = useLocale();
  const [site, setSite] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [manual, setManual] = useState(null);
  const [manualOpen, setManualOpen] = useState(false);

  async function check(url) {
    if (!url.trim()) return;
    setBusy(true);
    setResult({ pending: true, input: url });
    const r = await runCheck(url.trim());
    setResult(r);
    window.dispatchEvent(new Event("ppc-checked"));
    setBusy(false);
    const params = new URLSearchParams(location.search);
    params.set("site", url.trim());
    history.replaceState(null, "", `${location.pathname}?${params}`);
  }

  // Deep links: ?site=example.com runs a check; ?full=8.3.20 comes back from check-php.php.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const full = params.get("full");
    const v = params.get("v");
    if (full && /^\d+\.\d+\.\d+$/.test(full)) {
      setManual({ full });
      setManualOpen(true);
      // Count each returning owner once per browser session.
      try {
        if (!sessionStorage.getItem(`ppc-owner-${full}`)) {
          sessionStorage.setItem(`ppc-owner-${full}`, "1");
          fetch(`${STATS_API}?event=owner&eol=${judge(full) === "eol" ? 1 : 0}`, { method: "POST" }).catch(() => {});
        }
      } catch {
        /* storage blocked; skip the count */
      }
    } else if (v && ["8.5", "8.4", "8.3", "8.2", "8.1", "8.0", "7", "5"].includes(v)) {
      setManual({ branch: v });
      setManualOpen(true);
    }
    const s = params.get("site");
    if (s) {
      setSite(s);
      check(s);
    }
    // Runs once on load; check() only reads its argument.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let manualResult = null;
  if (manual?.full) {
    manualResult = { status: judge(manual.full), php: { version: manual.full, full: manual.full, source: "check-php.php" } };
  } else if (manual?.branch && FIXED[manual.branch]) {
    manualResult = { status: "needs-patch-level", php: { version: manual.branch, full: manual.branch, source: "manual" } };
  } else if (manual?.branch) {
    const label = { 7: "7.x", 5: "5.x" }[manual.branch] || manual.branch;
    manualResult = { status: "eol", php: { version: label, full: label, source: "manual" } };
  }

  return (
    <>
      <form
        className="ppc-checker"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          check(site);
        }}
      >
        <label className="sr-only" htmlFor="ppc-site"><L t={C.siteLabel} /></label>
        <input
          id="ppc-site"
          type="text"
          inputMode="url"
          spellCheck={false}
          required
          placeholder="yourwebsite.com"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <button type="submit" className="ppc-btn is-primary" disabled={busy}>
          <L t={busy ? C.checking : C.checkBtn} />
        </button>
      </form>
      <p className="ppc-fine"><L t={C.checkerNote} /></p>
      <div className="ppc-result" aria-live="polite">
        {result && (result.pending ? (
          <div className="ppc-card is-loading">
            <span className="ppc-spinner" aria-hidden="true" />
            <L t={C.checking} />
          </div>
        ) : <ResultCard r={result} cta />)}
      </div>

      <details className="ppc-manual" id="ver" open={manualOpen} onToggle={(e) => setManualOpen(e.currentTarget.open)}>
        <summary><L t={C.manualSummary} /></summary>
        <div className="ppc-manual-body">
          <label htmlFor="ppc-version"><L t={C.manualLabel} /></label>
          <select
            id="ppc-version"
            value={manual?.branch || (manual?.full ? manual.full.split(".").slice(0, 2).join(".") : "")}
            onChange={(e) => setManual(e.target.value ? { branch: e.target.value } : null)}
          >
            <option value="">{C.manualPick[locale]}</option>
            {["8.5", "8.4", "8.3", "8.2", "8.1", "8.0"].map((v) => <option key={v} value={v}>PHP {v}</option>)}
            <option value="7">PHP 7.x</option>
            <option value="5">PHP 5.x</option>
          </select>
          <div aria-live="polite">{manualResult && <ResultCard r={manualResult} />}</div>
        </div>
      </details>
    </>
  );
}

function summaryLine(r, locale) {
  const label = r.error ? (ERRORS[r.error] || ERRORS.unreachable)[locale] : STATUS[r.status][locale];
  const php = r.php ? ` (PHP ${r.php.full})` : "";
  const platforms = r.platforms?.length ? ` [${r.platforms.join(", ")}]` : "";
  return `- ${r.host || r.input}: ${label}${php}${platforms}`;
}

export function BulkCheck() {
  const locale = useLocale();
  const [text, setText] = useState("");
  const [results, setResults] = useState(null);
  const [busy, setBusy] = useState(false);
  const list = [...new Set(text.split(/[\n,\s]+/).map((s) => s.trim()).filter(Boolean))];

  async function submit(e) {
    e.preventDefault();
    const sites = list.slice(0, MAX_BULK);
    if (!sites.length) return;
    setBusy(true);
    const out = sites.map((input) => ({ input, pending: true }));
    setResults([...out]);
    let next = 0;
    // Three at a time stays well inside the API's rate limit.
    await Promise.all(Array.from({ length: 3 }, async () => {
      while (next < sites.length) {
        const i = next++;
        out[i] = await runCheck(sites[i]);
        setResults([...out]);
      }
    }));
    window.dispatchEvent(new Event("ppc-checked"));
    out.sort((a, b) => RANK[a.error ? "error" : a.status] - RANK[b.error ? "error" : b.status]);
    setResults([...out]);
    setBusy(false);
  }

  return (
    <>
      <form className="ppc-bulk" onSubmit={submit}>
        <label htmlFor="ppc-bulk" className="sr-only"><L t={C.bulkLabel} /></label>
        <textarea
          id="ppc-bulk"
          rows={6}
          spellCheck={false}
          placeholder={"clientone.com\nclienttwo.com\nshop.example.com"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="ppc-fine ppc-hint"><L t={C.bulkHint} /></p>
        <div className="ppc-row">
          <button type="submit" className="ppc-btn is-primary" disabled={busy}><L t={C.bulkBtn} /></button>
          <span className="ppc-fine"><L t={C.bulkSlow} /></span>
          {list.length > 0 && (
            <span className="ppc-fine">
              {Math.min(list.length, MAX_BULK)} / {MAX_BULK}
              {list.length > MAX_BULK && <> · <L t={C.bulkTooMany} /></>}
            </span>
          )}
        </div>
      </form>
      {results && (
        <div className="ppc-bulk-grid" aria-live="polite">
          {results.map((r, i) => <ResultCard key={`${r.input}-${i}`} r={r} compact />)}
        </div>
      )}
      {results && !busy && (
        <a
          className="ppc-btn is-primary ppc-send"
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(C.bulkSendSubject[locale])}&body=${encodeURIComponent(
            `${C.bulkSendIntro[locale]}\n\n${results.map((r) => summaryLine(r, locale)).join("\n")}\n`,
          )}`}
        >
          <L t={C.bulkSend} />
        </a>
      )}
    </>
  );
}

function phpScript(origin) {
  return `<?php
// check-php.php: shows your exact PHP version once, then deletes itself.
// It sends nothing anywhere. The link below only opens if you click it.
header('Content-Type: text/html; charset=utf-8');
$id = PHP_VERSION_ID;
$fixed = ($id >= 80512) || ($id >= 80427 && $id < 80500) || ($id >= 80336 && $id < 80400) || ($id >= 80235 && $id < 80300);
echo '<p>PHP ' . htmlspecialchars(PHP_VERSION) . ' (' . PHP_SAPI . ')</p>';
if ($id < 80200) {
    echo '<p>END OF LIFE: no official update. Move to PHP 8.2 or newer.</p>';
} elseif ($fixed) {
    echo '<p>Has the PHP2Shell fix. Make sure PHP was restarted after updating.</p>';
} else {
    echo '<p>NEEDS THE UPDATE: install 8.5.12, 8.4.27, 8.3.36 or 8.2.35, then restart PHP.</p>';
}
// Remove this file so your version is not left public.
echo @unlink(__FILE__) ? '<p>(this file has deleted itself)</p>' : '<p>(please delete this file now)</p>';
$full = PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION . '.' . PHP_RELEASE_VERSION;
echo '<p><a href="${origin}/php-patch-check?full=' . urlencode($full) . '#ver">What this means for your site</a></p>';
`;
}

export function InsideCheck() {
  const [origin, setOrigin] = useState("https://digitalnative.vip");
  const [copied, setCopied] = useState(false);
  useEffect(() => setOrigin(location.origin), []);
  const code = phpScript(origin);

  return (
    <>
      <div className="ppc-code-head">
        <span>check-php.php</span>
        <div>
          <button
            type="button"
            className="ppc-btn is-small is-ghost"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              } catch {
                /* clipboard blocked; the code is still selectable */
              }
            }}
          >
            <L t={copied ? C.copied : C.copy} />
          </button>
          <button
            type="button"
            className="ppc-btn is-small"
            onClick={() => {
              const href = URL.createObjectURL(new Blob([code], { type: "application/x-php" }));
              const a = Object.assign(document.createElement("a"), { href, download: "check-php.php" });
              document.body.append(a);
              a.click();
              a.remove();
              setTimeout(() => URL.revokeObjectURL(href), 1000);
            }}
          >
            <L t={C.download} />
          </button>
        </div>
      </div>
      <pre className="ppc-code"><code>{code}</code></pre>
    </>
  );
}

export function ShareRow() {
  const locale = useLocale();
  const [pageUrl, setPageUrl] = useState("https://digitalnative.vip/php-patch-check");
  const [copied, setCopied] = useState(false);
  useEffect(() => setPageUrl(`${location.origin}${location.pathname}`), []);
  const url = encodeURIComponent(pageUrl);
  const text = encodeURIComponent(C.shareText[locale]);
  const links = [
    ["X", `https://x.com/intent/post?text=${text}&url=${url}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${url}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${url}`],
  ];
  return (
    <div className="ppc-share">
      {links.map(([name, href]) => (
        <a key={name} className="ppc-btn is-ghost" href={href} target="_blank" rel="noopener noreferrer">{name}</a>
      ))}
      <a className="ppc-btn is-ghost" href={`mailto:?subject=PHP2Shell&body=${text}%20${url}`}><L t={C.email} /></a>
      <button
        type="button"
        className="ppc-btn is-ghost"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(pageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            /* clipboard blocked */
          }
        }}
      >
        <L t={copied ? C.copied : C.copyLink} />
      </button>
    </div>
  );
}

export function PortfolioMail({ children }) {
  const locale = useLocale();
  return <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(C.bulkMoreSubject[locale])}`}>{children}</a>;
}

export function HelpMail({ children }) {
  const locale = useLocale();
  return (
    <a className="ppc-btn is-primary" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(C.helpSubject[locale])}`}>
      {children}
    </a>
  );
}

export function LiveStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(STATS_API);
        if (res.ok && alive) setStats(await res.json());
      } catch {
        /* keep the last numbers */
      }
    };
    load();
    const id = setInterval(load, 30_000);
    window.addEventListener("ppc-checked", load);
    return () => {
      alive = false;
      clearInterval(id);
      window.removeEventListener("ppc-checked", load);
    };
  }, []);

  if (!stats || !stats.checked) return null;
  return (
    <aside className="ppc-live" aria-live="polite">
      <p className="ppc-live-head">
        <span className="ppc-pulse is-live" aria-hidden="true" />
        <strong><L t={STATS.live} /></strong>
        <span><L t={STATS.checked(stats.checked)} /></span>
        <span>· <L t={STATS.php(stats.php, stats.checked)} /></span>
        {stats.eol > 0 && <span>· <L t={STATS.eol(stats.eol)} /></span>}
        {stats.vulnerable > 0 && <span>· <L t={STATS.vulnerable(stats.vulnerable)} /></span>}
      </p>
      {stats.shown > 0 && <p><L t={STATS.shown(stats.eol, stats.shown)} /></p>}
      {stats.owners > 0 && <p><L t={STATS.owners(stats.ownersEol, stats.owners)} /></p>}
      {stats.platforms?.length > 0 && (
        <p><L t={STATS.most} /> {stats.platforms.map((p) => `${p.name} ${p.count}`).join(" · ")}</p>
      )}
      <p className="ppc-live-note"><L t={STATS.note} /></p>
    </aside>
  );
}
