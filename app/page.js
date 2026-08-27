import ScrollReveal from "./motion";

const CONTACT_EMAIL = "contact@digitalnative.vip";

const SOCIALS = [
  {
    id: "x",
    label: "X",
    handle: "@hyungsuk_dev",
    href: "https://x.com/hyungsuk_dev",
    path:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "hskang9",
    href: "https://github.com/hskang9",
    path:
      "M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z",
  },
];

function SocialIcon({ path, label }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      <path d={path} fill="currentColor" />
    </svg>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#" className="brand">
          Digital Native<span className="brand-reg">®</span>
        </a>

        <nav className="site-nav">
          <a href="#products" className="nav-link">
            01 / Products
          </a>
          <a href="#capabilities" className="nav-link">
            02 / Capabilities
          </a>
          <a href="#media" className="nav-link">
            03 / Media
          </a>
          {SOCIALS.map((social) => (
            <a
              aria-label={social.label}
              className="nav-social"
              href={social.href}
              key={social.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon label={social.label} path={social.path} />
            </a>
          ))}
          <a href="#contact" className="nav-cta">
            Start a project <span className="arrow">→</span>
          </a>
        </nav>
      </div>
      <div className="doc-strip" aria-hidden="true">
        <span>
          DOC / DN-LANDING <span className="red">REV 3.0</span>
          <span className="caret" />
        </span>
        <span>REGISTERED SOFTWARE DEVELOPMENT FIRM</span>
        <span>© 2026</span>
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <p className="hero-kicker mono-label hero-step" style={{ "--step": 0 }}>
        <span className="red">///</span> Consumer AI products, built and
        operated in-house
      </p>
      <h1>
        <span className="word" style={{ "--step": 0 }}>
          <span className="word-in">Software</span>
        </span>{" "}
        <span className="word" style={{ "--step": 1 }}>
          <span className="word-in">that</span>
        </span>{" "}
        <span className="word" style={{ "--step": 2 }}>
          <span className="word-in">
            <span className="strike">demos</span>
          </span>
        </span>{" "}
        <span className="word" style={{ "--step": 3 }}>
          <span className="word-in">ships.</span>
        </span>
      </h1>
      <p className="hero-sub hero-step" style={{ "--step": 5 }}>
        Digital Native designs, builds, and operates its own apps end to end —
        from model integration to app-store release. The same team takes on
        select client work.
      </p>
      <div className="hero-actions hero-step" style={{ "--step": 6 }}>
        <a href="#products" className="btn btn-ink">
          See our products <span className="arrow">&gt;&gt;&gt;</span>
        </a>
        <a href="#contact" className="btn btn-paper">
          Work with us
        </a>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    name: "Standard",
    logo: "/logos/standard.png",
    meta: "Web / Onchain orderbook DEX",
    desc:
      "A fully onchain central-limit orderbook exchange — live charts, depth, and market/limit/pro order entry, settled onchain rather than against an AMM curve. Now operated as Iter.",
    links: [
      { href: "https://standard.im", label: "standard.im →" },
      { href: "https://iter.cx", label: "iter.cx →" },
    ],
    status: "Live",
    video: {
      src: "/media/dex_demo.mp4",
      poster: "/media/dex_demo-poster.jpg",
      caption: "FIG. 01 — Standard trade terminal, recorded session",
    },
  },
  {
    name: "Imagine",
    logo: "/logos/imagine.png",
    meta: "Mobile / AI image + video / Expo · Supabase · RevenueCat",
    desc:
      "Type a sentence, get a logo, portrait, cinematic still, or short clip — with a gallery, community feed, and creator leaderboard. Distributed on Google Play.",
    links: [{ href: "https://imagineapp.click", label: "imagineapp.click →" }],
    status: "Live",
  },
  {
    name: "JobClaw",
    logo: "/logos/jobclaw.png",
    meta: "Web / AI developer portfolios",
    desc:
      "Connect your GitHub and JobClaw builds a job-winning technical profile from your actual work — projects, contributions, and skills, presented for recruiters.",
    links: [{ href: "https://jobclaw.fyi", label: "jobclaw.fyi →" }],
    status: "Live",
  },
  {
    name: "Mochi",
    logo: "/logos/mochi.png",
    meta: "Mobile + web / Expo · Hono · Firestore",
    desc:
      "A private photo album for your cat, with an optional public community — automatic backup at original quality, care calendars, and shared family albums. Korean and English.",
    links: [{ href: "https://mochi.camera", label: "mochi.camera →" }],
    status: "Beta",
  },
  {
    name: "Pensa",
    logo: "/logos/pensa.png",
    meta: "Web / AI writing analysis / Next.js · FastAPI",
    desc:
      "Reads academic writing the way a demanding teacher does: paragraph by paragraph, checking whether the reasoning holds and whether the details are right.",
    links: [{ href: "https://pensa.lat", label: "pensa.lat →" }],
    status: "Beta",
  },
];

function ProductRow({ product, last }) {
  const rowEnd = last ? " row-end" : "";
  const live = product.status === "Live";

  return (
    <>
      <div
        className={`product-cell-name${rowEnd}`}
        data-reveal
        data-reveal-step="0"
      >
        {product.logo ? (
          <img
            alt=""
            className="product-logo"
            height="56"
            loading="lazy"
            src={product.logo}
            width="56"
          />
        ) : null}
        <h3 className="product-name">{product.name}</h3>
        <span className="product-meta">{product.meta}</span>
      </div>
      <div
        className={`product-cell-desc${rowEnd}`}
        data-reveal
        data-reveal-step="1"
      >
        <p className="product-desc">{product.desc}</p>
        {product.video ? (
          <figure className="product-figure">
            <video
              data-inview
              loop
              muted
              playsInline
              poster={product.video.poster}
              preload="metadata"
              src={product.video.src}
            />
            <figcaption>{product.video.caption}</figcaption>
          </figure>
        ) : null}
        <div className="product-links">
          {product.links.map((link) => (
            <a
              className="product-link"
              href={link.href}
              key={link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div
        className={`product-cell-status${rowEnd}`}
        data-reveal
        data-reveal-step="2"
      >
        <span className={live ? "status" : "status status-beta"}>
          <span className="status-dot" aria-hidden="true" />
          {product.status}
        </span>
      </div>
    </>
  );
}

function ProductsSection() {
  return (
    <section id="products">
      <div className="section-head">
        <h2>
          <span className="index">01</span>[ Products in production ]
        </h2>
        <span className="aside">Live systems — not mockups</span>
      </div>

      <div className="product-table">
        {PRODUCTS.map((product, i) => (
          <ProductRow
            key={product.name}
            last={i === PRODUCTS.length - 1}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

const CAPABILITIES = [
  {
    index: "UNIT / W-01",
    title: "Web applications",
    body:
      "SaaS platforms, dashboards, and marketing sites with Next.js — deployed on Vercel with real attention to performance and detail.",
  },
  {
    index: "UNIT / M-02",
    title: "Mobile apps",
    body:
      "Cross-platform apps with Expo and React Native, taken all the way through store submission, subscriptions, and post-launch operations.",
  },
  {
    index: "UNIT / A-03",
    title: "AI integration",
    body:
      "Image, video, and language model features built into real products — generation pipelines, credit systems, and moderation included.",
  },
];

function CapabilitiesSection() {
  return (
    <section id="capabilities">
      <div className="section-head">
        <h2>
          <span className="index">02</span>[ Capabilities ]
        </h2>
        <span className="aside">Full lifecycle</span>
      </div>

      <div className="capability-grid">
        {CAPABILITIES.map((capability, i) => (
          <div
            className="capability"
            data-reveal
            data-reveal-step={i}
            key={capability.index}
          >
            <span className="capability-index">{capability.index}</span>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Press, podcasts, and interviews. Add newest first; each entry is one
 * object — no other change is needed for it to render.
 *
 *   {
 *     outlet: "Some Podcast",
 *     title: "Building consumer AI solo",
 *     format: "Podcast",          // Podcast | Interview | Video | Article | Talk
 *     date: "2026-09",            // YYYY-MM, printed as SEP 2026
 *     href: "https://youtube.com/watch?v=...",
 *     note: "One line on what was covered.",   // optional
 *   }
 */
const MEDIA = [];

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function printDate(date) {
  if (!date) return "—";
  const [year, month] = date.split("-");
  const label = MONTHS[Number(month) - 1];
  return label ? `${label} ${year}` : year;
}

function hostOf(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function MediaRow({ item, last }) {
  const rowEnd = last ? " row-end" : "";

  return (
    <>
      <div
        className={`media-cell-outlet${rowEnd}`}
        data-reveal
        data-reveal-step="0"
      >
        <span className="media-format">{item.format}</span>
        <h3 className="media-outlet">{item.outlet}</h3>
        <span className="media-date">{printDate(item.date)}</span>
      </div>
      <div
        className={`media-cell-title${rowEnd}`}
        data-reveal
        data-reveal-step="1"
      >
        <p className="media-title">{item.title}</p>
        {item.note ? <p className="media-note">{item.note}</p> : null}
      </div>
      <div
        className={`media-cell-link${rowEnd}`}
        data-reveal
        data-reveal-step="2"
      >
        <a
          className="product-link"
          href={item.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {hostOf(item.href)} <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
}

function MediaSection() {
  return (
    <section id="media">
      <div className="section-head">
        <h2>
          <span className="index">03</span>[ Media &amp; appearances ]
        </h2>
        <span className="aside">
          {MEDIA.length
            ? `${MEDIA.length} entr${MEDIA.length === 1 ? "y" : "ies"} on file`
            : "Press, podcasts, interviews"}
        </span>
      </div>

      {MEDIA.length ? (
        <div className="media-table">
          {MEDIA.map((item, i) => (
            <MediaRow item={item} key={item.href} last={i === MEDIA.length - 1} />
          ))}
        </div>
      ) : (
        <div className="media-empty" data-reveal data-reveal-step="0">
          <span className="mono-label media-empty-file">
            FILE / DN-MEDIA <span className="red">— 0 ENTRIES</span>
          </span>
          <p>
            Interviews, podcasts, and press are logged here as they publish.
          </p>
          <a className="product-link" href={`mailto:${CONTACT_EMAIL}`}>
            Press enquiries <span className="arrow">→</span>
          </a>
        </div>
      )}
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="contact-left" data-reveal data-reveal-step="0">
        <h2>Have a product to build?</h2>
        <p>
          Tell us what you are trying to ship. We reply to every serious
          inquiry within two business days.
        </p>
      </div>
      <div className="contact-right" data-reveal data-reveal-step="1">
        <div className="contact-email mono-label">
          Direct line
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <div className="contact-socials">
          {SOCIALS.map((social) => (
            <a
              className="contact-social"
              href={social.href}
              key={social.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon label={social.label} path={social.path} />
              <span>{social.handle}</span>
              <span className="arrow">↗</span>
            </a>
          ))}
        </div>
        <div className="hero-actions">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ink">
            Start a conversation <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Digital Native® — All rights reserved</span>
      <nav>
        {PRODUCTS.map((product) => (
          <a
            href={product.links[0].href}
            key={product.name}
            rel="noopener noreferrer"
            target="_blank"
          >
            {product.name}
          </a>
        ))}
        {SOCIALS.map((social) => (
          <a
            className="footer-social"
            href={social.href}
            key={social.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            <SocialIcon label={social.label} path={social.path} />
            {social.label}
          </a>
        ))}
        <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
      </nav>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="frame">
      <ScrollReveal />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <CapabilitiesSection />
        <MediaSection />
        <ContactSection />
        <div className="hazard" aria-hidden="true" />
      </main>
      <Footer />
    </div>
  );
}
