import React from "react";
import LocaleToggle from "./locale-toggle";
import ScrollReveal from "./motion";

const CONTACT_EMAIL = "contact@digitalnative.vip";

/**
 * Both languages ship in the markup and CSS hides the inactive one off the
 * `data-locale` attribute the boot script sets in layout.js. No state, no
 * re-render, no frame of the wrong language.
 *
 * <T en="..." ko="..." /> for a run of text inside an element; put data-l
 * on the element itself when a whole block differs.
 */
function T({ en, ko }) {
  return (
    <>
      <span data-l="en">{en}</span>
      <span data-l="ko" lang="ko">
        {ko}
      </span>
    </>
  );
}

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
            <span className="nav-idx">01 /</span>
            <T en="Products" ko="제품" />
          </a>
          <a href="#capabilities" className="nav-link">
            <span className="nav-idx">02 /</span>
            <T en="Capabilities" ko="역량" />
          </a>
          <a href="#subscription" className="nav-link">
            <span className="nav-idx">03 /</span>
            <T en="Subscription" ko="구독" />
          </a>
          <a href="#stack" className="nav-link">
            <span className="nav-idx">04 /</span>
            <T en="Stack" ko="스택" />
          </a>
          <a href="#media" className="nav-link">
            <span className="nav-idx">05 /</span>
            <T en="Media" ko="미디어" />
          </a>
          <LocaleToggle />
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
            <T en="Start a project" ko="프로젝트 시작" />{" "}
            <span className="arrow">→</span>
          </a>
        </nav>
      </div>
      <div className="doc-strip" aria-hidden="true">
        <span>
          DOC / DN-LANDING <span className="red">REV 3.0</span>
          <span className="caret" />
        </span>
        <span>
          <T
            en="AI-NATIVE SOFTWARE DEVELOPMENT FIRM"
            ko="AI 네이티브 소프트웨어 개발 기업"
          />
        </span>
        <span>© 2026</span>
      </div>
    </header>
  );
}

const STATUS_LABELS = {
  Live: { en: "Live", ko: "운영 중" },
  Beta: { en: "Beta", ko: "베타" },
  Archived: { en: "Archived", ko: "아카이브" },
};

/** Archived work stays in the ledger below, but it is not in production. */
const isShipping = (product) => product.status !== "Archived";

function Odometer({ value }) {
  const digits = String(value).padStart(2, "0").split("");

  return (
    <div className="reel-row" aria-label={String(value)}>
      {digits.map((digit, i) => (
        <span className="reel" key={i}>
          {/* Rests on its final digit, so the count is right even if the
              roll never plays. motion.js snaps it back to 0 first. */}
          <span
            className="reel-strip"
            data-reel={digit}
            style={{ transform: `translateY(-${Number(digit) * 10}%)` }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <i key={n}>{n}</i>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero" data-hero>
      {/* Drifting press ink, screened to a halftone dot by CSS so the ground
          reads as something printed rather than as a gradient. */}
      <canvas className="hero-field" data-field aria-hidden="true" />

      <div className="hero-inner">
        <p className="hero-kicker mono-label hero-step" style={{ "--step": 0 }}>
          <span className="mark">///</span>{" "}
          <T
            en="Consumer AI products, built and operated in-house"
            ko="자체 개발하고 직접 운영하는 컨슈머 AI 제품"
          />
        </p>

        <div className="hero-out">
          <Odometer value={PRODUCTS.filter(isShipping).length} />

          <div>
            <h1>
              <T en="Products in production." ko="운영 중인 제품." />
            </h1>

            <ul className="manifest">
              {PRODUCTS.filter(isShipping).map((product, i) => {
                const status = STATUS_LABELS[product.status];

                return (
                  <li key={product.name} style={{ "--i": i }}>
                    <img
                      alt=""
                      className="manifest-logo"
                      height="56"
                      src={product.logo}
                      width="56"
                    />
                    <span className="manifest-name">{product.name}</span>
                    <span className="manifest-blurb">
                      <T en={product.short.en} ko={product.short.ko} />
                    </span>
                    <span
                      className={
                        product.status === "Live"
                          ? "manifest-st"
                          : "manifest-st beta"
                      }
                    >
                      <T en={status.en} ko={status.ko} />
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="hero-actions hero-step" style={{ "--step": 6 }}>
              <a href="#products" className="btn btn-ink">
                <T en="See the products" ko="제품 보기" />{" "}
                <span className="arrow">&gt;&gt;&gt;</span>
              </a>
              <a href="#contact" className="btn btn-paper">
                <T en="Work with me" ko="함께 일하기" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    name: "Iter",
    short: {
      en: "Onchain orderbook exchange",
      ko: "온체인 오더북 거래소",
    },
    logo: "/logos/iter.png",
    meta: {
      en: "Web / Onchain exchange / Next.js · Ponder · Postgres · Redis · Rust",
      ko: "웹 / 온체인 거래소 / Next.js · Ponder · Postgres · Redis · Rust",
    },
    desc: {
      en:
        "One open onchain order book — every fill at a price you chose, self-custody the whole way. Chain events run through a Ponder indexer and a queue-backed broker into Postgres, then fan out over a uWebSockets gateway to a realtime portal.",
      ko:
        "하나의 열린 온체인 오더북 — 모든 체결이 직접 정한 가격에서 이뤄지고, 자산은 끝까지 본인 지갑에 있습니다. 체인 이벤트는 Ponder 인덱서와 큐 기반 브로커를 거쳐 Postgres에 쌓이고, uWebSockets 게이트웨이를 통해 실시간 포털로 전달됩니다.",
    },
    links: [{ href: "https://iter.cx", label: "iter.cx →" }],
    status: "Live",
  },
  {
    name: "Standard",
    short: { en: "Onchain orderbook DEX", ko: "온체인 오더북 DEX" },
    logo: "/logos/standard.png",
    meta: {
      en: "Web / Onchain orderbook DEX",
      ko: "웹 / 온체인 오더북 DEX",
    },
    desc: {
      en:
        "A fully onchain central-limit orderbook exchange — live charts, depth, and market/limit/pro order entry, settled onchain rather than against an AMM curve. The first generation of the exchange, rebuilt as Iter above.",
      ko:
        "완전 온체인 중앙지정가 오더북 거래소 — 실시간 차트와 호가창, 시장가·지정가·프로 주문을 AMM 커브가 아닌 온체인에서 체결합니다. 거래소의 1세대이며, 위의 Iter로 새로 만들었습니다.",
    },
    links: [{ href: "https://standard.im", label: "standard.im →" }],
    status: "Archived",
    video: {
      src: "/media/dex_demo.mp4",
      poster: "/media/dex_demo-poster.jpg",
      caption: {
        en: "FIG. 01 — Standard trade terminal, recorded session",
        ko: "FIG. 01 — Standard 트레이드 터미널, 녹화 세션",
      },
    },
  },
  {
    name: "Imagine",
    short: { en: "AI image & video, on Google Play", ko: "AI 이미지·영상, 구글 플레이" },
    logo: "/logos/imagine.png",
    meta: {
      en: "Mobile / AI image + video / Expo · Supabase · RevenueCat",
      ko: "모바일 / AI 이미지 + 영상 / Expo · Supabase · RevenueCat",
    },
    desc: {
      en:
        "Type a sentence, get a logo, portrait, cinematic still, or short clip — with a gallery, community feed, and creator leaderboard. Distributed on Google Play.",
      ko:
        "문장 하나로 로고, 인물 사진, 시네마틱 스틸, 짧은 영상까지 만듭니다. 갤러리와 커뮤니티 피드, 크리에이터 리더보드를 갖췄고 구글 플레이에 배포되어 있습니다.",
    },
    links: [{ href: "https://imagineapp.click", label: "imagineapp.click →" }],
    status: "Live",
  },
  {
    name: "JobClaw",
    short: { en: "AI developer portfolios", ko: "AI 개발자 포트폴리오" },
    logo: "/logos/jobclaw.png",
    meta: {
      en: "Web / AI developer portfolios",
      ko: "웹 / AI 개발자 포트폴리오",
    },
    desc: {
      en:
        "Connect your GitHub and JobClaw builds a job-winning technical profile from your actual work — projects, contributions, and skills, presented for recruiters.",
      ko:
        "GitHub을 연결하면 실제 작업물에서 채용으로 이어지는 기술 프로필을 만들어 줍니다 — 프로젝트, 기여 내역, 기술 스택을 채용 담당자 눈높이로 정리합니다.",
    },
    links: [{ href: "https://jobclaw.fyi", label: "jobclaw.fyi →" }],
    status: "Live",
  },
  {
    name: "Mochi",
    short: { en: "Private photo album, KR + EN", ko: "비공개 사진첩, 한국어 + 영어" },
    logo: "/logos/mochi.png",
    meta: {
      en: "Mobile + web / Expo · Hono · Firestore",
      ko: "모바일 + 웹 / Expo · Hono · Firestore",
    },
    desc: {
      en:
        "A private photo album for your cat, with an optional public community — automatic backup at original quality, care calendars, and shared family albums. Korean and English.",
      ko:
        "우리 고양이만을 위한 비공개 사진첩, 원하면 공개 커뮤니티까지 — 원본 화질 자동 백업, 돌봄 캘린더, 가족 공유 앨범을 지원합니다. 한국어와 영어를 지원합니다.",
    },
    links: [{ href: "https://mochi.camera", label: "mochi.camera →" }],
    status: "Beta",
  },
  {
    name: "Plateful",
    short: {
      en: "Nutrition labels from a photo",
      ko: "사진으로 만드는 영양 정보",
    },
    logo: "/logos/plateful.png",
    meta: {
      en: "Mobile / AI nutrition tracking / Expo · FastAPI · Railway · Stripe",
      ko: "모바일 / AI 영양 분석 / Expo · FastAPI · Railway · Stripe",
    },
    desc: {
      en:
        "Photograph a meal and a vision model separates the plate into items, estimates each portion, and returns calories and macros for each one. Everything logs against a daily target computed from your height, weight and goal, and a coach model reads a stretch of the log and writes it up.",
      ko:
        "식사를 찍으면 비전 모델이 접시를 음식별로 나누고, 양을 추정해 각각의 칼로리와 영양소를 돌려줍니다. 키·체중·목표로 계산한 하루 목표치에 자동으로 기록되고, 코치 모델이 일정 기간의 기록을 읽고 정리해 줍니다.",
    },
    links: [{ href: "https://plateful.today", label: "plateful.today →" }],
    status: "Beta",
  },
  {
    name: "Pensa",
    short: { en: "AI academic writing analysis", ko: "AI 학술 글쓰기 분석" },
    logo: "/logos/pensa.png",
    meta: {
      en: "Web / AI writing analysis / Next.js · FastAPI",
      ko: "웹 / AI 글쓰기 분석 / Next.js · FastAPI",
    },
    desc: {
      en:
        "Reads academic writing the way a demanding teacher does: paragraph by paragraph, checking whether the reasoning holds and whether the details are right.",
      ko:
        "까다로운 선생님처럼 학술 글을 읽습니다. 문단 단위로 논리가 성립하는지, 세부 내용이 정확한지 짚어 줍니다.",
    },
    links: [{ href: "https://pensa.lat", label: "pensa.lat →" }],
    status: "Beta",
  },
];

function ProductRow({ product, last }) {
  const rowEnd = last ? " row-end" : "";
  const status = STATUS_LABELS[product.status];
  const tone = { Live: "", Beta: " status-beta", Archived: " status-archived" };

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
        <span className="product-meta">
          <T en={product.meta.en} ko={product.meta.ko} />
        </span>
      </div>
      <div
        className={`product-cell-desc${rowEnd}`}
        data-reveal
        data-reveal-step="1"
      >
        <p className="product-desc">
          <T en={product.desc.en} ko={product.desc.ko} />
        </p>
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
            <figcaption>
              <T
                en={product.video.caption.en}
                ko={product.video.caption.ko}
              />
            </figcaption>
          </figure>
        ) : null}
        {/* A product can exist before its domain does. */}
        {product.links.length ? (
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
        ) : null}
      </div>
      <div
        className={`product-cell-status${rowEnd}`}
        data-reveal
        data-reveal-step="2"
      >
        <span className={`status${tone[product.status] || ""}`}>
          <span className="status-dot" aria-hidden="true" />
          <T en={status.en} ko={status.ko} />
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
          <span className="index">01</span>
          <T en="[ Products, in detail ]" ko="[ 제품 상세 ]" />
        </h2>
        <span className="aside">
          <T en="Live systems — not mockups" ko="실제 서비스 — 목업 아님" />
        </span>
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
    title: { en: "Web applications", ko: "웹 애플리케이션" },
    body: {
      en:
        "SaaS platforms, dashboards, and marketing sites with Next.js — deployed on Vercel with real attention to performance and detail.",
      ko:
        "Next.js로 만드는 SaaS 플랫폼, 대시보드, 마케팅 사이트 — Vercel에 배포하며 성능과 디테일을 끝까지 챙깁니다.",
    },
  },
  {
    index: "UNIT / M-02",
    title: { en: "Mobile apps", ko: "모바일 앱" },
    body: {
      en:
        "Cross-platform apps with Expo and React Native, taken all the way through store submission, subscriptions, and post-launch operations.",
      ko:
        "Expo와 React Native로 만드는 크로스 플랫폼 앱 — 스토어 심사, 구독 결제, 출시 이후 운영까지 맡습니다.",
    },
  },
  {
    index: "UNIT / S-03",
    title: { en: "Scale", ko: "확장성" },
    body: {
      en:
        "Backends built to hold ten thousand people online at once — queues, event streams, indexers, and websocket gateways, load-tested before they ever meet a crowd.",
      ko:
        "동시 접속 1만 명을 견디는 백엔드 — 큐, 이벤트 스트림, 인덱서, 웹소켓 게이트웨이를 부하 테스트까지 거쳐 만듭니다.",
    },
  },
  {
    index: "UNIT / A-04",
    title: { en: "AI integration", ko: "AI 통합" },
    body: {
      en:
        "Image, video, and language model features built into real products — generation pipelines, credit systems, and moderation included.",
      ko:
        "이미지·영상·언어 모델을 실제 제품에 붙입니다 — 생성 파이프라인, 크레딧 시스템, 모더레이션까지 포함합니다.",
    },
  },
];

function CapabilitiesSection() {
  return (
    <section id="capabilities">
      <div className="section-head">
        <h2>
          <span className="index">02</span>
          <T en="[ Capabilities ]" ko="[ 역량 ]" />
        </h2>
        <span className="aside">
          <T en="Full lifecycle" ko="전 주기 대응" />
        </span>
      </div>

      <div className="capability-grid">
        {CAPABILITIES.map((capability, i) => (
          <div className="capability" key={capability.index}>
            {/* The reveal sits inside the card: the grid paints the 1px
                rules with an ink ground, so fading the card itself would
                expose a black block until it lands. */}
            <div className="capability-body" data-reveal data-reveal-step={i}>
              <span className="capability-index">{capability.index}</span>
              <h3>
                <T en={capability.title.en} ko={capability.title.ko} />
              </h3>
              <p>
                <T en={capability.body.en} ko={capability.body.ko} />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Said out loud, because getting this wrong wastes everyone's time. */}
      <div className="boundary" data-reveal data-reveal-step="0">
        <span className="boundary-label mono-label">
          <span className="red">///</span>{" "}
          <T en="On design" ko="디자인에 대하여" />
        </span>
        <p>
          <T
            en="This is not a design studio, and I will not pretend otherwise. Bring a design and a brand and I build the live product against it — and keep it standing when ten thousand people are on it at once. Don't have one yet? I can generate a starting point with AI and build from there. Either way the taste stays yours."
            ko="디자인 스튜디오가 아닙니다. 그런 척하지도 않겠습니다. 디자인과 브랜드를 주시면 그에 맞춰 실제 서비스를 만들고, 동시 접속 1만 명이 몰려도 버티게 합니다. 아직 없으시다면 AI로 시안을 만들어 거기서부터 시작할 수 있습니다. 어느 쪽이든 최종 판단은 고객의 몫입니다."
          />
        </p>
      </div>
    </section>
  );
}

/**
 * Stack specimen. Every entry is something that ships in a product above —
 * add to a group's `items` and it renders; no other change is needed.
 */
const STACK = [
  {
    index: "LANG / L-01",
    title: { en: "Languages", ko: "언어" },
    items: [
      "TypeScript",
      "JavaScript",
      "Rust",
      "Python",
      "Java",
      "Kotlin",
      "C++",
    ],
  },
  {
    index: "WEB / W-02",
    title: { en: "Web", ko: "웹" },
    items: ["Next.js", "React", "Tailwind CSS", "Three.js"],
  },
  {
    index: "MOBILE / M-03",
    title: { en: "Mobile", ko: "모바일" },
    items: ["React Native", "Expo", "RevenueCat"],
  },
  {
    index: "SERVER / S-04",
    title: { en: "Server", ko: "서버" },
    items: ["Node.js", "NestJS", "Hono", "FastAPI", "Axum", "Rayon"],
  },
  {
    index: "DATA / D-05",
    title: { en: "Data", ko: "데이터" },
    items: ["PostgreSQL", "Neon", "Drizzle", "Supabase", "Firestore"],
  },
  {
    index: "EVENTS / E-06",
    title: { en: "Events & messaging", ko: "이벤트 · 메시징" },
    items: ["Kafka", "RabbitMQ", "Redis Streams"],
  },
  {
    index: "CLOUD / C-07",
    title: { en: "Cloud & infra", ko: "클라우드 · 인프라" },
    items: ["AWS S3", "Vercel", "Railway", "Docker", "Grafana", "k6"],
  },
  {
    index: "AI / A-08",
    title: { en: "AI", ko: "AI" },
    items: [
      "OpenAI",
      "Claude Code",
      "Keras",
      "Image + video models",
      "Firebase Auth",
    ],
  },
  {
    index: "ONCHAIN / O-09",
    title: { en: "Onchain", ko: "온체인" },
    items: [
      "Solidity",
      "Foundry",
      "viem",
      "wagmi",
      "Ponder",
      "Polkadot",
      "Parity Substrate",
    ],
  },
];

const SUBSCRIPTION_CALL = "https://calendly.com/contact-digitalnative/30min";

/** What the retainer is measured against. Qualitative on purpose — no
 *  invented salary or agency figures. */
const REPLACES = [
  {
    what: { en: "A senior hire", ko: "정규직 채용" },
    why: {
      en: "A recruiting cycle, equity, a notice period — and it is hard to unwind when the need changes.",
      ko: "채용 절차, 지분, 퇴사 통보 기간. 필요가 바뀌면 되돌리기 어렵습니다.",
    },
  },
  {
    what: { en: "An agency retainer", ko: "에이전시 리테이너" },
    why: {
      en: "Layers of account management, a scoped statement of work, and a change order for everything after it.",
      ko: "여러 단계의 담당자, 범위 계약서, 그 뒤로는 변경마다 따라오는 추가 합의.",
    },
  },
  {
    what: { en: "Freelancers", ko: "프리랜서" },
    why: {
      en: "Availability and quality that move around — and the integration work still lands on you.",
      ko: "가용성과 품질이 매번 달라지고, 통합 작업은 결국 직접 해야 합니다.",
    },
  },
];

const PLAN_INCLUDES = [
  { en: "One request at a time", ko: "한 번에 하나의 요청" },
  { en: "Web, mobile, and AI integration", ko: "웹, 모바일, AI 통합" },
  {
    en: "You bring the design; we build and run it",
    ko: "디자인은 주시면, 만들고 운영하는 건 저희가",
  },
  {
    en: "Backends for 10,000+ concurrent users",
    ko: "동시 접속 1만 명 이상 대응 백엔드",
  },
  { en: "Deployment and post-launch operations", ko: "배포와 출시 이후 운영" },
  { en: "A direct line to the person building it", ko: "만드는 사람과 직접 소통" },
  { en: "Pause or cancel anytime", ko: "언제든 일시정지 또는 해지" },
];

const PLAN_PROPS = [
  {
    index: "TERM / P-01",
    title: { en: "Pause anytime", ko: "언제든 일시정지" },
    body: {
      en: "Stop the clock between projects. Unused days stay on the shelf until you come back.",
      ko: "프로젝트 사이에는 시계를 멈춥니다. 남은 기간은 다시 돌아올 때까지 그대로 보관됩니다.",
    },
  },
  {
    index: "TERM / Q-02",
    title: { en: "One queue", ko: "하나의 대기열" },
    body: {
      en: "Requests go to the person who built the products above — no account manager, no handoff, nobody to brief.",
      ko: "요청은 위 제품을 만든 사람에게 바로 갑니다. 계정 담당자도, 인수인계도, 따로 설명할 상대도 없습니다.",
    },
  },
  {
    index: "TERM / A-03",
    title: { en: "Built with AI", ko: "AI로 만듭니다" },
    body: {
      en:
        "Claude Code and model tooling run through the whole build, not just the demo. Fewer people, less time, and a rate an agency cannot reach.",
      ko:
        "데모용이 아니라 개발 전 과정에 Claude Code와 모델 도구를 씁니다. 더 적은 인원, 더 짧은 시간, 에이전시가 맞출 수 없는 요금.",
    },
  },
  {
    index: "TERM / R-04",
    title: { en: "Fixed rate", ko: "고정 요금" },
    body: {
      en: "One number, monthly. Scope can move without the paperwork that usually follows it.",
      ko: "월 정액 하나. 범위가 바뀌어도 따라붙는 서류 작업은 없습니다.",
    },
  },
];

function SubscriptionSection() {
  return (
    <section id="subscription">
      <div className="section-head">
        <h2>
          <span className="index">03</span>
          <T en="[ Subscription ]" ko="[ 구독 ]" />
        </h2>
        <span className="aside">
          <T en="One person, one queue" ko="한 사람, 하나의 대기열" />
        </span>
      </div>

      <div className="sub-grid">
        <div className="sub-left" data-reveal data-reveal-step="0">
          <h3 className="sub-title">
            <T
              en="One engineer, by the month."
              ko="월 단위로 쓰는 개발자 한 명."
            />
          </h3>
          <p className="sub-lede">
            <T
              en="The same person who built and operates the five products above, on a flat monthly rate. I build with AI through the whole job — that is where the speed comes from, and why the rate sits well under an agency retainer. One request at a time, worked to completion, then the next. No statement of work, no change orders, no hourly billing."
              ko="위의 다섯 제품을 직접 만들고 운영하는 사람을 월 정액으로 씁니다. 개발 전 과정에 AI를 씁니다. 속도가 거기서 나오고, 그래서 요금도 에이전시 리테이너보다 한참 아래입니다. 한 번에 하나씩 끝까지 마무리하고 다음으로 넘어갑니다. 범위 계약서도, 변경 요청서도, 시간당 청구도 없습니다."
            />
          </p>

          <div className="prop-grid">
            {PLAN_PROPS.map((prop) => (
              <div className="prop" key={prop.index}>
                <span className="prop-index">{prop.index}</span>
                <h4>
                  <T en={prop.title.en} ko={prop.title.ko} />
                </h4>
                <p>
                  <T en={prop.body.en} ko={prop.body.ko} />
                </p>
              </div>
            ))}
          </div>

          <div className="replaces">
            <span className="replaces-head mono-label">
              <T en="What it stands in for" ko="무엇을 대신하는가" />
            </span>
            <dl>
              {REPLACES.map((row) => (
                <React.Fragment key={row.what.en}>
                  <dt>
                    <T en={row.what.en} ko={row.what.ko} />
                  </dt>
                  <dd>
                    <T en={row.why.en} ko={row.why.ko} />
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </div>

        <div className="sub-right" data-reveal data-reveal-step="1">
          <div className="plan">
            <span className="plan-index">PLAN / DN-SUB-01</span>

            <p className="plan-price">
              <span className="plan-figure">$5,000</span>
              <span className="plan-unit">
                <T en="/ month" ko="/ 월" />
              </span>
            </p>
            <p className="plan-billing">
              <T en="USD, billed monthly" ko="USD, 월 청구" />
            </p>

            <ul className="plan-list">
              {PLAN_INCLUDES.map((item) => (
                <li key={item.en}>
                  <T en={item.en} ko={item.ko} />
                </li>
              ))}
            </ul>

            <a
              className="plan-cta"
              href={SUBSCRIPTION_CALL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <T en="Book a 30-minute call" ko="30분 미팅 예약" />{" "}
              <span className="arrow">→</span>
            </a>

            <p className="plan-note">
              <T
                en="Fit, cadence, and the first request get settled on the call."
                ko="적합 여부와 진행 속도, 첫 요청은 통화에서 정합니다."
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack">
      <div className="section-head">
        <h2>
          <span className="index">04</span>
          <T en="[ Stack ]" ko="[ 기술 스택 ]" />
        </h2>
        <span className="aside">
          <T
            en="Shipping in the products above"
            ko="위 제품들에 실제로 쓰인 것들"
          />
        </span>
      </div>

      <div className="stack-grid">
        {STACK.map((group, i) => (
          <div className="stack-group" key={group.index}>
            {/* Same reason as the capability cards: the grid paints its
                rules with an ink ground, so the reveal sits inside. */}
            <div className="stack-body" data-reveal data-reveal-step={i}>
              <span className="stack-index">{group.index}</span>
              <h3>
                <T en={group.title.en} ko={group.title.ko} />
              </h3>
              <ul className="stack-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
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
 *     outlet: { en: "Some Podcast", ko: "어떤 팟캐스트" },
 *     title: { en: "Building consumer AI solo", ko: "혼자서 컨슈머 AI 만들기" },
 *     format: { en: "Podcast", ko: "팟캐스트" },
 *     date: "2026-09",            // YYYY-MM
 *     href: "https://youtube.com/watch?v=...",
 *     note: { en: "...", ko: "..." },   // optional
 *   }
 */
const MEDIA = [];

const MONTHS_EN = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function printDate(date, locale) {
  if (!date) return "—";
  const [year, month] = date.split("-");
  if (!month) return year;
  if (locale === "ko") return `${year}년 ${Number(month)}월`;
  const label = MONTHS_EN[Number(month) - 1];
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
        <span className="media-format">
          <T en={item.format.en} ko={item.format.ko} />
        </span>
        <h3 className="media-outlet">
          <T en={item.outlet.en} ko={item.outlet.ko} />
        </h3>
        <span className="media-date">
          <T
            en={printDate(item.date, "en")}
            ko={printDate(item.date, "ko")}
          />
        </span>
      </div>
      <div
        className={`media-cell-title${rowEnd}`}
        data-reveal
        data-reveal-step="1"
      >
        <p className="media-title">
          <T en={item.title.en} ko={item.title.ko} />
        </p>
        {item.note ? (
          <p className="media-note">
            <T en={item.note.en} ko={item.note.ko} />
          </p>
        ) : null}
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
  const count = MEDIA.length;

  return (
    <section id="media">
      <div className="section-head">
        <h2>
          <span className="index">05</span>
          <T en="[ Media & appearances ]" ko="[ 미디어 & 출연 ]" />
        </h2>
        <span className="aside">
          {count ? (
            <T
              en={`${count} entr${count === 1 ? "y" : "ies"} on file`}
              ko={`등록 ${count}건`}
            />
          ) : (
            <T
              en="Press, podcasts, interviews"
              ko="언론, 팟캐스트, 인터뷰"
            />
          )}
        </span>
      </div>

      {count ? (
        <div className="media-table">
          {MEDIA.map((item, i) => (
            <MediaRow item={item} key={item.href} last={i === count - 1} />
          ))}
        </div>
      ) : (
        <div className="media-empty" data-reveal data-reveal-step="0">
          <span className="mono-label media-empty-file">
            FILE / DN-MEDIA{" "}
            <span className="red">
              <T en="— 0 ENTRIES" ko="— 등록 0건" />
            </span>
          </span>
          <p>
            <T
              en="Interviews, podcasts, and press are logged here as they publish."
              ko="인터뷰, 팟캐스트, 언론 보도는 공개되는 대로 이곳에 기록합니다."
            />
          </p>
          <a className="product-link" href={`mailto:${CONTACT_EMAIL}`}>
            <T en="Press enquiries" ko="취재 문의" />{" "}
            <span className="arrow">→</span>
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
        <h2 data-l="en">Have a product to build?</h2>
        <h2 data-l="ko" lang="ko">
          만들고 싶은 제품이 있나요?
        </h2>
        <p>
          <T
            en="Tell me what you are trying to ship. I reply to every serious inquiry within two business days."
            ko="무엇을 출시하려는지 알려 주세요. 진지한 문의에는 영업일 기준 2일 안에 답장합니다."
          />
        </p>
      </div>
      <div className="contact-right" data-reveal data-reveal-step="1">
        <div className="contact-email mono-label">
          <T en="Direct line" ko="직통" />
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
            <T en="Start a conversation" ko="대화 시작하기" />{" "}
            <span className="arrow">→</span>
          </a>
          <a
            className="btn btn-paper"
            href={SUBSCRIPTION_CALL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <T en="Book a call" ko="미팅 예약" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © 2026 Digital Native® —{" "}
        <T en="All rights reserved" ko="모든 권리 보유" />
      </span>
      <nav>
        {PRODUCTS.filter((product) => product.links.length).map((product) => (
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
        <a href={`mailto:${CONTACT_EMAIL}`}>
          <T en="Contact" ko="문의" />
        </a>
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
        <SubscriptionSection />
        <StackSection />
        <MediaSection />
        <ContactSection />
        <div className="hazard" aria-hidden="true" />
      </main>
      <Footer />
    </div>
  );
}
