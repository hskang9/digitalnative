import Script from "next/script";

const CONTACT_EMAIL = "contact@digitalnative.vip";

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a href="#" className="brand">
          <span className="brand-mark" aria-hidden="true">
            *
          </span>
          Digital Native
        </a>

        <nav className="site-nav">
          <a href="#products" className="nav-link">
            Products
          </a>
          <a href="#capabilities" className="nav-link">
            Capabilities
          </a>
          <a href="#contact" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="container reveal">
        <p className="hero-badge">Registered software development firm</p>
        <h1>
          We build consumer <em>AI products</em> — and ship them to stores.
        </h1>
        <p className="hero-lead">
          Digital Native designs, builds, and operates its own apps end to end
          — from model integration to app-store release. The same team takes on
          select client work.
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn btn-primary">
            See our products
          </a>
          <a href="#contact" className="btn btn-secondary">
            Work with us
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="products" className="section">
      <div className="container">
        <div className="reveal">
          <h2 className="section-title">Products we run in production</h2>
          <p className="section-sub">
            Not a portfolio of mockups — live products with real users, built
            and operated by us.
          </p>
        </div>

        <article className="product reveal">
          <div>
            <h3 className="product-name">Imagine</h3>
            <div className="product-tags">
              <span className="tag tag-accent">Mobile</span>
              <span className="tag tag-green">Live on Google Play</span>
            </div>
          </div>
          <div>
            <p className="product-desc">
              An AI image and video app. Type a sentence, get a logo, portrait,
              cinematic still, or short clip — with a gallery, community feed,
              and creator leaderboard. Expo/React Native on a Supabase and Hono
              backend, with RevenueCat subscriptions.
            </p>
            <a
              className="product-link"
              href="https://imagineapp.click"
              rel="noopener noreferrer"
              target="_blank"
            >
              Visit Imagine →
            </a>
            <span className="product-domain">imagineapp.click</span>
          </div>
        </article>

        <article className="product reveal">
          <div>
            <h3 className="product-name">JobClaw</h3>
            <div className="product-tags">
              <span className="tag tag-accent">Web</span>
              <span className="tag tag-yellow">AI portfolio</span>
            </div>
          </div>
          <div>
            <p className="product-desc">
              An AI portfolio for developers. Connect your GitHub and JobClaw
              builds a job-winning technical profile from your actual work —
              projects, contributions, and skills, presented for recruiters.
            </p>
            <a
              className="product-link"
              href="https://jobclaw.fyi"
              rel="noopener noreferrer"
              target="_blank"
            >
              Visit JobClaw →
            </a>
            <span className="product-domain">jobclaw.fyi</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function CapabilityIcon({ children }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section">
      <div className="container">
        <div className="reveal">
          <h2 className="section-title">What we take on</h2>
          <p className="section-sub">
            Full-lifecycle software development, informed by shipping our own
            products.
          </p>
        </div>

        <div className="capabilities">
          <div className="capability reveal">
            <div className="capability-icon">
              <CapabilityIcon>
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M3 9h18M7 21h10" />
              </CapabilityIcon>
            </div>
            <h3>Web applications</h3>
            <p>
              SaaS platforms, dashboards, and marketing sites with Next.js —
              deployed on Vercel with real attention to performance and detail.
            </p>
          </div>

          <div className="capability reveal">
            <div className="capability-icon">
              <CapabilityIcon>
                <rect x="7" y="2" width="10" height="20" rx="2.5" />
                <path d="M11 18.5h2" />
              </CapabilityIcon>
            </div>
            <h3>Mobile apps</h3>
            <p>
              Cross-platform apps with Expo and React Native, taken all the way
              through store submission, subscriptions, and post-launch
              operations.
            </p>
          </div>

          <div className="capability reveal">
            <div className="capability-icon">
              <CapabilityIcon>
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.2 6.2l2.8 2.8M15 15l2.8 2.8M17.8 6.2 15 9M9 15l-2.8 2.8" />
              </CapabilityIcon>
            </div>
            <h3>AI integration</h3>
            <p>
              Image, video, and language model features built into real
              products — generation pipelines, credit systems, and moderation
              included.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-card reveal">
          <div>
            <h2>Have a product to build?</h2>
            <p>
              Tell us what you are trying to ship. We reply to every serious
              inquiry within two business days.
            </p>
            <span className="contact-email">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </span>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
            Start a conversation
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <span>© 2026 Digital Native. All rights reserved.</span>
        <nav>
          <a href="https://imagineapp.click" rel="noopener noreferrer" target="_blank">
            Imagine
          </a>
          <a href="https://jobclaw.fyi" rel="noopener noreferrer" target="_blank">
            JobClaw
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Script id="js-flag" strategy="beforeInteractive">
        {`document.documentElement.classList.add('js')`}
      </Script>
      <Header />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <ProductsSection />
        <CapabilitiesSection />
        <ContactSection />
      </main>
      <Footer />
      <Script id="reveal-init" strategy="afterInteractive">
        {`
          (function () {
            var nodes = document.querySelectorAll('.reveal');
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
              nodes.forEach(function (n) { n.classList.add('is-revealed'); });
              return;
            }
            var observer = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add('is-revealed');
                  observer.unobserve(entry.target);
                }
              });
            }, { threshold: 0.15 });
            nodes.forEach(function (n) { observer.observe(n); });
          })();
        `}
      </Script>
    </>
  );
}
