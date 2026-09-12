"use client";

import { Children, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SPACES } from "./spaces";
import { buildTourPath, resolveTourFrame, tourRoomOffset } from "./tour-path.mjs";

function T({ en, ko }) {
  return <><span data-l="en">{en}</span><span data-l="ko" lang="ko">{ko}</span></>;
}

export default function GardenScene({ children }) {
  const host = useRef(null);
  const journey = useRef(null);
  const world = useRef(null);
  const tourActiveRef = useRef(false);
  const tourPath = useRef(null);
  const currentSpace = useRef(-1);
  const [ready, setReady] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [golden, setGolden] = useState(false);
  const [mounts, setMounts] = useState([]);
  const [activeSpace, setActiveSpace] = useState(-1);
  const [cameraMotion, setCameraMotion] = useState(true);
  const [scrollTour, setScrollTour] = useState(false);
  const [reducedPreference, setReducedPreference] = useState(false);
  const panels = Children.toArray(children);
  const tourActive = ready && scrollTour && cameraMotion && !reducedPreference;

  function travelToSpace(index, updateHash = true) {
    if (tourActiveRef.current && tourPath.current) {
      const top = journey.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + tourRoomOffset(tourPath.current, index), behavior: updateHash ? "smooth" : "instant" });
    } else {
      if (world.current) window.scrollTo({ top: 0, behavior: "instant" });
      world.current?.goTo(index < 0 ? 0 : index + 1.08);
      currentSpace.current = index;
      setActiveSpace(index); setChapter(index < 0 ? 0 : 3);
    }
    const hash = index < 0 ? "#garden" : `#${SPACES[index].id}`;
    if (updateHash && location.hash !== hash) history.pushState(null, "", hash);
  }

  useEffect(() => {
    let cancelled = false;
    let dispose;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = true;
    try {
      enabled = localStorage.getItem("dn-camera-motion") !== "off";
      setScrollTour(enabled && localStorage.getItem("dn-scroll-tour") === "on");
    } catch {}
    setCameraMotion(enabled); setReducedPreference(preference.matches);
    const onPreference = () => setReducedPreference(preference.matches);
    preference.addEventListener("change", onPreference);
    import("./garden-world").then(({ createGarden }) => {
      if (cancelled || !host.current) return;
      const garden = createGarden(host.current, () => { world.current = null; setReady(false); setMounts([]); }, () => {
        if (!cancelled) setReady(true);
      }, (id) => travelToSpace(SPACES.findIndex((space) => space.id === id)));
      if (!garden) return;
      world.current = garden;
      dispose = garden.dispose;
      setMounts(garden.mounts);
      garden.setMotionEnabled(enabled);
      const initial = SPACES.findIndex((space) => space.id === location.hash.slice(1));
      travelToSpace(initial, false);
    }).catch(() => {});
    function navigate(event) {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || !world.current) return;
      const id = link.getAttribute("href").slice(1);
      const index = SPACES.findIndex((space) => space.id === id);
      if (index === -1 && id && id !== "garden") return;
      event.preventDefault(); travelToSpace(index);
    }
    function onHash() {
      const id = location.hash.slice(1);
      const index = SPACES.findIndex((space) => space.id === id);
      if (index !== -1 || !id || id === "garden") travelToSpace(index, false);
    }
    document.addEventListener("click", navigate);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelled = true;
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("click", navigate); window.removeEventListener("hashchange", onHash);
      dispose?.(); world.current = null;
    };
  }, []);

  useEffect(() => {
    tourActiveRef.current = tourActive;
    if (!tourActive) { world.current?.stopTour(); tourPath.current = null; return; }
    let raf = 0, measureRaf = 0, cancelled = false;
    const documentTop = () => journey.current.getBoundingClientRect().top + window.scrollY;
    function syncScroll() {
      raf = 0;
      if (cancelled || !tourActiveRef.current || !tourPath.current) return;
      const frame = resolveTourFrame(tourPath.current, window.scrollY - documentTop());
      world.current?.setTourFrame(frame);
      journey.current.style.setProperty("--tour-progress", frame.totalProgress);
      currentSpace.current = frame.room;
      setActiveSpace(frame.room); setChapter(frame.chapter);
    }
    function queueScroll() { if (!raf) raf = requestAnimationFrame(syncScroll); }
    function measurePath() {
      measureRaf = 0;
      if (cancelled || !world.current || !tourActiveRef.current) return;
      const previous = tourPath.current ? resolveTourFrame(tourPath.current, window.scrollY - documentTop()) : null;
      const next = buildTourPath(host.current.clientHeight, world.current.getTourMetrics());
      tourPath.current = next;
      journey.current.style.setProperty("--tour-height", `${next.distance + host.current.clientHeight}px`);
      // Resizing or switching languages keeps the same section and reading position.
      const offset = previous ? next.segments[previous.segmentIndex].start + previous.progress * (next.segments[previous.segmentIndex].end - next.segments[previous.segmentIndex].start) : tourRoomOffset(next, currentSpace.current);
      window.scrollTo({ top: documentTop() + offset, behavior: "instant" });
      syncScroll();
    }
    function queueMeasure() { if (!measureRaf) measureRaf = requestAnimationFrame(measurePath); }
    function keepFocusVisible(event) {
      const surface = event.target.closest?.(".room-surface");
      if (!surface || event.target === surface || !tourPath.current) return;
      const room = SPACES.findIndex((space) => space.id === surface.parentElement.dataset.space);
      const segment = tourPath.current.segments.find((item) => item.type === "read" && item.room === room);
      if (!segment) return;
      const bounds = surface.getBoundingClientRect(), target = event.target.getBoundingClientRect();
      const expected = resolveTourFrame(tourPath.current, window.scrollY - documentTop()).scrollTop;
      if (target.top >= bounds.top && target.bottom <= bounds.bottom && Math.abs(expected - surface.scrollTop) < 2) return;
      const offset = Math.max(0, Math.min(segment.overflow, surface.scrollTop + (target.top - bounds.top) / segment.scale - surface.clientHeight * 0.25));
      window.scrollTo({ top: documentTop() + segment.start + segment.lead + offset * segment.scale, behavior: "instant" });
      queueScroll();
    }
    // The page scrollbar owns the complete trip, including stationary reading.
    window.addEventListener("scroll", queueScroll, { passive: true });
    window.addEventListener("resize", queueMeasure);
    const element = host.current;
    element.addEventListener("focusin", keepFocusVisible);
    element.addEventListener("loadedmetadata", queueMeasure, true);
    const locale = new MutationObserver(queueMeasure);
    locale.observe(document.documentElement, { attributes: true, attributeFilter: ["data-locale"] });
    const dimensions = new ResizeObserver(queueMeasure); dimensions.observe(element);
    document.fonts?.ready.then(() => { if (!cancelled) queueMeasure(); });
    measurePath();
    return () => {
      cancelled = true; tourActiveRef.current = false; cancelAnimationFrame(raf); cancelAnimationFrame(measureRaf);
      window.removeEventListener("scroll", queueScroll);
      window.removeEventListener("resize", queueMeasure);
      element.removeEventListener("focusin", keepFocusVisible);
      element.removeEventListener("loadedmetadata", queueMeasure, true);
      locale.disconnect(); dimensions.disconnect();
    };
  }, [tourActive]);

  function travelTo(next) {
    if (tourActive) {
      const top = journey.current.getBoundingClientRect().top + window.scrollY;
      const range = tourPath.current?.segments[0].end || 0;
      window.scrollTo({ top: top + [0, 0.48, 0.92][next] * range, behavior: "smooth" });
      return;
    }
    world.current?.goTo([0, 0.29, 0.55][next]);
    setChapter(next); setActiveSpace(-1);
  }
  function changeMotion() {
    const next = !cameraMotion;
    if (!next) {
      tourActiveRef.current = false;
      world.current?.stopTour(); setScrollTour(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      try { localStorage.setItem("dn-scroll-tour", "off"); } catch {}
    }
    setCameraMotion(next); world.current?.setMotionEnabled(next);
    try { localStorage.setItem("dn-camera-motion", next ? "on" : "off"); } catch {}
  }
  function changeScrollTour() {
    const next = !scrollTour;
    tourActiveRef.current = false;
    world.current?.stopTour();
    window.scrollTo({ top: 0, behavior: "instant" });
    setScrollTour(next);
    if (next) {
      setCameraMotion(true); world.current?.setMotionEnabled(true);
      travelToSpace(-1);
    }
    try {
      localStorage.setItem("dn-scroll-tour", next ? "on" : "off");
      if (next) localStorage.setItem("dn-camera-motion", "on");
    } catch {}
  }
  function changeLight() {
    const next = !golden;
    world.current?.setGolden(next);
    setGolden(next);
  }

  return (
    <div className="experience" ref={journey} data-ready={ready} data-scroll-tour={tourActive} data-chapter={chapter} data-space={activeSpace < 0 ? "garden" : SPACES[activeSpace].id} data-light={golden ? "golden" : "day"}>
      <div className="experience-stage">
        <div className="experience-viewport" ref={host} tabIndex={ready ? 0 : -1} role="group"
          aria-label="Explore the architectural garden / 건축 정원 둘러보기" aria-describedby="experience-instructions">
          <svg className="experience-fallback" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A warm terraced tower among a deep teal forest / 청록빛 숲 속 테라스 정원과 따뜻한 탑">
            <rect width="1440" height="900" fill="#0b333b" />
            <g fill="#205558">{Array.from({ length: 20 }, (_, i) => <ellipse key={i} cx={i * 85 - 50} cy={230 + i % 3 * 190} rx="160" ry="230" />)}</g>
            <g stroke="#344436" strokeWidth="3">
              <path d="M265 820V350h280v470" fill="#d69a54"/><path d="M340 820V180h220v640" fill="#e6b550"/>
              <path d="M340 355h220M340 515h220M265 680h295" stroke="#eed7a1" strokeWidth="15"/>
              <path d="M325 182h250l-25-35H350Z" fill="#b97141"/>
              <path d="M367 147V87h65v60" fill="#e8b85a"/><path d="m355 87 44-64 46 64Z" fill="#247677"/>
              {[240, 405, 565, 725].map((y) => <g key={y}><path d={`M385 ${y + 60}v-53a22 22 0 0 1 44 0v53Z`} fill="#684e38"/><path d={`M480 ${y + 40}v-44a18 18 0 0 1 36 0v44Z`} fill="#42676a"/></g>)}
            </g>
            <g fill="#889445">{Array.from({ length: 26 }, (_, i) => <ellipse key={i} cx={i % 2 ? 550 : 345} cy={190 + i * 23} rx={18 + i % 3 * 4} ry="18" />)}</g>
            <g fill="#58774a"><ellipse cx="100" cy="830" rx="200" ry="230"/><ellipse cx="700" cy="900" rx="240" ry="170"/><ellipse cx="1280" cy="790" rx="240" ry="160"/></g>
          </svg>
        </div>
        <div className="experience-shade" aria-hidden="true" />
        <div className="experience-meta"><span className="living-dot" /><T en={activeSpace < 0 ? "An independent software practice" : SPACES[activeSpace].sign} ko={activeSpace < 0 ? "독립적인 소프트웨어 개발 스튜디오" : SPACES[activeSpace].ko} /></div>

        <div className="experience-copy experience-arrival" inert={chapter !== 0} aria-hidden={chapter !== 0}>
          <p className="experience-eyebrow"><span className="living-dot" /><T en="An independent software practice" ko="독립적인 소프트웨어 개발 스튜디오" /></p>
          <h1 id="hero-title"><span data-l="en">A more<br /><em>human</em> digital.</span><span data-l="ko" lang="ko">디지털에<br /><em>온기를</em> 더하다.</span></h1>
          <p className="experience-description"><T en="Thoughtful software. Living systems. An independent practice turning first ideas into everyday products." ko="깊이 생각한 소프트웨어. 살아 있는 시스템. 첫 아이디어를 일상의 제품으로 만듭니다." /></p>
          <div className="experience-actions">
            <a className="experience-enter" href="#products"><T en="Explore the work" ko="제품 둘러보기" /><span aria-hidden="true">↗</span></a>
            <button type="button" className="experience-next" onClick={() => travelTo(1)} disabled={!ready}><T en="A closer look" ko="가까이 둘러보기" /><span aria-hidden="true">→</span></button>
          </div>
        </div>

        <div className="experience-copy experience-court" inert={chapter !== 1} aria-hidden={chapter !== 1}>
          <p className="experience-eyebrow"><T en="The living studio" ko="살아 있는 스튜디오" /></p>
          <h2><span data-l="en">Clarity.<br />From the <em>ground up.</em></span><span data-l="ko" lang="ko">본질에 집중하고,<br /><em>기초부터 단단하게.</em></span></h2>
          <p className="experience-description"><T en="One engineer, from architecture to launch. Every layer considered. Every detail connected." ko="설계부터 출시까지, 한 명의 개발자가. 모든 구조를 고민하고, 작은 디테일까지 연결합니다." /></p>
          <button className="experience-next" type="button" onClick={() => travelTo(2)}><T en="Continue through the light" ko="빛을 따라 더 안으로" /><span aria-hidden="true">↓</span></button>
        </div>

        <div className="experience-copy experience-oculus" inert={chapter !== 2} aria-hidden={chapter !== 2}>
          <p className="experience-eyebrow"><T en="The rooftop garden" ko="옥상 정원" /></p>
          <h2><span data-l="en">Built to work.<br />Room to <em>grow.</em></span><span data-l="ko" lang="ko">제대로 작동하고,<br />자연스럽게 <em>자라도록.</em></span></h2>
          <a className="experience-enter" href="#products"><T en="Meet the products" ko="만든 제품 만나보기" /><span aria-hidden="true">↗</span></a>
        </div>

        <div className="experience-bottom">
          <p className="experience-hint"><span aria-hidden="true">{tourActive ? "↓" : "↗"}</span><T en={ready ? (tourActive ? (activeSpace < 0 ? "Scroll from the garden through every room" : "Keep scrolling to read, then continue to the next room") : activeSpace < 0 ? "Choose a room. Make yourself at home." : "Scroll to read. Your view stays still.") : "A little world of ideas"} ko={ready ? (tourActive ? (activeSpace < 0 ? "스크롤로 정원부터 마지막 공간까지 둘러보세요." : "스크롤로 읽고, 다음 공간으로 이어가세요.") : activeSpace < 0 ? "공간을 골라 편하게 둘러보세요." : "스크롤로 읽으세요. 시점은 움직이지 않습니다.") : "아이디어가 자라는 작은 세계"} /></p>
          <div className="experience-chapters" role="group" aria-label="Garden journey / 정원 동선" hidden={!ready}>
            <button type="button" onClick={() => travelToSpace(-1)} aria-pressed={activeSpace < 0}><T en="Garden" ko="정원" /></button>
            {SPACES.map((space, i) => <button key={space.id} type="button" onClick={() => travelToSpace(i)} aria-pressed={activeSpace === i}><T en={space.en} ko={space.ko} /></button>)}
          </div>
          <div className="experience-preferences" hidden={!ready}>
            <button type="button" className="experience-motion experience-scroll-tour" aria-pressed={scrollTour && !reducedPreference} disabled={reducedPreference} onClick={changeScrollTour} aria-label="Full-site scroll tour / 전체 스크롤 투어" title="Scroll through the garden and every room. The camera pauses while you read."><T en={scrollTour && !reducedPreference ? "Scroll tour on" : "Scroll tour off"} ko={scrollTour && !reducedPreference ? "스크롤 투어 켜짐" : "스크롤 투어 꺼짐"} /><span className="motion-switch" aria-hidden="true" /></button>
            <button type="button" className="experience-motion" aria-pressed={cameraMotion && !reducedPreference} disabled={reducedPreference} onClick={changeMotion} aria-label="Camera animation / 카메라 애니메이션"><T en={cameraMotion && !reducedPreference ? "Motion on" : "Motion off"} ko={cameraMotion && !reducedPreference ? "카메라 모션 켜짐" : "카메라 모션 꺼짐"} /><span className="motion-switch" aria-hidden="true" /></button>
            <button type="button" className="experience-light" aria-pressed={golden} onClick={changeLight} aria-label="Toggle golden-hour light / 노을빛 전환"><span aria-hidden="true">☼</span><T en={golden ? "Golden hour" : "Daylight"} ko={golden ? "노을빛" : "낮빛"} /></button>
          </div>
        </div>
        <div className="experience-progress" hidden={!tourActive} aria-hidden="true"><span /></div>
        <p className="sr-only" id="experience-instructions"><T en="Scroll tour uses one page scrollbar from the garden through Products, Practice, Partnership, Stack, Press, and Contact. At each room the camera stays still until all content has scrolled past, then continues. Navigation jumps to a room in the same tour. Turn Scroll tour off for independent room scrolling, or turn Motion off for instant navigation. Reduced motion disables the tour. Browser Back and Forward restore chosen rooms." ko="스크롤 투어는 정원에서 제품, 역량, 구독, 기술, 보도, 연락까지 하나의 페이지 스크롤로 이어집니다. 각 공간의 내용을 모두 읽는 동안 카메라가 멈추고, 그다음 다음 공간으로 이동합니다. 메뉴로 원하는 공간에 바로 갈 수 있습니다. 스크롤 투어를 끄면 각 공간을 따로 스크롤하고, 모션을 끄면 즉시 이동합니다. 동작 줄이기 설정에서는 투어가 꺼집니다. 브라우저 뒤로가기와 앞으로가기로 선택한 공간을 다시 볼 수 있습니다." /></p>
      </div>
      {mounts.length ? panels.map((panel, index) => mounts[index] ? createPortal(panel, mounts[index], SPACES[index].id) : null) : <div className="spatial-fallback-content">{children}</div>}
    </div>
  );
}
