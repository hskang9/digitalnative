const CONTACT_EMAIL = "contact@digitalnative.vip";

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
          <a href="#contact" className="nav-cta">
            Start a project →
          </a>
        </nav>
      </div>
      <div className="doc-strip" aria-hidden="true">
        <span>
          DOC / DN-LANDING <span className="red">REV 3.0</span>
        </span>
        <span>REGISTERED SOFTWARE DEVELOPMENT FIRM</span>
        <span>© 2026</span>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <p className="hero-kicker mono-label">
        <span className="red">///</span> Consumer AI products, built and
        operated in-house
      </p>
      <h1>
        Software that <span className="strike">demos</span> ships.
      </h1>
      <p className="hero-sub">
        Digital Native designs, builds, and operates its own apps end to end —
        from model integration to app-store release. The same team takes on
        select client work.
      </p>
      <div className="hero-actions">
        <a href="#products" className="btn btn-ink">
          See our products &gt;&gt;&gt;
        </a>
        <a href="#contact" className="btn btn-paper">
          Work with us
        </a>
      </div>
    </section>
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
        <div className="product-cell-name">
          <h3 className="product-name">Imagine</h3>
          <span className="product-meta">
            Mobile / AI image + video / Expo · Supabase · RevenueCat
          </span>
        </div>
        <div className="product-cell-desc">
          <p className="product-desc">
            Type a sentence, get a logo, portrait, cinematic still, or short
            clip — with a gallery, community feed, and creator leaderboard.
            Distributed on Google Play.
          </p>
          <a
            className="product-link"
            href="https://imagineapp.click"
            rel="noopener noreferrer"
            target="_blank"
          >
            imagineapp.click →
          </a>
        </div>
        <div className="product-cell-status">
          <span className="status">
            <span className="status-dot" aria-hidden="true" />
            Live
          </span>
        </div>

        <div className="product-cell-name row-end">
          <h3 className="product-name">JobClaw</h3>
          <span className="product-meta">Web / AI developer portfolios</span>
        </div>
        <div className="product-cell-desc row-end">
          <p className="product-desc">
            Connect your GitHub and JobClaw builds a job-winning technical
            profile from your actual work — projects, contributions, and
            skills, presented for recruiters.
          </p>
          <a
            className="product-link"
            href="https://jobclaw.fyi"
            rel="noopener noreferrer"
            target="_blank"
          >
            jobclaw.fyi →
          </a>
        </div>
        <div className="product-cell-status row-end">
          <span className="status">
            <span className="status-dot" aria-hidden="true" />
            Live
          </span>
        </div>
      </div>
    </section>
  );
}

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
        <div className="capability">
          <span className="capability-index">UNIT / W-01</span>
          <h3>Web applications</h3>
          <p>
            SaaS platforms, dashboards, and marketing sites with Next.js —
            deployed on Vercel with real attention to performance and detail.
          </p>
        </div>
        <div className="capability">
          <span className="capability-index">UNIT / M-02</span>
          <h3>Mobile apps</h3>
          <p>
            Cross-platform apps with Expo and React Native, taken all the way
            through store submission, subscriptions, and post-launch
            operations.
          </p>
        </div>
        <div className="capability">
          <span className="capability-index">UNIT / A-03</span>
          <h3>AI integration</h3>
          <p>
            Image, video, and language model features built into real products
            — generation pipelines, credit systems, and moderation included.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="contact-left">
        <h2>Have a product to build?</h2>
        <p>
          Tell us what you are trying to ship. We reply to every serious
          inquiry within two business days.
        </p>
      </div>
      <div className="contact-right">
        <div className="contact-email mono-label">
          Direct line
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
        <div className="hero-actions">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-ink">
            Start a conversation →
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
        <a href="https://imagineapp.click" rel="noopener noreferrer" target="_blank">
          Imagine
        </a>
        <a href="https://jobclaw.fyi" rel="noopener noreferrer" target="_blank">
          JobClaw
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
      </nav>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="frame">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <CapabilitiesSection />
        <ContactSection />
        <div className="hazard" aria-hidden="true" />
      </main>
      <Footer />
    </div>
  );
}
