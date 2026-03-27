import Script from "next/script";

function BrandLogo({ size = "w-8 h-8", showGlow = true }) {
  return (
    <div className={`relative ${size} flex items-center justify-center`}>
      {showGlow ? (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-md opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
      ) : null}
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10" fill="none">
        <path d="M25 25 L55 50 L25 75 L15 65 L35 50 L15 35 Z" fill="#00e5ff" />
        <path
          d="M45 25 C 85 25 85 75 45 75 L35 65 C 65 65 65 35 35 35 Z"
          fill="url(#logoGrad)"
        />
        <defs>
          <linearGradient id="logoGrad" x1="45" y1="25" x2="45" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <BrandLogo />
          <span className="text-white font-semibold text-xl tracking-tight">Digital Native</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-lg font-medium text-neutral-400">
          <a href="#work" className="hover:text-white transition-colors">
            Work
          </a>
          <a href="#expertise" className="hover:text-white transition-colors">
            Expertise
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            Company
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-lg font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full transition-all"
          >
            Start a project
          </a>
          <button type="button" className="md:hidden text-neutral-400 hover:text-white">
            <i data-lucide="menu" strokeWidth="1.5" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-base text-neutral-300 font-medium mb-8 relative z-10">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        Registered Software Development Firm
      </div>

      <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-8 max-w-5xl leading-[1.1] relative z-10">
        Engineering the <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          digital frontier.
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mb-12 relative z-10 leading-relaxed">
        We design, build, and scale high-performance web and mobile applications for modern
        enterprises and fast-growing startups.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
        <a
          href="#work"
          className="flex items-center gap-2 text-lg font-medium text-[#0a0a0a] bg-white hover:bg-neutral-200 px-8 py-4 rounded-full transition-all"
        >
          Explore our work
          <i data-lucide="arrow-right" strokeWidth="1.5" className="w-5 h-5" />
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 text-lg font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full transition-all"
        >
          View capabilities
        </a>
      </div>
    </section>
  );
}

function SelectedWorkSection() {
  return (
    <section id="work" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Selected Work
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl">
            A showcase of scalable web platforms and native mobile experiences we&apos;ve delivered.
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View all projects
          <i data-lucide="arrow-up-right" strokeWidth="1.5" className="w-5 h-5" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="group relative flex flex-col bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-neutral-900/60 transition-colors duration-500">
          <div className="h-[400px] w-full relative bg-[#0c0c0c] flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
            <div className="w-full h-full border border-white/10 rounded-xl flex flex-col bg-[#111] shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
              <div className="h-14 border-b border-white/10 flex items-center px-6 gap-6">
                <div className="w-32 h-4 rounded-md bg-white/10" />
                <div className="hidden md:flex gap-4 ml-auto">
                  <div className="w-16 h-4 rounded-md bg-white/5" />
                  <div className="w-16 h-4 rounded-md bg-white/5" />
                </div>
              </div>
              <div className="flex-1 flex p-6 gap-6">
                <div className="w-48 h-full rounded-lg bg-white/5 hidden md:block" />
                <div className="flex-1 h-full flex flex-col gap-6">
                  <div className="h-40 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#111] to-transparent" />
                    <svg
                      className="absolute bottom-4 left-0 w-full h-24 stroke-cyan-500/30"
                      fill="none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <path d="M0,50 Q25,20 50,50 T100,50" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex gap-6 h-full">
                    <div className="flex-1 rounded-lg bg-white/5" />
                    <div className="flex-1 rounded-lg bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 relative z-20 bg-[#0a0a0a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-base font-medium border border-cyan-500/20">
                Web App
              </span>
              <span className="text-neutral-500 text-base font-medium">FinTech</span>
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-white mb-3">Nexus Analytics</h3>
            <p className="text-lg text-neutral-400 mb-6 line-clamp-2">
              A high-frequency trading dashboard processing millions of data points in real-time,
              built for institutional investors.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-base text-neutral-400 bg-white/5 px-3 py-1 rounded-md">
                React
              </span>
              <span className="text-base text-neutral-400 bg-white/5 px-3 py-1 rounded-md">
                TypeScript
              </span>
              <span className="text-base text-neutral-400 bg-white/5 px-3 py-1 rounded-md">Go</span>
            </div>
          </div>
        </div>

        <div className="group relative flex flex-col bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-neutral-900/60 transition-colors duration-500">
          <div className="h-[400px] w-full relative bg-[#0c0c0c] flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
            <div className="w-[280px] h-[560px] border-[6px] border-neutral-800 rounded-[2.5rem] bg-[#111] shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500 ease-out flex flex-col overflow-hidden relative mt-32">
              <div className="absolute top-0 w-full h-6 flex justify-center mt-2">
                <div className="w-24 h-6 bg-neutral-800 rounded-full" />
              </div>
              <div className="mt-16 px-6 flex flex-col gap-4">
                <div className="w-32 h-8 rounded-md bg-white/10 mb-4" />
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5" />
                <div className="flex gap-4">
                  <div className="flex-1 h-24 rounded-xl bg-white/5" />
                  <div className="flex-1 h-24 rounded-xl bg-white/5" />
                </div>
                <div className="w-full h-16 rounded-xl bg-white/5 mt-auto" />
              </div>
            </div>
          </div>
          <div className="p-8 relative z-20 bg-[#0a0a0a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-base font-medium border border-blue-500/20">
                Mobile App
              </span>
              <span className="text-neutral-500 text-base font-medium">Healthcare</span>
            </div>
            <h3 className="text-3xl font-semibold tracking-tight text-white mb-3">Aura Health</h3>
            <p className="text-lg text-neutral-400 mb-6 line-clamp-2">
              Cross-platform mobile application for personalized health tracking, integrating with
              native device health kits.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-base text-neutral-400 bg-white/5 px-3 py-1 rounded-md">
                React Native
              </span>
              <span className="text-base text-neutral-400 bg-white/5 px-3 py-1 rounded-md">
                Node.js
              </span>
              <span className="text-base text-neutral-400 bg-white/5 px-3 py-1 rounded-md">
                GraphQL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <section id="expertise" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          Core Capabilities
        </h2>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
          As a full-service technical partner, we handle the entire software development lifecycle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6">
            <i data-lucide="layout-template" strokeWidth="1.5" className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Web Applications</h3>
          <p className="text-lg text-neutral-400">
            Complex single-page applications, enterprise portals, and scalable SaaS platforms built
            with modern JavaScript frameworks.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6">
            <i data-lucide="smartphone" strokeWidth="1.5" className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Mobile Development</h3>
          <p className="text-lg text-neutral-400">
            Native and cross-platform mobile applications delivering seamless user experiences across
            iOS and Android ecosystems.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-6">
            <i data-lucide="cloud" strokeWidth="1.5" className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Cloud Architecture</h3>
          <p className="text-lg text-neutral-400">
            Resilient backend systems, serverless architectures, and API development designed for
            high availability and scale.
          </p>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900/50 border border-white/10 p-12 md:p-20 text-center flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 relative z-10">
          Ready to build the next big thing?
        </h2>
        <p className="text-xl text-neutral-400 max-w-2xl mb-10 relative z-10">
          Partner with our engineering team to turn your vision into a robust digital product.
        </p>
        <a
          href="#contact"
          className="flex items-center gap-2 text-lg font-medium text-[#0a0a0a] bg-white hover:bg-neutral-200 px-8 py-4 rounded-full transition-all relative z-10"
        >
          Get in touch today
          <i data-lucide="arrow-right" strokeWidth="1.5" className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="flex items-center gap-3">
            <BrandLogo size="w-6 h-6" showGlow={false} />
            <span className="text-white font-semibold text-lg tracking-tight">Digital Native</span>
          </div>

          <nav className="flex flex-wrap gap-8 text-lg text-neutral-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Company
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Careers
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5 text-base text-neutral-500">
          <p>© 2024 Digital Native Software Development Firm. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24">
        <HeroSection />
        <SelectedWorkSection />
        <ExpertiseSection />
        <CtaSection />
      </main>
      <Footer />
      <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />
      <Script id="lucide-init" strategy="afterInteractive">
        {`window.lucide?.createIcons();`}
      </Script>
    </>
  );
}
