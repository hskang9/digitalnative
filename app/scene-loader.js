export default function SceneLoader({ loading, phase, onSkip }) {
  return (
    <div className="scene-loader t-skel-skeleton" data-phase={phase} aria-hidden={!loading} inert={!loading}>
      <div className="scene-loader-inner">
        {/* The tower assembles while the 3D world downloads and lights up while
            its first frame is prepared. Pure SVG + CSS, so it animates from the
            static HTML before hydration or any chunk arrives. */}
        <div className="loader-model" aria-hidden="true">
          <svg className="loader-tower" viewBox="30 36 180 192" focusable="false">
            <ellipse className="lm-shadow" cx="120" cy="196" rx="78" ry="20" />
            <g className="lm lm-ground" style={{"--i": 0}}>
              <polygon className="lm-face" points="45.5,171.0 125.2,217.0 125.2,211.0 45.5,165.0" fill="#3f5a3e" />
              <polygon className="lm-face" points="194.5,177.0 125.2,217.0 125.2,211.0 194.5,171.0" fill="#55704a" />
              <polygon className="lm-face" points="114.8,125.0 194.5,171.0 125.2,211.0 45.5,165.0" fill="#899361" />
              <ellipse className="lm-face lm-pool" cx="152" cy="185" rx="15" ry="7.5" fill="#308a83" />
              <ellipse className="lm-ripple" cx="152" cy="185" rx="8" ry="4" fill="none" stroke="#92c4a0" strokeWidth="0.8" />
            </g>
            <g className="lm-plants">
              <circle className="lm-plant" style={{"--d": 0.12}} cx="113.1" cy="130.4" r="5.2" fill="#748546" />
              <circle className="lm-plant" style={{"--d": 0.17}} cx="90.6" cy="141.4" r="5.2" fill="#9b9c46" />
            </g>
            <g className="lm lm-storey" style={{"--i": 1}}>
              <path className="lm-edge" pathLength="1" d="M87.1 163.0L123.5 184.0L152.9 167.0L152.9 141.0L116.5 120.0L87.1 137.0Z M87.1 137.0L123.5 158.0L152.9 141.0 M123.5 158.0L123.5 184.0" />
              <polygon className="lm-face" points="87.1,163.0 123.5,184.0 123.5,158.0 87.1,137.0" fill="#c9923f" />
              <polygon className="lm-face" points="152.9,167.0 123.5,184.0 123.5,158.0 152.9,141.0" fill="#e6b55a" />
              <polygon className="lm-face lm-window" style={{"--w": 0}} points="146.4,163.5 141.1,166.5 141.1,155.1 146.4,152.0" />
              <polygon className="lm-face lm-window" style={{"--w": 2}} points="94.4,159.9 100.2,163.3 100.2,151.8 94.4,148.5" />
              <polygon className="lm-face lm-window" style={{"--w": 1}} points="134.7,170.3 129.4,173.3 129.4,161.9 134.7,158.8" />
              <polygon className="lm-face lm-window" style={{"--w": 3}} points="109.6,168.7 115.5,172.1 115.5,160.7 109.6,157.3" />
              <polygon className="lm-face" points="83.6,140.0 123.5,163.0 123.5,160.0 83.6,137.0" fill="#b9663d" />
              <polygon className="lm-face" points="156.4,144.0 123.5,163.0 123.5,160.0 156.4,141.0" fill="#d07a4a" />
              <polygon className="lm-face" points="116.5,118.0 156.4,141.0 123.5,160.0 83.6,137.0" fill="#f0dba1" />
            </g>
            <g className="lm lm-storey" style={{"--i": 2}}>
              <path className="lm-edge" pathLength="1" d="M92.3 137.0L123.5 155.0L148.6 140.5L148.6 116.5L117.4 98.5L92.3 113.0Z M92.3 113.0L123.5 131.0L148.6 116.5 M123.5 131.0L123.5 155.0" />
              <polygon className="lm-face" points="92.3,137.0 123.5,155.0 123.5,131.0 92.3,113.0" fill="#c9923f" />
              <polygon className="lm-face" points="148.6,140.5 123.5,155.0 123.5,131.0 148.6,116.5" fill="#e6b55a" />
              <polygon className="lm-face lm-window" style={{"--w": 4}} points="143.1,137.0 138.5,139.6 138.5,129.0 143.1,126.4" />
              <polygon className="lm-face lm-window" style={{"--w": 6}} points="98.5,133.9 103.5,136.8 103.5,126.2 98.5,123.3" />
              <polygon className="lm-face lm-window" style={{"--w": 5}} points="133.0,142.8 128.5,145.4 128.5,134.8 133.0,132.2" />
              <polygon className="lm-face lm-window" style={{"--w": 7}} points="111.6,141.4 116.6,144.3 116.6,133.8 111.6,130.9" />
              <polygon className="lm-face" points="88.8,116.0 123.5,136.0 123.5,133.0 88.8,113.0" fill="#b9663d" />
              <polygon className="lm-face" points="152.0,119.5 123.5,136.0 123.5,133.0 152.0,116.5" fill="#d07a4a" />
              <polygon className="lm-face" points="117.4,96.5 152.0,116.5 123.5,133.0 88.8,113.0" fill="#f0dba1" />
            </g>
            <g className="lm lm-storey" style={{"--i": 3}}>
              <path className="lm-edge" pathLength="1" d="M97.5 113.0L123.5 128.0L144.2 116.0L144.2 94.0L118.3 79.0L97.5 91.0Z M97.5 91.0L123.5 106.0L144.2 94.0 M123.5 106.0L123.5 128.0" />
              <polygon className="lm-face" points="97.5,113.0 123.5,128.0 123.5,106.0 97.5,91.0" fill="#c9923f" />
              <polygon className="lm-face" points="144.2,116.0 123.5,128.0 123.5,106.0 144.2,94.0" fill="#e6b55a" />
              <polygon className="lm-face lm-window" style={{"--w": 8}} points="139.7,112.5 135.9,114.6 135.9,105.0 139.7,102.8" />
              <polygon className="lm-face lm-window" style={{"--w": 10}} points="102.7,109.8 106.8,112.2 106.8,102.6 102.7,100.2" />
              <polygon className="lm-face lm-window" style={{"--w": 9}} points="131.4,117.3 127.6,119.4 127.6,109.8 131.4,107.6" />
              <polygon className="lm-face lm-window" style={{"--w": 11}} points="113.6,116.1 117.7,118.5 117.7,108.9 113.6,106.5" />
              <polygon className="lm-face" points="94.0,94.0 123.5,111.0 123.5,108.0 94.0,91.0" fill="#b9663d" />
              <polygon className="lm-face" points="147.7,97.0 123.5,111.0 123.5,108.0 147.7,94.0" fill="#d07a4a" />
              <polygon className="lm-face" points="118.3,77.0 147.7,94.0 123.5,108.0 94.0,91.0" fill="#f0dba1" />
            </g>
            <g className="lm lm-storey" style={{"--i": 4}}>
              <path className="lm-edge" pathLength="1" d="M102.7 91.0L123.5 103.0L139.9 93.5L139.9 73.5L119.1 61.5L102.7 71.0Z M102.7 71.0L123.5 83.0L139.9 73.5 M123.5 83.0L123.5 103.0" />
              <polygon className="lm-face" points="102.7,91.0 123.5,103.0 123.5,83.0 102.7,71.0" fill="#c9923f" />
              <polygon className="lm-face" points="139.9,93.5 123.5,103.0 123.5,83.0 139.9,73.5" fill="#e6b55a" />
              <polygon className="lm-face lm-window" style={{"--w": 12}} points="136.3,90.0 133.3,91.7 133.3,82.9 136.3,81.2" />
              <polygon className="lm-face lm-window" style={{"--w": 14}} points="106.8,87.8 110.2,89.7 110.2,80.9 106.8,79.0" />
              <polygon className="lm-face lm-window" style={{"--w": 13}} points="129.7,93.8 126.8,95.5 126.8,86.7 129.7,85.0" />
              <polygon className="lm-face lm-window" style={{"--w": 15}} points="115.6,92.8 118.9,94.8 118.9,86.0 115.6,84.0" />
              <polygon className="lm-face" points="99.2,74.0 123.5,88.0 123.5,85.0 99.2,71.0" fill="#b9663d" />
              <polygon className="lm-face" points="143.4,76.5 123.5,88.0 123.5,85.0 143.4,73.5" fill="#d07a4a" />
              <polygon className="lm-face" points="119.1,59.5 143.4,73.5 123.5,85.0 99.2,71.0" fill="#f0dba1" />
            </g>
            <g className="lm-plants">
              <circle className="lm-plant" style={{"--d": 0.22}} cx="71.5" cy="156.4" r="5.2" fill="#aab459" />
              <circle className="lm-plant" style={{"--d": 0.12}} cx="80.2" cy="173.4" r="5.2" fill="#4d743e" />
              <circle className="lm-plant" style={{"--d": 0.17}} cx="94.0" cy="183.4" r="5.2" fill="#658443" />
              <circle className="lm-plant" style={{"--d": 0.22}} cx="173.7" cy="167.4" r="5.2" fill="#748546" />
              <circle className="lm-plant" style={{"--d": 0.12}} cx="158.1" cy="180.4" r="5.2" fill="#9b9c46" />
              <circle className="lm-plant" style={{"--d": 0.17}} cx="146.0" cy="189.4" r="5.2" fill="#aab459" />
              <circle className="lm-plant" style={{"--d": 0.52}} cx="94.8" cy="138.9" r="2.8" fill="#4d743e" />
              <circle className="lm-plant" style={{"--d": 0.42}} cx="116.6" cy="151.6" r="2.8" fill="#658443" />
              <circle className="lm-plant" style={{"--d": 0.47}} cx="136.3" cy="148.1" r="2.8" fill="#748546" />
              <circle className="lm-plant" style={{"--d": 0.76}} cx="99.0" cy="114.3" r="2.8" fill="#9b9c46" />
              <circle className="lm-plant" style={{"--d": 0.66}} cx="117.7" cy="125.2" r="2.8" fill="#aab459" />
              <circle className="lm-plant" style={{"--d": 0.71}} cx="134.3" cy="122.2" r="2.8" fill="#4d743e" />
              <circle className="lm-plant" style={{"--d": 1.0}} cx="103.1" cy="91.8" r="2.8" fill="#658443" />
              <circle className="lm-plant" style={{"--d": 0.9}} cx="118.7" cy="100.8" r="2.8" fill="#748546" />
              <circle className="lm-plant" style={{"--d": 0.95}} cx="132.4" cy="98.3" r="2.8" fill="#9b9c46" />
            </g>
            <g className="lm lm-roof" style={{"--i": 5}}>
              <polygon className="lm-face" points="119.1,58.5 145.1,73.5 134.3,63.8 108.3,48.8" fill="#9e5333" />
              <polygon className="lm-face" points="97.5,71.0 123.5,86.0 134.3,63.8 108.3,48.8" fill="#b9663d" />
              <polygon className="lm-face" points="145.1,73.5 123.5,86.0 134.3,63.8" fill="#f0dba1" />
            </g>
            <g className="lm lm-solar" style={{"--i": 5.6}}>
              <polygon className="lm-panel" style={{"--k": 0}} points="119.6,58.0 125.2,61.3 118.2,55.0 112.5,51.7" fill="#255a64" stroke="#7fb3b4" strokeWidth="0.5" />
              <polygon className="lm-panel" style={{"--k": 1}} points="126.5,62.0 132.1,65.3 125.1,59.0 119.5,55.7" fill="#255a64" stroke="#7fb3b4" strokeWidth="0.5" />
              <polygon className="lm-panel" style={{"--k": 2}} points="133.4,66.0 139.1,69.3 132.0,63.0 126.4,59.7" fill="#255a64" stroke="#7fb3b4" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
        <p className="scene-loader-eyebrow"><span data-l="en">The architectural garden</span><span data-l="ko" lang="ko">건축 정원</span></p>
        <h2 className="scene-loader-title"><span data-l="en">Opening the garden.</span><span data-l="ko" lang="ko">정원을 열고 있어요.</span></h2>
        <p className="scene-loader-status" role="status" aria-live="polite" aria-atomic="true">
          <span data-l="en">{phase === "rendering" ? "Preparing the first view" : "Loading the 3D scene"}</span>
          <span data-l="ko" lang="ko">{phase === "rendering" ? "첫 장면을 준비하고 있습니다" : "3D 공간을 불러오고 있습니다"}</span>
        </p>
        <button type="button" className="scene-loader-skip" onClick={onSkip}>
          <span data-l="en">Browse without 3D</span><span data-l="ko" lang="ko">3D 없이 둘러보기</span><span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
