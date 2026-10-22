import LocaleToggle from "../locale-toggle";
import { ADVISORY_URL, C, CISA_URL } from "./copy";
import { BulkCheck, HelpMail, InsideCheck, L, PortfolioMail, ShareRow, SingleCheck } from "./checker";
import "./php-check.css";

export const metadata = {
  metadataBase: new URL("https://digitalnative.vip"),
  title: "PHP2Shell check: is your site exposed? · Digital Native",
  description:
    "Free check for PHP2Shell (CVE-2026-109618, CVE-2026-109619): see whether a site's PHP needs the 21 October 2026 emergency update. In English and Korean.",
  openGraph: {
    title: "PHP2Shell check: is your site exposed?",
    description: "A critical PHP flaw lets attackers run code on the server without a password. Check a site in seconds.",
    type: "website",
    url: "https://digitalnative.vip/php-patch-check",
    images: [{ url: "/og-php-patch-check.png", width: 1200, height: 630, alt: "PHP2Shell check by Digital Native" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PHP2Shell check: is your site exposed?",
    description: "A critical PHP flaw lets attackers run code on the server without a password. Check a site in seconds.",
    images: ["/og-php-patch-check.png"],
  },
};

export default function PhpPatchCheck() {
  return (
    <div className="ppc">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" className="brand" aria-label={C.backHome.en}>
            <svg className="brand-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 27V5h9a11 11 0 0 1 0 22H5Z" stroke="currentColor" strokeWidth="1.5"/><path d="M11 27V11l15 16M11 11h15v16" stroke="currentColor" strokeWidth="1.5"/></svg>
            Digital Native<span className="brand-reg">®</span>
          </a>
          <LocaleToggle />
        </div>
      </header>

      <main className="ppc-main">
        <section className="ppc-hero">
          <p className="ppc-chip"><span className="ppc-pulse" aria-hidden="true" /><L t={C.chip} /></p>
          <h1><L t={C.h1} /></h1>
          <p className="ppc-lead"><L t={C.lead} /></p>
          <SingleCheck />
          <p className="ppc-multi"><a href="#bulk"><L t={C.heroMulti} /></a></p>
        </section>

        <section className="ppc-facts" aria-label="PHP2Shell">
          <div>
            <p className="ppc-eyebrow"><L t={C.fixedEyebrow} /></p>
            <p className="ppc-versions"><span>8.5.12</span><span>8.4.27</span><span>8.3.36</span><span>8.2.35</span></p>
            <p className="ppc-fine"><L t={C.fixedNote} /></p>
          </div>
          <div>
            <p className="ppc-eyebrow"><L t={C.severityEyebrow} /></p>
            <p className="ppc-big">9.2 <small>/ 10</small></p>
            <p className="ppc-fine"><L t={C.severityNote} /></p>
          </div>
          <div>
            <p className="ppc-eyebrow"><L t={C.scopeEyebrow} /></p>
            <p className="ppc-fine is-strong"><L t={C.scopeNote} /></p>
          </div>
        </section>

        <section className="ppc-block" aria-labelledby="ppc-bulk-h" id="bulk">
          <p className="ppc-eyebrow"><L t={C.bulkEyebrow} /></p>
          <h2 id="ppc-bulk-h"><L t={C.bulkH} /></h2>
          <p><L t={C.bulkP} /></p>
          <BulkCheck />
          <p className="ppc-fine ppc-more"><L t={C.bulkMore} /> <PortfolioMail><L t={C.bulkMoreLink} /></PortfolioMail></p>
        </section>

        <section className="ppc-block" aria-labelledby="ppc-inside-h" id="inside">
          <p className="ppc-eyebrow"><L t={C.insideEyebrow} /></p>
          <h2 id="ppc-inside-h"><L t={C.insideH} /></h2>
          <p><L t={C.insideP} /></p>
          <ol className="ppc-steps is-compact">
            {C.inside.map((s, i) => <li key={i}><L t={s} /></li>)}
          </ol>
          <InsideCheck />
        </section>

        <section className="ppc-block" aria-labelledby="ppc-now-h">
          <p className="ppc-eyebrow is-urgent"><L t={C.nowEyebrow} /></p>
          <h2 id="ppc-now-h"><L t={C.nowH} /></h2>
          <p><L t={C.nowP} /></p>
          <ol className="ppc-steps">
            {C.now.map((s, i) => (
              <li key={i}>
                <strong><L t={s.t} /></strong>
                <span className="ppc-step-body"><L t={s.d} />{s.link && <> <a href={s.link} target="_blank" rel="noopener noreferrer">php.net →</a></>}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="ppc-block" aria-labelledby="ppc-myth-h">
          <p className="ppc-eyebrow"><L t={C.mythEyebrow} /></p>
          <h2 id="ppc-myth-h"><L t={C.mythH} /></h2>
          <ul className="ppc-myths">
            {C.myths.map((m, i) => (
              <li key={i}><strong><L t={m.t} /></strong><span><L t={m.d} /></span></li>
            ))}
          </ul>
        </section>

        <section className="ppc-block" aria-labelledby="ppc-time-h">
          <p className="ppc-eyebrow"><L t={C.timeEyebrow} /></p>
          <h2 id="ppc-time-h"><L t={C.timeH} /></h2>
          <ol className="ppc-timeline">
            {C.timeline.map((e, i) => (
              <li key={i}>
                <time dateTime="2026-10-21"><L t={e.date} /></time>
                <p><L t={e.d} /></p>
                <a href={e.source[1]} target="_blank" rel="noopener noreferrer">{e.source[0]}</a>
              </li>
            ))}
          </ol>
          <p className="ppc-fine">
            <L t={C.sources} />{" "}
            <a href={ADVISORY_URL} target="_blank" rel="noopener noreferrer">PHP security advisory</a> ·{" "}
            <a href={CISA_URL} target="_blank" rel="noopener noreferrer">CISA alert</a> ·{" "}
            <a href="https://www.php.net/supported-versions.php" target="_blank" rel="noopener noreferrer">PHP supported versions</a> ·{" "}
            <a href="https://www.php.net/downloads.php" target="_blank" rel="noopener noreferrer">PHP downloads</a>
          </p>
        </section>

        <section className="ppc-block" aria-labelledby="ppc-share-h">
          <h2 id="ppc-share-h"><L t={C.shareH} /></h2>
          <p><L t={C.shareP} /></p>
          <ShareRow />
        </section>

        <section className="ppc-block is-last" aria-labelledby="ppc-help-h">
          <h2 id="ppc-help-h"><L t={C.helpH} /></h2>
          <p><L t={C.helpP} /></p>
          <HelpMail><L t={C.helpBtn} /></HelpMail>
        </section>
      </main>

      <footer className="ppc-foot">
        <p><L t={C.foot1} /></p>
        <p><L t={C.foot2} /></p>
        <p>© 2026 <a href="/">Digital Native</a></p>
      </footer>
    </div>
  );
}
