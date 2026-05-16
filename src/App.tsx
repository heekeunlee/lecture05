import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Copy,
  Check,
  Grid3x3,
  Layers,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Target,
  ArrowRight,
  Play,
  BarChart3,
  Cpu,
  Battery,
  Monitor,
  ExternalLink,
} from 'lucide-react';

const TOTAL_SLIDES = 33;

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);
  return { copied, copy };
}

function SlideShell({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return <div className={`slide-shell${accent ? ' accent' : ''}`}>{children}</div>;
}
function SlideTag({ label }: { label: string }) {
  return <span className="slide-tag">{label}</span>;
}
function SlideNumber({ n }: { n: number }) {
  return <span className="slide-num">{String(n).padStart(2, '0')}</span>;
}

// ── Slide 01 ─────────────────────────────────────────────────
function Slide01() {
  return (
    <SlideShell accent>
      <div className="s01-wrap">
        <div className="s01-badge">LECTURE 05</div>
        <h1 className="s01-title">수율 히트맵 &amp;<br />웨이퍼 맵 시각화</h1>
        <p className="s01-sub">불량 위치를 지도로 그린다 — AI 코딩으로 10분 안에</p>
        <div className="s01-pills">
          <span>반도체</span><span>디스플레이</span><span>2차전지</span>
        </div>
        <div className="s01-meta">
          <span>40분</span><span>·</span><span>33 슬라이드</span><span>·</span><span>Antigravity 실습 포함</span>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 02 웨이퍼 데이터 (10×10 = 100 측정 포인트) ──────────────────
const S02_N    = 10;
const S02_CELL = 18; // canvas px per cell (10×18 = 180px grid)
const S02_DATA: number[][] = Array.from({ length: S02_N }, (_, r) =>
  Array.from({ length: S02_N }, (_, c) => {
    const dist = Math.sqrt((c - 4.5) ** 2 + (r - 4.5) ** 2);
    const base  = Math.max(32, 97 - dist * 8.6);
    const wave  = Math.sin(c * 0.68 + 1.2) * 3 + Math.cos(r * 0.92 + 0.7) * 2;
    const cd    = Math.sqrt((c - 7.5) ** 2 + (r - 7.5) ** 2);
    const clust = cd < 2.4 ? -40 * (1 - cd / 2.4) : 0;
    return Math.round(Math.max(10, Math.min(99, base + wave + clust)));
  })
);

// ── Slide 06 웨이퍼 데이터 (100×100 = 10,000 측정 포인트) ──────────────
const S06_N = 100;
const S06_DATA: number[][] = Array.from({ length: S06_N }, (_, r) =>
  Array.from({ length: S06_N }, (_, c) => {
    const dx = c - 49.5, dy = r - 49.5;
    const dist = Math.sqrt(dx * dx + dy * dy) / 50;
    const base  = Math.max(35, 97 - dist * 55);
    const wave  = Math.sin(c * 0.18 + 0.9) * 2.5 + Math.cos(r * 0.22 + 1.1) * 2;
    const cd    = Math.sqrt((c - 72) ** 2 + (r - 70) ** 2);
    const clust = cd < 10 ? -25 * (1 - cd / 10) : 0;
    return Math.round(Math.max(10, Math.min(99, base + wave + clust)));
  })
);

// ── 웨이퍼 실물 일러스트 SVG (200×200 정사각 viewBox) ────────────────
function WaferIllustrationSVG() {
  // Circle r=87, center(100,100), flat at y=182
  const r = 87, cx = 100, cy = 100;
  const flatDy  = Math.round(r * 0.945); // 82
  const flatX   = Math.round(Math.sqrt(r * r - flatDy * flatDy)); // 29
  const lx = cx - flatX, rx = cx + flatX, fy = cy + flatDy;
  const arc = `M ${lx},${fy} A ${r},${r} 0 1 1 ${rx},${fy} Z`;
  return (
    <svg viewBox="0 0 200 200" className="wafer-illus-svg">
      <defs>
        <radialGradient id="wfBase" cx="42%" cy="34%" r="65%">
          <stop offset="0%"   stopColor="#c0ccd8"/>
          <stop offset="28%"  stopColor="#7a8898"/>
          <stop offset="65%"  stopColor="#424e5c"/>
          <stop offset="100%" stopColor="#252e38"/>
        </radialGradient>
        <radialGradient id="wfShine" cx="37%" cy="27%" r="38%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.52)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <linearGradient id="wfIrid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(100,140,255,0.13)"/>
          <stop offset="33%"  stopColor="rgba(255,200,80,0.08)"/>
          <stop offset="67%"  stopColor="rgba(80,220,140,0.08)"/>
          <stop offset="100%" stopColor="rgba(220,100,255,0.13)"/>
        </linearGradient>
        <clipPath id="wfClip"><path d={arc}/></clipPath>
        <filter id="wfShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#000" floodOpacity="0.35"/>
        </filter>
      </defs>
      <path d={arc} fill="none" filter="url(#wfShadow)"/>
      <path d={arc} fill="url(#wfBase)" stroke="#3a4652" strokeWidth="1.5"/>
      <g clipPath="url(#wfClip)" opacity="0.18">
        {Array.from({ length: 18 }, (_, i) => (
          <g key={i}>
            <line x1={i * 11 + 5} y1="5" x2={i * 11 + 5} y2="185" stroke="#aabac8" strokeWidth="0.5"/>
            <line x1="5" y1={i * 11 + 5} x2="195" y2={i * 11 + 5} stroke="#aabac8" strokeWidth="0.5"/>
          </g>
        ))}
      </g>
      <path d={arc} fill="url(#wfIrid)"/>
      <path d={arc} fill="url(#wfShine)"/>
      <line x1={lx} y1={fy} x2={rx} y2={fy} stroke="rgba(255,255,255,0.55)" strokeWidth="1.8"/>
      <path d={`M ${lx},${fy} A ${r},${r} 0 1 1 ${rx},${fy}`}
        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3"/>
      <text x={cx} y={cy + 58} textAnchor="middle" fill="rgba(200,215,230,0.5)"
        fontSize="7" fontFamily="'SF Mono','Fira Code',monospace">300 mm Silicon Wafer</text>
      <text x={cx} y={fy + 12} textAnchor="middle" fill="rgba(140,162,185,0.75)"
        fontSize="6.5" fontFamily="'SF Mono','Fira Code',monospace">▼ Orientation Flat</text>
    </svg>
  );
}

// ── Slide 02 ─────────────────────────────────────────────────
function Slide02() {
  const hmRef  = useRef<HTMLCanvasElement>(null);
  const numRef = useRef<HTMLCanvasElement>(null);

  const toColor = (v: number) =>
    v >= 90 ? '#0ea5e9' : v >= 80 ? '#38bdf8' : v >= 70 ? '#7dd3fc' :
    v >= 60 ? '#fbbf24' : v >= 50 ? '#f97316' : '#ef4444';

  useEffect(() => {
    const DIM  = 300;
    const cell = S02_CELL;        // 18 px
    const off  = (DIM - S02_N * cell) / 2; // 60 px margin
    const cx = DIM / 2, cy = DIM / 2;
    const R  = 130; // radius px — contains full 180×180 grid (corner dist ≈115)

    // Flat edge geometry
    const flatDy = R * 0.945;
    const flatXpx = Math.sqrt(R * R - flatDy * flatDy);
    const rAng = Math.atan2(flatDy,  flatXpx);
    const lAng = Math.atan2(flatDy, -flatXpx);
    const fy   = cy + flatDy, flx = cx - flatXpx, frx = cx + flatXpx;

    const clipWafer = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.arc(cx, cy, R, rAng, lAng, true); // anticlockwise = through top
      ctx.closePath(); // straight line = orientation flat
      ctx.clip();
    };
    const drawOutline = (ctx: CanvasRenderingContext2D) => {
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R, rAng, lAng, true);
      ctx.closePath(); ctx.stroke();
      // Flat highlight
      ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(flx, fy); ctx.lineTo(frx, fy); ctx.stroke();
    };

    // ── Heatmap ──────────────────────────────────────────────
    const hm = hmRef.current;
    if (hm) {
      const ctx = hm.getContext('2d')!;
      ctx.clearRect(0, 0, DIM, DIM);
      ctx.save();
      clipWafer(ctx);
      S02_DATA.forEach((row, ri) => row.forEach((v, ci) => {
        ctx.fillStyle = toColor(v);
        ctx.fillRect(off + ci * cell, off + ri * cell, cell, cell);
      }));
      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 0.5;
      for (let i = 0; i <= S02_N; i++) {
        ctx.beginPath(); ctx.moveTo(off + i * cell, off); ctx.lineTo(off + i * cell, off + S02_N * cell); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(off, off + i * cell); ctx.lineTo(off + S02_N * cell, off + i * cell); ctx.stroke();
      }
      ctx.restore();
      drawOutline(ctx);
    }

    // ── Number table ─────────────────────────────────────────
    const nm = numRef.current;
    if (nm) {
      const ctx = nm.getContext('2d')!;
      ctx.clearRect(0, 0, DIM, DIM);
      ctx.save();
      clipWafer(ctx);
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, DIM, DIM);
      // Alternating row shading
      S02_DATA.forEach((_, ri) => {
        ctx.fillStyle = ri % 2 === 0 ? '#f8fafc' : '#f1f5f9';
        ctx.fillRect(off, off + ri * cell, S02_N * cell, cell);
      });
      // Cell dividers
      ctx.strokeStyle = 'rgba(203,213,225,0.7)'; ctx.lineWidth = 0.5;
      for (let i = 0; i <= S02_N; i++) {
        ctx.beginPath(); ctx.moveTo(off + i * cell, off); ctx.lineTo(off + i * cell, off + S02_N * cell); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(off, off + i * cell); ctx.lineTo(off + S02_N * cell, off + i * cell); ctx.stroke();
      }
      // Values
      const fs = Math.round(cell * 0.6); // ≈ 11 px
      ctx.font = `${fs}px monospace`; ctx.textBaseline = 'middle';
      S02_DATA.forEach((row, ri) => row.forEach((v, ci) => {
        ctx.fillStyle = v < 50 ? '#dc2626' : v < 70 ? '#b45309' : '#475569';
        const tx = off + ci * cell + cell / 2;
        const ty = off + ri * cell + cell / 2;
        ctx.textAlign = 'center';
        ctx.fillText(String(v), tx, ty);
      }));
      ctx.restore();
      drawOutline(ctx);
    }
  }, []);

  return (
    <SlideShell>
      <SlideNumber n={2} />
      <SlideTag label="BEFORE / AFTER" />
      <h2 className="s-title">같은 데이터, 다른 세계</h2>
      <div className="s02-three">
        {/* 왼쪽: 웨이퍼 실물 */}
        <div className="s02-panel">
          <div className="s02-panel-label">실제 웨이퍼</div>
          <div className="s02-canvas-outer">
            <div className="s02-wafer-frame"><WaferIllustrationSVG /></div>
          </div>
          <div className="s02-panel-note">300mm Si 웨이퍼 · 수천 측정 다이</div>
        </div>
        {/* 가운데: 숫자 측정값 (100 포인트) */}
        <div className="s02-panel">
          <div className="s02-panel-label bad">BEFORE — 숫자 100개</div>
          <div className="s02-canvas-outer">
            <div className="s02-wafer-frame">
              <canvas ref={numRef} width={300} height={300} className="s02-canvas" />
            </div>
          </div>
          <div className="s02-panel-note bad">이상 구역 찾기 — 20~30분 소요</div>
        </div>
        {/* 오른쪽: 히트맵 */}
        <div className="s02-panel">
          <div className="s02-panel-label good">AFTER — 히트맵</div>
          <div className="s02-canvas-outer">
            <div className="s02-wafer-frame">
              <canvas ref={hmRef} width={300} height={300} className="s02-canvas" />
            </div>
          </div>
          <div className="s02-panel-note good">우하단 불량 군집 3초 안에 보임</div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 03 ─────────────────────────────────────────────────
function Slide03() {
  const hmStrip = [
    { val: 96, col: '#0ea5e9' }, { val: 89, col: '#38bdf8' },
    { val: 74, col: '#fbbf24' }, { val: 55, col: '#f97316' }, { val: 38, col: '#ef4444' },
  ];
  const goals = [
    {
      n: '01',
      text: '수율 데이터의 공간 분포를 히트맵으로 시각화하는 원리를 이해한다',
      before: { label: '엑셀 분석', val: '20~30분' }, after: { label: '히트맵', val: '3초' },
      vis: (
        <div className="g3-vis hm-strip">
          <span className="g3-vis-label">수율 등급 색상 척도</span>
          <div className="g3-hm-row">
            {hmStrip.map((item, i) => (
              <div key={i} className="g3-hm-cell" style={{ background: item.col }}>
                <span>{item.val}%</span>
              </div>
            ))}
          </div>
          <div className="g3-hm-axis"><span>우수 ≥90%</span><span>이상 &lt;50%</span></div>
        </div>
      ),
    },
    {
      n: '02',
      text: 'AI 작업지시서로 인터랙티브 웨이퍼/패널 맵을 직접 만들 수 있다',
      before: { label: '코딩 필요', val: '수백 줄' }, after: { label: 'Antigravity', val: '4~10분' },
      vis: (
        <div className="g3-vis flow-vis">
          <div className="g3-flow-box prompt">작업지시서<br/><span>5요소 입력</span></div>
          <ArrowRight size={14} color="#94a3b8" />
          <div className="g3-flow-box ai">Antigravity<br/><span>AI 코드 생성</span></div>
          <ArrowRight size={14} color="#94a3b8" />
          <div className="g3-flow-box result">히트맵 결과<br/><span>HTML 완성</span></div>
        </div>
      ),
    },
    {
      n: '03',
      text: '시각화 결과에서 공정 불균일성의 원인 후보 3가지를 도출할 수 있다',
      before: { label: '경험 의존', val: '주관적' }, after: { label: 'AI+엔지니어', val: '3가지 체계화' },
      vis: (
        <div className="g3-vis cause-vis">
          {[
            { pat: '가장자리 구배', cause: '타겟 race-track 침식' },
            { pat: '특정 열 반복', cause: '슬롯다이 노즐 막힘' },
            { pat: '하단 띠 불량', cause: '증착원 각도 편차' },
          ].map((c, i) => (
            <div key={i} className="g3-cause-row">
              <span className="g3-cause-pat">{c.pat}</span>
              <ArrowRight size={11} color="#94a3b8" />
              <span className="g3-cause-result">{c.cause}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];
  return (
    <SlideShell>
      <SlideNumber n={3} />
      <SlideTag label="학습 목표" />
      <h2 className="s-title">학습 목표 및 성취 역량</h2>
      <div className="goals-list">
        {goals.map(g => (
          <div className="goal-item g3" key={g.n}>
            <span className="goal-num">{g.n}</span>
            <div className="goal-body">
              <p>{g.text}</p>
              {g.vis}
            </div>
            <div className="goal-metric">
              <div className="gm-label">성취 지표</div>
              <div className="gm-row bad"><span className="gm-key">{g.before.label}</span><span className="gm-val">{g.before.val}</span></div>
              <div className="gm-row good"><span className="gm-key">{g.after.label}</span><span className="gm-val">{g.after.val}</span></div>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 04 ─────────────────────────────────────────────────
function Slide04() {
  const parts = [
    { label: 'INTRO', slides: '01–04', time: '4분', color: '#6366f1', topics: ['배경: 왜 히트맵?', '학습 목표', '오늘 로드맵'] },
    { label: '개념', slides: '05–12', time: '8분', color: '#06b6d4', topics: ['히트맵 원리', '수율 구배', '공간 군집 유형', '패턴→원인'] },
    { label: '실무 사례', slides: '13–24', time: '15분', color: '#f59e0b', topics: ['PVD 스퍼터링', 'OLED 유기물 증착', '슬롯다이 코팅'] },
    { label: '작업지시서', slides: '25–28', time: '5분', color: '#10b981', topics: ['5요소 설계법', '나쁜/좋은 예', '도메인 템플릿'] },
    { label: '실습', slides: '29–30', time: '5분', color: '#ef4444', topics: ['Antigravity 실행', '검증 체크리스트'] },
    { label: '마무리', slides: '31–33', time: '3분', color: '#8b5cf6', topics: ['핵심 요약 3가지', '다음 강의 예고'] },
  ];
  return (
    <SlideShell>
      <SlideNumber n={4} />
      <SlideTag label="로드맵" />
      <h2 className="s-title">40분 여정 한눈에</h2>
      <div className="roadmap-row">
        {parts.map((p) => (
          <div className="roadmap-item" key={p.label}>
            <div className="roadmap-dot" style={{ background: p.color }} />
            <div className="roadmap-label">{p.label}</div>
            <div className="roadmap-slides">{p.slides}</div>
            <div className="roadmap-time">{p.time}</div>
            <ul className="roadmap-topics">
              {p.topics.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 05 인라인 일러스트 SVG ──────────────────────────────
function WeatherMapSVG() {
  // 기상청 기온 분포도처럼 색 구역이 겹치는 온도 맵
  return (
    <svg viewBox="0 0 200 92" className="analogy-vis-svg">
      <defs>
        <radialGradient id="wBlue" cx="25%" cy="35%" r="48%">
          <stop offset="0%"   stopColor="rgba(56,189,248,0.85)"/>
          <stop offset="100%" stopColor="rgba(56,189,248,0)"/>
        </radialGradient>
        <radialGradient id="wGreen" cx="52%" cy="55%" r="40%">
          <stop offset="0%"   stopColor="rgba(134,239,172,0.8)"/>
          <stop offset="100%" stopColor="rgba(134,239,172,0)"/>
        </radialGradient>
        <radialGradient id="wOrange" cx="72%" cy="65%" r="42%">
          <stop offset="0%"   stopColor="rgba(251,191,36,0.85)"/>
          <stop offset="100%" stopColor="rgba(251,191,36,0)"/>
        </radialGradient>
        <radialGradient id="wRed" cx="88%" cy="75%" r="40%">
          <stop offset="0%"   stopColor="rgba(239,68,68,0.85)"/>
          <stop offset="100%" stopColor="rgba(239,68,68,0)"/>
        </radialGradient>
      </defs>
      <rect width="200" height="92" fill="#e0eaf4" rx="7"/>
      {/* 대륙 배경 */}
      <ellipse cx="95" cy="44" rx="88" ry="36" fill="#d4e0ec" opacity="0.7"/>
      {/* 온도 구역 색 */}
      <rect width="200" height="92" fill="url(#wBlue)" rx="7"/>
      <rect width="200" height="92" fill="url(#wGreen)" rx="7"/>
      <rect width="200" height="92" fill="url(#wOrange)" rx="7"/>
      <rect width="200" height="92" fill="url(#wRed)" rx="7"/>
      {/* 등온선 */}
      <ellipse cx="45" cy="33" rx="28" ry="18" fill="none" stroke="rgba(14,165,233,0.5)" strokeWidth="1" strokeDasharray="3,2"/>
      <ellipse cx="100" cy="50" rx="32" ry="18" fill="none" stroke="rgba(134,239,172,0.5)" strokeWidth="1" strokeDasharray="3,2"/>
      <ellipse cx="155" cy="62" rx="30" ry="18" fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="1" strokeDasharray="3,2"/>
      {/* 온도 라벨 */}
      <text x="35"  y="36" fontSize="9" fontWeight="700" fill="rgba(12,74,110,0.9)" fontFamily="sans-serif">16°C</text>
      <text x="88"  y="53" fontSize="9" fontWeight="700" fill="rgba(22,101,52,0.9)"  fontFamily="sans-serif">24°C</text>
      <text x="142" y="65" fontSize="9" fontWeight="700" fill="rgba(127,29,29,0.9)"  fontFamily="sans-serif">34°C</text>
      {/* 범례 바 */}
      <defs>
        <linearGradient id="legendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#38bdf8"/>
          <stop offset="33%"  stopColor="#86efac"/>
          <stop offset="66%"  stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#ef4444"/>
        </linearGradient>
      </defs>
      <rect x="20" y="81" width="160" height="7" fill="url(#legendGrad)" rx="3"/>
      <text x="20"  y="80" fontSize="6" fill="#475569" fontFamily="sans-serif">저온</text>
      <text x="170" y="80" textAnchor="end" fontSize="6" fill="#475569" fontFamily="sans-serif">고온</text>
    </svg>
  );
}

// ── 웨이퍼 외곽선 오버레이 (공용: 절대 위치 배치) ─────────────────────
function WaferOutline() {
  return (
    <svg className="wafer-outline-svg" viewBox="0 0 100 100">
      <line x1="34.6" y1="94.4" x2="65.4" y2="94.4"
        stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function WaferDefectSVG() {
  // 웨이퍼 맵: 우하단 불량 군집 강조 (정사각 다이, 웨이퍼 원 추가)
  const CW = 14, CH = 14, COLS = 7;
  const SX = 100 - COLS * CW / 2; // 51
  const SY = 8;
  const mask = [
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
  ];
  const defect = new Set(['4-5','5-4','5-5','4-6','5-6']);
  const warn   = new Set(['3-5','4-4','3-6','5-3']);
  const R = 52, cx = 100, cy = SY + COLS * CH / 2; // 57
  const flatDy = R * 0.945, flatX = Math.sqrt(R*R - flatDy*flatDy);
  const fy = cy + flatDy;
  const arc = `M ${(cx-flatX).toFixed(1)},${fy.toFixed(1)} A ${R},${R} 0 1 1 ${(cx+flatX).toFixed(1)},${fy.toFixed(1)} Z`;
  return (
    <svg viewBox="0 0 200 130" className="analogy-vis-svg">
      <rect width="200" height="130" fill="#f8fafc" rx="7"/>
      <defs>
        <clipPath id="wdf-clip"><path d={arc}/></clipPath>
      </defs>
      <path d={arc} fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
      <g clipPath="url(#wdf-clip)">
        {mask.map((row, ri) => row.map((v, ci) => {
          if (!v) return null;
          const key = `${ri}-${ci}`;
          const col = defect.has(key) ? '#ef4444' : warn.has(key) ? '#fbbf24' : '#0ea5e9';
          return <rect key={key} x={SX + ci*CW + 1} y={SY + ri*CH + 1} width={CW-2} height={CH-2} fill={col} rx="2" opacity="0.88"/>;
        }))}
      </g>
      <line x1={(cx-flatX).toFixed(1)} y1={fy.toFixed(1)} x2={(cx+flatX).toFixed(1)} y2={fy.toFixed(1)} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
      {/* 불량 군집 callout */}
      <line x1="142" y1="92" x2="155" y2="102" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3,2"/>
      <text x="157" y="106" fontSize="7" fill="#dc2626" fontWeight="700" fontFamily="sans-serif">불량 군집</text>
      {/* 범례 */}
      <g fontFamily="sans-serif" fontSize="7" fill="#64748b">
        <rect x="36" y="116" width="9" height="9" fill="#0ea5e9" rx="1.5"/>
        <text x="48" y="124">정상</text>
        <rect x="86" y="116" width="9" height="9" fill="#fbbf24" rx="1.5"/>
        <text x="98" y="124">주의</text>
        <rect x="136" y="116" width="9" height="9" fill="#ef4444" rx="1.5"/>
        <text x="148" y="124">불량</text>
      </g>
    </svg>
  );
}

function WaferGradientSVG() {
  // 웨이퍼 중심→가장자리 수율 구배 (정사각 다이, 웨이퍼 원 추가)
  const CW = 12, CH = 12, COLS = 9, ROWS = 7;
  const SX = 100 - COLS * CW / 2; // 46
  const SY = 8;
  const CCX = 4, CCY = 3;
  const R = 50, cx = 100, cy = SY + ROWS * CH / 2; // 50
  const flatDy = R * 0.945, flatX = Math.sqrt(R*R - flatDy*flatDy);
  const fy = cy + flatDy;
  const arc = `M ${(cx-flatX).toFixed(1)},${fy.toFixed(1)} A ${R},${R} 0 1 1 ${(cx+flatX).toFixed(1)},${fy.toFixed(1)} Z`;
  const col = (r: number, c: number) => {
    const d = Math.sqrt((c - CCX) ** 2 + (r - CCY) ** 2);
    if (d > 4.3) return null;
    if (d < 1.5) return '#0ea5e9';
    if (d < 2.5) return '#38bdf8';
    if (d < 3.5) return '#fbbf24';
    return '#ef4444';
  };
  return (
    <svg viewBox="0 0 200 115" className="analogy-vis-svg">
      <rect width="200" height="115" fill="#f8fafc" rx="7"/>
      <defs>
        <clipPath id="wdg-clip"><path d={arc}/></clipPath>
      </defs>
      <path d={arc} fill="none" stroke="#94a3b8" strokeWidth="1.5"/>
      <g clipPath="url(#wdg-clip)">
        {Array.from({length: ROWS}, (_, r) =>
          Array.from({length: COLS}, (_, c) => {
            const fill = col(r, c);
            if (!fill) return null;
            return <rect key={`${r}-${c}`} x={SX + c*CW + 1} y={SY + r*CH + 1} width={CW-2} height={CH-2} fill={fill} rx="2" opacity="0.9"/>;
          })
        )}
      </g>
      <line x1={(cx-flatX).toFixed(1)} y1={fy.toFixed(1)} x2={(cx+flatX).toFixed(1)} y2={fy.toFixed(1)} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
      <text x="100" y="108" textAnchor="middle" fontSize="6.5" fill="#334155" fontFamily="sans-serif">
        중심(≥90%) ──── 가장자리(&lt;60%)
      </text>
    </svg>
  );
}

// ── Slide 05 ─────────────────────────────────────────────────
function Slide05() {
  const hmColors = [
    ['#0ea5e9','#0ea5e9','#38bdf8','#fbbf24','#ef4444'],
    ['#0ea5e9','#0ea5e9','#38bdf8','#f97316','#ef4444'],
    ['#38bdf8','#38bdf8','#fbbf24','#ef4444','#ef4444'],
    ['#38bdf8','#fbbf24','#f97316','#ef4444','#ef4444'],
    ['#fbbf24','#f97316','#ef4444','#ef4444','#ef4444'],
  ];
  return (
    <SlideShell>
      <SlideNumber n={5} />
      <SlideTag label="개념 01" />
      <h2 className="s-title">히트맵이란?</h2>
      <div className="def-with-preview">
        <div className="definition-box">
          <p className="def-main">
            수치 데이터를 <strong>2D 색상 격자</strong>로 변환하여<br />
            숫자를 읽는 것보다 <strong>10배 빠른 패턴 인식</strong>을 가능하게 하는 시각화 기법.<br />
            인간의 시각 피질은 색·위치 패턴을 숫자 읽기보다 훨씬 빠르게 처리한다.
          </p>
        </div>
        <div className="hm-mini-preview">
          <div className="hm-mini-label">수율 히트맵 예시</div>
          <div className="hm-mini-grid">
            {hmColors.flat().map((c, i) => (
              <div key={i} className="hm-mini-cell" style={{ background: c }} />
            ))}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--fg3)', textAlign: 'center' }}>
            파랑≥90% · 빨강&lt;60%
          </div>
        </div>
      </div>
      <div className="concept-analogy">
        <div className="analogy-item">
          <span className="analogy-emoji">🌡️</span>
          <strong>온도 지도와 동일 원리</strong>
          <p>기상청 날씨 지도처럼 숫자 대신 색으로 지역 차이를 즉시 파악. 인간 시각 피질은 색·위치 패턴을 숫자 읽기보다 훨씬 빠르게 처리한다. 300mm 웨이퍼 전체 수율을 색으로 바꾸면 중심-가장자리 구배가 한 눈에 보인다.</p>
          <WeatherMapSVG />
          <div className="analogy-stat-row">
            <span className="asr-label">패턴 인식 향상</span>
            <span className="asr-val good">10배↑</span>
          </div>
        </div>
        <div className="analogy-item">
          <span className="analogy-emoji">🔴</span>
          <strong>낮은 수율 = 빨강</strong>
          <p>기준값 이하 다이가 어느 구역에 몰리는지 3초 안에 확인 가능. 시트 저항 목표 115mΩ/□ 기준 ±5% 초과 구역이 빨간색으로 자동 강조되어 수작업 표시가 필요 없다.</p>
          <WaferDefectSVG />
          <div className="analogy-stat-row">
            <span className="asr-label">이상 구역 파악</span>
            <span className="asr-val bad">3초 이내</span>
          </div>
        </div>
        <div className="analogy-item">
          <span className="analogy-emoji">🔵</span>
          <strong>높은 수율 = 파랑</strong>
          <p>정상과 비정상의 경계선이 공정 원인 위치를 직접 가리킨다. 중심·가장자리·특정 열·대각선 띠 등 패턴 형태만 보아도 어떤 설비 문제인지 후보가 좁혀진다.</p>
          <WaferGradientSVG />
          <div className="analogy-stat-row">
            <span className="asr-label">목표 수율 기준</span>
            <span className="asr-val accent">≥ 90%</span>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 06 ─────────────────────────────────────────────────
function Slide06() {
  const numRef = useRef<HTMLCanvasElement>(null);
  const hmRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const DIM = 400, N = S06_N, cell = Math.floor(DIM / N); // 4px
    const off = (DIM - N * cell) / 2;                       // 0
    const cx = DIM / 2, cy = DIM / 2, R = DIM / 2 - 4;     // 196
    const flatDy  = R * 0.945;
    const flatXpx = Math.sqrt(R * R - flatDy * flatDy);
    const rAng = Math.atan2(flatDy,  flatXpx);
    const lAng = Math.atan2(flatDy, -flatXpx);

    const clipWafer = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.arc(cx, cy, R, rAng, lAng, true);
      ctx.closePath();
      ctx.clip();
    };
    const drawRing = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.arc(cx, cy, R, rAng, lAng, true);
      ctx.closePath();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    };
    const toColor = (v: number) =>
      v >= 90 ? '#0ea5e9' : v >= 80 ? '#38bdf8' : v >= 70 ? '#fbbf24' : v >= 60 ? '#f97316' : '#ef4444';

    // ── 숫자 캔버스 ──
    const nc = numRef.current!;
    nc.width = nc.height = DIM;
    const nctx = nc.getContext('2d')!;
    nctx.fillStyle = '#f8fafc';
    nctx.fillRect(0, 0, DIM, DIM);
    nctx.save();
    clipWafer(nctx);
    nctx.font = `bold ${cell - 1}px monospace`;
    nctx.textAlign = 'center';
    nctx.textBaseline = 'middle';
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const v = S06_DATA[r][c];
        const x = off + c * cell, y = off + r * cell;
        nctx.fillStyle = r % 2 === 0 ? '#f1f5f9' : '#e8eef4';
        nctx.fillRect(x, y, cell, cell);
        nctx.fillStyle = '#0f172a';
        nctx.fillText(String(v), x + cell / 2, y + cell / 2);
      }
    }
    nctx.restore();
    drawRing(nctx);

    // ── 히트맵 캔버스 ──
    const hc = hmRef.current!;
    hc.width = hc.height = DIM;
    const hctx = hc.getContext('2d')!;
    hctx.fillStyle = '#f8fafc';
    hctx.fillRect(0, 0, DIM, DIM);
    hctx.save();
    clipWafer(hctx);
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        hctx.fillStyle = toColor(S06_DATA[r][c]);
        hctx.fillRect(off + c * cell, off + r * cell, cell, cell);
      }
    }
    hctx.restore();
    drawRing(hctx);
  }, []);

  return (
    <SlideShell>
      <SlideNumber n={6} />
      <SlideTag label="개념 01 심화" />
      <h2 className="s-title">숫자 → 색 → 패턴</h2>
      <div className="transform-flow">
        <div className="tf-step">
          <div className="tf-label">① 원시 데이터 (100×100)</div>
          <canvas ref={numRef} className="s06-canvas" />
        </div>
        <div className="tf-arrow"><ArrowRight size={24} /></div>
        <div className="tf-step">
          <div className="tf-label">② 히트맵</div>
          <canvas ref={hmRef} className="s06-canvas" />
        </div>
        <div className="tf-arrow"><ArrowRight size={24} /></div>
        <div className="tf-step">
          <div className="tf-label">③ 발견</div>
          <div className="tf-insight">
            <div className="tf-insight-header">
              <AlertTriangle size={18} color="#f59e0b" />
              <strong style={{ fontSize: '0.95rem' }}>패턴 분석 결과</strong>
            </div>
            <div className="tf-insight-list">
              <div className="tf-insight-item">▸ 우하단 구역 집중 이상</div>
              <div className="tf-insight-item">▸ 가장자리 저항 상승 패턴</div>
              <div className="tf-insight-item">▸ 타겟 침식 or Ar 구배 의심</div>
              <div className="tf-insight-item">▸ 7주차부터 악화 추세 확인</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 07 ─────────────────────────────────────────────────
function Slide07() {
  return (
    <SlideShell>
      <SlideNumber n={7} />
      <SlideTag label="개념 01 비교" />
      <h2 className="s-title">히트맵 vs 엑셀 표</h2>
      <div className="s07-split">
        <div className="compare-table">
          <div className="ct-header">
            <div />
            <div className="ct-h-bad">📊 엑셀 표</div>
            <div className="ct-h-good">🗺️ 히트맵</div>
          </div>
          {[
            ['패턴 파악', '사람이 눈으로 읽음', '색상으로 즉시 인식'],
            ['소요 시간', '20~30분', '3초'],
            ['공간 군집', '발견하기 어려움', '바로 보임'],
            ['이상 구역', '수동 표시 필요', '자동 강조'],
            ['공유 편의성', '파일 첨부', '웹 링크 하나'],
            ['학습 곡선', '개인 역량에 의존', '작업지시서로 표준화'],
            ['재현성', '매번 달라질 수 있음', '동일 조건 시 동일 결과'],
          ].map(([item, bad, good]) => (
            <div className="ct-row" key={item}>
              <div className="ct-item">{item}</div>
              <div className="ct-bad">{bad}</div>
              <div className="ct-good">{good}</div>
            </div>
          ))}
        </div>
        <div className="s07-keys">
          <div className="s07-key">
            <div className="s07-key-num">01</div>
            <p>패턴은 숫자가 아니라<br /><strong>색으로 3초 안에 보인다</strong></p>
          </div>
          <div className="s07-key">
            <div className="s07-key-num">02</div>
            <p>이상 구역이<br /><strong>스스로 드러난다</strong></p>
          </div>
          <div className="s07-key">
            <div className="s07-key-num">03</div>
            <p>작업지시서 한 장으로<br /><strong>누구나 동일한 결과</strong></p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── 웨이퍼 각부 명칭 해부도 SVG (wafer01+wafer02 참고) ───────────────
function WaferAnatomySVG() {
  const R = 90, cx = 160, cy = 135;
  const flatDy = 85, flatXpx = 30; // R*0.944, sqrt(R^2-flatDy^2)
  const lx = cx - flatXpx, rx = cx + flatXpx, fy = cy + flatDy; // 130,190,220
  const notchTopY = cy - R; // 45

  // Path: right-flat → (CCW small) → notch-right(166,48) → V → notch-left(154,48) → (CCW small) → left-flat → Z
  const arcPath =
    `M ${rx},${fy} A ${R},${R} 0 0 0 166,${notchTopY+3}` +
    ` L ${cx},${notchTopY+9} L 154,${notchTopY+3}` +
    ` A ${R},${R} 0 0 0 ${lx},${fy} Z`;

  // Die grid (wafer02 스타일 이리디슨트)
  const DW = 12, DH = 12, COLS = 13, ROWS = 13;
  const gx = cx - (COLS * DW) / 2; // 82
  const gy = cy - (ROWS * DH) / 2; // 57

  const dieColor = (ri: number, ci: number): string | null => {
    const dx = gx + ci * DW + DW / 2 - cx;
    const dy = gy + ri * DH + DH / 2 - cy;
    if (Math.sqrt(dx * dx + dy * dy) > R - 8) return null;
    const nx = dx / R, ny = dy / R;
    const phase = (nx * 2.5 + ny * 1.8 + Math.sqrt(nx*nx+ny*ny) * 1.6) * Math.PI;
    const p = (Math.sin(phase) + 1) / 2;
    const c = ['#9370db','#7060c8','#5070d0','#3898d0','#22b2b8','#c8a030','#d4b840','#a060c0'];
    return c[Math.floor(p * c.length)];
  };

  return (
    <svg viewBox="0 0 320 295" className="wm-anatomy-svg">
      <defs>
        <radialGradient id="waBase" cx="38%" cy="30%" r="72%">
          <stop offset="0%"   stopColor="#b0c0d8"/>
          <stop offset="40%"  stopColor="#6070a0"/>
          <stop offset="80%"  stopColor="#343858"/>
          <stop offset="100%" stopColor="#1a1e2c"/>
        </radialGradient>
        <radialGradient id="waShine" cx="26%" cy="20%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.38)"/>
          <stop offset="65%"  stopColor="rgba(255,255,255,0.02)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <clipPath id="waClip"><path d={arcPath}/></clipPath>
        <filter id="waShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.4)"/>
        </filter>
        <marker id="arrR" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#dc2626"/>
        </marker>
      </defs>

      {/* 웨이퍼 base */}
      <path d={arcPath} fill="none" filter="url(#waShadow)"/>
      <path d={arcPath} fill="url(#waBase)"/>

      <g clipPath="url(#waClip)">
        {/* 이리디슨트 다이 */}
        {Array.from({length: ROWS}, (_, ri) =>
          Array.from({length: COLS}, (_, ci) => {
            const fill = dieColor(ri, ci);
            if (!fill) return null;
            return <rect key={`${ri}-${ci}`}
              x={gx + ci * DW + 1} y={gy + ri * DH + 1}
              width={DW - 2} height={DH - 2}
              fill={fill} rx="1" opacity="0.93"/>;
          })
        )}
        {/* 스크라이브 라인 */}
        {Array.from({length: ROWS + 1}, (_, i) => (
          <line key={`hs${i}`} x1={gx} y1={gy + i * DH}
            x2={gx + COLS * DW} y2={gy + i * DH}
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
        ))}
        {Array.from({length: COLS + 1}, (_, i) => (
          <line key={`vs${i}`} x1={gx + i * DW} y1={gy}
            x2={gx + i * DW} y2={gy + ROWS * DH}
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
        ))}
        <path d={arcPath} fill="url(#waShine)"/>
      </g>

      {/* 윤곽선 + 플랫 존 */}
      <path d={arcPath} fill="none" stroke="#2a3040" strokeWidth="1.8"/>
      <line x1={lx} y1={fy} x2={rx} y2={fy}
        stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>

      {/* ── 레이블 & 화살표 ── */}
      {/* 노치 */}
      <line x1="68" y1="30" x2="152" y2={notchTopY + 7}
        stroke="#dc2626" strokeWidth="1.4" markerEnd="url(#arrR)"/>
      <text x="4"  y="23" fontSize="12" fontWeight="800" fill="#1e293b" fontFamily="sans-serif">노치</text>
      <text x="4"  y="38" fontSize="9"  fill="#64748b"   fontFamily="sans-serif">(Notch)</text>

      {/* 스크라이브 라인 */}
      <line x1="68" y1="97" x2={gx + 4 * DW} y2="107"
        stroke="#dc2626" strokeWidth="1.4" markerEnd="url(#arrR)"/>
      <text x="2"  y="85"  fontSize="12" fontWeight="800" fill="#1e293b" fontFamily="sans-serif">스크라이브</text>
      <text x="2"  y="100" fontSize="12" fontWeight="800" fill="#1e293b" fontFamily="sans-serif">라인</text>
      <text x="2"  y="114" fontSize="9"  fill="#64748b"   fontFamily="sans-serif">(Scribe Line)</text>

      {/* 다이 */}
      <line x1="248" y1="68" x2={gx + 8 * DW + 6} y2={gy + 2 * DH + 6}
        stroke="#dc2626" strokeWidth="1.4" markerEnd="url(#arrR)"/>
      <text x="255" y="58" fontSize="12" fontWeight="800" fill="#1e293b" fontFamily="sans-serif">다이</text>
      <text x="255" y="73" fontSize="9"  fill="#64748b"   fontFamily="sans-serif">(Die)</text>

      {/* 웨이퍼 */}
      <line x1="50" y1={cy} x2={cx - R + 4} y2={cy}
        stroke="#dc2626" strokeWidth="1.4" markerEnd="url(#arrR)"/>
      <text x="2"  y={cy - 7} fontSize="12" fontWeight="800" fill="#1e293b" fontFamily="sans-serif">웨이퍼</text>
      <text x="2"  y={cy + 9} fontSize="9"  fill="#64748b"   fontFamily="sans-serif">(Wafer)</text>

      {/* 플랫 존 */}
      <line x1={cx} y1="258" x2={cx} y2={fy + 5}
        stroke="#dc2626" strokeWidth="1.4" markerEnd="url(#arrR)"/>
      <text x="108" y="272" fontSize="12" fontWeight="800" fill="#1e293b" fontFamily="sans-serif">플랫 존</text>
      <text x="108" y="286" fontSize="9"  fill="#64748b"   fontFamily="sans-serif">(Flat Zone)</text>
    </svg>
  );
}

// ── 실물 웨이퍼 SVG (iridescent 다이 그리드) ─────────────────────────
function RealWaferSVG() {
  const R = 88, cx = 100, cy = 98;
  const flatDy  = Math.round(R * 0.945); // 83
  const flatXpx = Math.round(Math.sqrt(R * R - flatDy * flatDy)); // 28
  const lx = cx - flatXpx, rx = cx + flatXpx, fy = cy + flatDy;
  const arc = `M ${lx},${fy} A ${R},${R} 0 1 1 ${rx},${fy} Z`;
  const DW = 11, DH = 9, GCOLS = 16, GROWS = 18;
  const gx = cx - GCOLS * DW / 2, gy = cy - GROWS * DH / 2;
  return (
    <svg viewBox="0 0 200 215" className="s08-real-wafer">
      <defs>
        <radialGradient id="rwBase" cx="38%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#b8c8d8"/>
          <stop offset="35%"  stopColor="#6878a0"/>
          <stop offset="72%"  stopColor="#3a4860"/>
          <stop offset="100%" stopColor="#1a2030"/>
        </radialGradient>
        <radialGradient id="rwShine" cx="27%" cy="22%" r="52%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.38)"/>
          <stop offset="55%"  stopColor="rgba(255,255,255,0.04)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        <linearGradient id="rwIrid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(56,189,248,0.2)"/>
          <stop offset="28%"  stopColor="rgba(167,243,208,0.14)"/>
          <stop offset="58%"  stopColor="rgba(251,191,36,0.1)"/>
          <stop offset="100%" stopColor="rgba(239,68,68,0.08)"/>
        </linearGradient>
        <clipPath id="rwClip"><path d={arc}/></clipPath>
        <filter id="rwShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.5)"/>
        </filter>
      </defs>
      <path d={arc} fill="none" filter="url(#rwShadow)"/>
      <path d={arc} fill="url(#rwBase)" stroke="#1a2030" strokeWidth="1.5"/>
      <g clipPath="url(#rwClip)">
        {/* Die 격자 색상 */}
        {Array.from({length: GROWS}, (_, ri) =>
          Array.from({length: GCOLS}, (_, ci) => {
            const dx = gx + ci * DW + DW / 2 - cx;
            const dy = gy + ri * DH + DH / 2 - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > R - 5) return null;
            const yld = Math.max(35, 95 - (dist / R) * 52);
            const a = (0.18 + (yld - 35) / 60 * 0.35).toFixed(2);
            const fill = yld > 82
              ? `rgba(14,165,233,${a})` : yld > 68
              ? `rgba(56,189,248,${a})` : yld > 52
              ? `rgba(251,191,36,${a})` : `rgba(239,68,68,${a})`;
            return <rect key={`${ri}-${ci}`} x={gx + ci * DW + 0.5} y={gy + ri * DH + 0.5}
              width={DW - 1} height={DH - 1} fill={fill} rx="0.4"/>;
          })
        )}
        {/* 격자선 */}
        {Array.from({length: GROWS + 1}, (_, i) => (
          <line key={`h${i}`} x1={gx} y1={gy + i * DH} x2={gx + GCOLS * DW} y2={gy + i * DH}
            stroke="rgba(255,255,255,0.14)" strokeWidth="0.4"/>
        ))}
        {Array.from({length: GCOLS + 1}, (_, i) => (
          <line key={`v${i}`} x1={gx + i * DW} y1={gy} x2={gx + i * DW} y2={gy + GROWS * DH}
            stroke="rgba(255,255,255,0.14)" strokeWidth="0.4"/>
        ))}
        <path d={arc} fill="url(#rwIrid)"/>
        <path d={arc} fill="url(#rwShine)"/>
      </g>
      <line x1={lx} y1={fy} x2={rx} y2={fy} stroke="rgba(255,255,255,0.4)" strokeWidth="1.8"/>
      <text x={cx} y={fy + 11} textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.55)" fontFamily="sans-serif">Orientation Flat</text>
      <text x={cx} y={fy + 24} textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b" fontFamily="sans-serif">실물 웨이퍼 (300 mm)</text>
    </svg>
  );
}

// ── Slide 08 ─────────────────────────────────────────────────
function Slide08() {
  return (
    <SlideShell>
      <SlideNumber n={8} />
      <SlideTag label="개념 02" />
      <h2 className="s-title">웨이퍼 맵이란?</h2>
      <div className="s08-layout">

        {/* 좌: 실물 + 맵 (크게) */}
        <div className="s08-compare">
          <div className="s08-vs-row">
            <div className="wm-vs-item">
              <div className="wm-vs-label">실물 웨이퍼 (300 mm)</div>
              <RealWaferSVG />
            </div>
            <div className="s08-arrow">→</div>
            <div className="wm-vs-item">
              <div className="wm-vs-label">웨이퍼 맵</div>
              <div className="wafer-circle-wrap s08-map-wrap">
                <div className="wm-grid">
                  {[
                    [0,0,1,1,1,0,0],
                    [0,1,1,1,1,1,0],
                    [1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1],
                    [0,1,1,1,1,1,0],
                    [0,0,1,1,1,0,0],
                  ].map((row, ri) => row.map((v, ci) => {
                    const dist = Math.sqrt((ri - 3) ** 2 + (ci - 3) ** 2);
                    const yld  = v ? Math.max(40, 98 - dist * 13) : -1;
                    const col  = yld < 0 ? 'transparent'
                      : yld > 88 ? '#0ea5e9' : yld > 72 ? '#38bdf8'
                      : yld > 55 ? '#fbbf24' : '#ef4444';
                    return <div key={`${ri}-${ci}`} className="wm-die"
                      style={{ background: col, visibility: v ? 'visible' : 'hidden' }} />;
                  }))}
                </div>
                <WaferOutline />
              </div>
            </div>
          </div>
          <div className="wm-legend" style={{ justifyContent: 'center' }}>
            {[
              { color: '#0ea5e9', label: '≥90% 정상' },
              { color: '#38bdf8', label: '72–90%' },
              { color: '#fbbf24', label: '55–72% 주의' },
              { color: '#ef4444', label: '<55% 이상' },
            ].map(item => (
              <div className="wm-legend-item" key={item.label}>
                <div className="wm-legend-dot" style={{ background: item.color }}/>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="wm-def" style={{ fontSize: '1.1rem', textAlign: 'center' }}>
            웨이퍼 위 <strong>다이(Die) 하나하나의 수율·불량</strong>을<br />공간 격자 지도로 표현한 시각화
          </p>
        </div>

        {/* 우: 각부 명칭 해부도 */}
        <div className="s08-anatomy">
          <div className="s08-anatomy-title">다이 각부 명칭</div>
          <WaferAnatomySVG />
        </div>

      </div>
    </SlideShell>
  );
}

// ── Slide 09 ─────────────────────────────────────────────────
function Slide09() {
  const grid = Array.from({ length: 9 }, (_, r) =>
    Array.from({ length: 9 }, (_, c) => {
      const dist = Math.sqrt((r - 4) ** 2 + (c - 4) ** 2);
      if (dist > 4.2) return null;
      return Math.max(35, 98 - dist * 13);
    })
  );
  const toCol = (v: number) =>
    v > 88 ? '#0ea5e9' : v > 75 ? '#38bdf8' : v > 60 ? '#fbbf24' : v > 45 ? '#f97316' : '#ef4444';
  return (
    <SlideShell>
      <SlideNumber n={9} />
      <SlideTag label="개념 02 심화" />
      <h2 className="s-title">중심 vs 가장자리 — 수율 구배</h2>
      <div className="gradient-demo">
        <div className="wafer-circle-wrap gd-map-wrap">
          <div className="gd-map">
            {grid.map((row, ri) => row.map((v, ci) => (
              v === null
                ? <div key={`${ri}-${ci}`} className="gd-cell empty" />
                : <div key={`${ri}-${ci}`} className="gd-cell" style={{ background: toCol(v) }} title={`${Math.round(v)}%`} />
            )))}
          </div>
          <WaferOutline />
        </div>
        <div className="gd-legend">
          <div className="gd-legend-title">수율 범례</div>
          {[
            { color: '#0ea5e9', label: '90%+ 정상', sub: '중심 다이 — 가스·온도 균일 구간' },
            { color: '#38bdf8', label: '75–90%', sub: '경계 구간 — 모니터링 필요' },
            { color: '#fbbf24', label: '60–75% 주의', sub: '구배 시작점 — 공정 조건 점검' },
            { color: '#f97316', label: '45–60% 경보', sub: '가장자리 근처 — 타겟 침식 의심' },
            { color: '#ef4444', label: '45% 미만 이상', sub: '극 가장자리 — 즉각 원인 조사' },
          ].map(item => (
            <div className="gd-legend-item" key={item.label}>
              <div className="gd-swatch" style={{ background: item.color }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--fg3)' }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div className="gd-stats">
            <div className="gd-stat">
              <div className="gd-stat-num good">93%</div>
              <div className="gd-stat-label">중심 평균 수율</div>
            </div>
            <div className="gd-stat">
              <div className="gd-stat-num bad">52%</div>
              <div className="gd-stat-label">가장자리 평균</div>
            </div>
          </div>
          <div className="gd-insight">
            <AlertTriangle size={14} color="#f59e0b" />
            <p>중심→가장자리 수율 41%p 하락<br />→ Ar 가스·척 온도 불균일 의심</p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 10 ─────────────────────────────────────────────────
function Slide10() {
  const cells = Array.from({ length: 6 }, (_, r) =>
    Array.from({ length: 10 }, (_, c) => {
      if ((r === 1 && c >= 6) || (r === 2 && c >= 7) || (r === 0 && c === 8)) return 'defect';
      if (r === 2 && c === 5) return 'warn';
      return 'ok';
    })
  );
  return (
    <SlideShell>
      <SlideNumber n={10} />
      <SlideTag label="개념 02 확장" />
      <h2 className="s-title">패널 맵 — 디스플레이 적용</h2>
      <div className="panel-map-wrap">
        <div className="panel-map">
          {cells.map((row, ri) => row.map((type, ci) => (
            <div key={`${ri}-${ci}`} className={`panel-cell ${type}`} title={type === 'defect' ? '불량' : type === 'warn' ? '주의' : '정상'} />
          )))}
        </div>
        <div className="panel-meta">
          <div className="panel-legend">
            <div className="pl-item"><div className="pl-dot ok" />정상 (52셀)</div>
            <div className="pl-item"><div className="pl-dot warn" />주의 (1셀)</div>
            <div className="pl-item"><div className="pl-dot defect" />불량 (7셀)</div>
          </div>
          <div className="panel-insight">
            <Layers size={15} color="#06b6d4" />
            <p>우상단 코너 불량 군집 → 챔버 내 특정 위치 오염원 의심. 쉐도우 마스크 우상단 처짐 가능성 병행 조사.</p>
          </div>
          <div className="panel-stats">
            <div className="panel-stat">
              <div className="ps-num ok">86.7%</div>
              <div className="ps-label">수율</div>
            </div>
            <div className="panel-stat">
              <div className="ps-num defect">7</div>
              <div className="ps-label">불량 셀 수</div>
            </div>
            <div className="panel-stat">
              <div className="ps-num warn">우상단</div>
              <div className="ps-label">군집 위치</div>
            </div>
          </div>
          <div className="panel-action">
            <Target size={15} color="#4338ca" />
            <p>불량 군집이 코너에 집중 → <strong>증착원 각도 편차</strong> or <strong>마스크 처짐</strong> 중 어느 쪽인지 Process_Step별 맵 비교로 확인</p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 11 ─────────────────────────────────────────────────
function Slide11() {
  const patterns = [
    {
      label: '점(Dot) 군집',
      cause: '파티클, 국소 오염',
      example: '예) PVD 타겟 이물질 → 4~6 다이 동시 불량',
      cells: [
        ['ok','ok','ok','ok','ok','ok'],
        ['ok','ok','hi','hi','ok','ok'],
        ['ok','hi','hi','hi','hi','ok'],
        ['ok','hi','hi','hi','hi','ok'],
        ['ok','ok','hi','hi','ok','ok'],
        ['ok','ok','ok','ok','ok','ok'],
      ],
    },
    {
      label: '선(Line) 군집',
      cause: '스크래치, 반송계 접촉',
      example: '예) 반송 레일 마모 → 1열 전체 저항 상승',
      cells: [
        ['ok','ok','ok','ok','ok','ok'],
        ['ok','ok','ok','ok','ok','ok'],
        ['hi','hi','hi','hi','hi','hi'],
        ['hi','hi','hi','hi','hi','hi'],
        ['ok','ok','ok','ok','ok','ok'],
        ['ok','ok','ok','ok','ok','ok'],
      ],
    },
    {
      label: '띠(Band) 군집',
      cause: '공정 불균일, 가스 구배',
      example: '예) Ar 구배 → 가장자리 수율 60%↓',
      cells: [
        ['ok','ok','ok','warn','hi','hi'],
        ['ok','ok','ok','warn','hi','hi'],
        ['ok','ok','ok','warn','hi','hi'],
        ['ok','ok','ok','warn','hi','hi'],
        ['ok','ok','ok','warn','hi','hi'],
        ['ok','ok','ok','warn','hi','hi'],
      ],
    },
  ];
  return (
    <SlideShell>
      <SlideNumber n={11} />
      <SlideTag label="개념 03" />
      <h2 className="s-title">공간적 군집 (Spatial Cluster)</h2>
      <div className="cluster-wrap">
        <div className="cluster-def">
          <p>"같은 구역에 불량이 <strong>몰릴수록</strong><br />설비·재료 원인일 가능성이 높다"</p>
        </div>
        <div className="cluster-types">
          {patterns.map(t => (
            <div className="cluster-type-card" key={t.label}>
              <div className="wafer-circle-wrap ct-map-wrap">
                <div className="ct-mini-map" style={{ gridTemplateColumns: 'repeat(6,1fr)' }}>
                  {t.cells.flat().map((cls, i) => (
                    <div key={i} className={`ct-mp-cell ${cls}`} />
                  ))}
                </div>
                <WaferOutline />
              </div>
              <strong>{t.label}</strong>
              <span>{t.cause}</span>
              <div className="ct-example">{t.example}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 12 ─────────────────────────────────────────────────
function Slide12() {
  return (
    <SlideShell>
      <SlideNumber n={12} />
      <SlideTag label="개념 03 심화" />
      <h2 className="s-title">패턴을 보면 원인이 보인다</h2>
      <div className="pattern-table">
        {[
          { pattern: '중심 > 가장자리', cause: '가스·온도 불균일 (PVD, CVD)', domain: '반도체' },
          { pattern: '가장자리 > 중심', cause: '척 클램핑 불량, 온도 구배', domain: '반도체' },
          { pattern: '특정 열 반복', cause: '노즐 막힘, 슬롯다이 결함', domain: '디스플레이' },
          { pattern: '대각선 띠', cause: '기판 이송 각도 불량', domain: '디스플레이' },
          { pattern: '폭방향 편차', cause: '슬롯다이 갭 불균일, 슬러리 점도 변화', domain: '2차전지' },
          { pattern: '길이방향 주기', cause: '노즐 공급 주기, 반송 떨림', domain: '2차전지' },
          { pattern: '균일 분산', cause: '공정 변수 외 원재료·장비 에이징', domain: '공통' },
        ].map(row => (
          <div className="pt-row" key={row.pattern}>
            <div className="pt-pattern">{row.pattern}</div>
            <ArrowRight size={13} color="#475569" />
            <div className="pt-cause">{row.cause}</div>
            <div className="pt-domain">{row.domain}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── 공정 일러스트 SVG 컴포넌트 ──────────────────────────────
function PVDChamberSVG() {
  return (
    <svg className="process-svg" viewBox="0 0 260 168" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="pvdArr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L0,5 L5,2.5 z" fill="rgba(251,191,36,0.9)"/>
        </marker>
      </defs>
      {/* 진공 챔버 외벽 */}
      <rect x="4" y="4" width="252" height="160" rx="8" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <text x="130" y="90" textAnchor="middle" fill="rgba(255,255,255,0.14)" fontSize="11" fontStyle="italic">진공 챔버 (10⁻⁶ Pa)</text>
      {/* 타겟 */}
      <rect x="28" y="14" width="200" height="18" rx="3" fill="rgba(255,255,255,0.9)"/>
      <text x="128" y="27" textAnchor="middle" fill="#0c4a6e" fontSize="9.5" fontWeight="700">타겟 Target (Ti / Al / TiN)</text>
      <text x="242" y="27" fill="rgba(255,255,255,0.75)" fontSize="8.5" fontWeight="700">RF~</text>
      {/* Ar+ 이온 */}
      {([65,100,128,156,193] as number[]).map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="68" r="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
          <text x={x} y="72" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7.5" fontWeight="600">Ar⁺</text>
        </g>
      ))}
      {/* 스퍼터 입자 화살표 */}
      {([55,78,102,128,152,178,202] as number[]).map((x, i) => (
        <line key={i} className="pvd-particle" x1={x} y1="36" x2={x + (i % 2 === 0 ? -2 : 2)} y2="136"
          stroke="rgba(251,191,36,0.65)" strokeWidth="1.5" markerEnd="url(#pvdArr)"/>
      ))}
      {/* 증착막 */}
      <rect x="28" y="138" width="200" height="6" rx="2" fill="rgba(251,191,36,0.45)"/>
      {/* 웨이퍼 기판 */}
      <rect x="28" y="144" width="200" height="14" rx="3" fill="rgba(255,255,255,0.88)"/>
      <text x="128" y="155" textAnchor="middle" fill="#0c4a6e" fontSize="9.5" fontWeight="700">웨이퍼 기판</text>
    </svg>
  );
}

function OLEDEvapSVG() {
  return (
    <svg className="process-svg" viewBox="0 0 260 168" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="oledArr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,5 L2.5,0 L5,5 z" fill="rgba(167,243,208,0.9)"/>
        </marker>
      </defs>
      {/* 진공 챔버 */}
      <rect x="4" y="4" width="252" height="160" rx="8" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <text x="130" y="90" textAnchor="middle" fill="rgba(255,255,255,0.14)" fontSize="11" fontStyle="italic">고진공 챔버 (10⁻⁷ Pa)</text>
      {/* 유리 기판 */}
      <rect x="20" y="14" width="220" height="11" rx="2" fill="rgba(255,255,255,0.88)"/>
      <text x="130" y="23" textAnchor="middle" fill="#0c4a6e" fontSize="9" fontWeight="700">유리 기판 · 쉐도우 마스크</text>
      {/* 형성 중인 유기물 발광층 */}
      <rect x="20" y="25" width="220" height="8" rx="2" fill="rgba(167,243,208,0.5)"/>
      <text x="130" y="46" textAnchor="middle" fill="rgba(167,243,208,0.9)" fontSize="8.5">발광층 EML 형성 중</text>
      {/* 증발 기체 화살표 */}
      {([55,82,108,130,152,178,205] as number[]).map((x, i) => (
        <line key={i} className="oled-vapor" x1={x} y1="118" x2={x + (i % 2 === 0 ? -4 : 4)} y2="35"
          stroke="rgba(167,243,208,0.6)" strokeWidth="1.5" markerEnd="url(#oledArr)"/>
      ))}
      {/* 증발원 A */}
      <ellipse cx="70" cy="138" rx="32" ry="11" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.65)" strokeWidth="1.5"/>
      <text x="70" y="141" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="8.5" fontWeight="600">증발원 A (HTL)</text>
      {/* 증발원 B */}
      <ellipse cx="190" cy="138" rx="32" ry="11" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.65)" strokeWidth="1.5"/>
      <text x="190" y="141" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="8.5" fontWeight="600">증발원 B (EML)</text>
      {/* 열 파동 */}
      {([56,66,76,186,196,206] as number[]).map((x, i) => (
        <path key={i} d={`M${x},124 Q${x+3},117 ${x+6},124`} fill="none" stroke="rgba(251,191,36,0.55)" strokeWidth="1.2"/>
      ))}
    </svg>
  );
}

function SlotDieSVG() {
  return (
    <svg className="process-svg" viewBox="0 0 260 168" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="sdArr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,5 L2.5,0 L5,5 z" fill="rgba(134,239,172,0.9)"/>
        </marker>
        <marker id="moveArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.65)"/>
        </marker>
      </defs>
      {/* 집전체 기판 */}
      <rect x="8" y="118" width="244" height="15" rx="2" fill="rgba(255,255,255,0.88)"/>
      <text x="130" y="129" textAnchor="middle" fill="#0c4a6e" fontSize="9.5" fontWeight="700">집전체 (Al-foil / Cu-foil)</text>
      {/* 코팅 완료 구간 */}
      <rect x="8" y="100" width="148" height="18" rx="2" fill="rgba(134,239,172,0.55)"/>
      <text x="76" y="113" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8.5" fontWeight="600">코팅 완료 (활물질)</text>
      {/* 편차 발생 구간 */}
      <rect x="124" y="100" width="32" height="18" rx="1" fill="rgba(239,68,68,0.45)" stroke="rgba(239,68,68,0.8)" strokeWidth="1.5"/>
      <text x="140" y="113" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700">편차↑</text>
      {/* 슬롯다이 헤드 */}
      <rect x="136" y="30" width="84" height="58" rx="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
      <text x="178" y="57" textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="9.5" fontWeight="700">슬롯다이</text>
      <text x="178" y="70" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8.5">헤드</text>
      {/* 슬롯 갭 */}
      <line x1="146" y1="88" x2="210" y2="88" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      {/* 슬러리 유출 화살표 */}
      {([152,164,176,188,200] as number[]).map((x, i) => (
        <line key={i} x1={x} y1="90" x2={x} y2="101" stroke="rgba(134,239,172,0.8)" strokeWidth="2" markerEnd="url(#sdArr)"/>
      ))}
      {/* 슬러리 공급관 */}
      <line x1="178" y1="30" x2="178" y2="12" stroke="rgba(255,255,255,0.45)" strokeWidth="3"/>
      <text x="178" y="10" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="8.5">슬러리 공급</text>
      {/* 기판 이송 방향 */}
      <line x1="16" y1="148" x2="122" y2="148" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" markerEnd="url(#moveArr)"/>
      <text x="66" y="162" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8.5">기판 이송 방향 →</text>
    </svg>
  );
}

// ── Slide 13 ─────────────────────────────────────────────────
function Slide13() {
  return (
    <SlideShell accent>
      <div className="case-open-new">
        <div className="case-badge-new"><Cpu size={16} /> Case 01 · 반도체 PVD 스퍼터링</div>
        <div className="case-open-body">
          <div className="cop-text">
            <div className="cop-proc-name">물리 기상 증착 (PVD · Sputtering)</div>
            <p className="cop-proc-desc">아르곤(Ar⁺) 이온으로 타겟 금속을 물리적으로 이탈·증착해 배선막을 형성. CVD와 달리 화학반응 없이 저온 증착 가능. Al·Ti·TiN 배선층과 장벽층에 광범위하게 사용됩니다.</p>
            <div className="cop-params">
              <span>진공: 10⁻⁶ Pa</span><span>RF 파워: 1~20 kW</span><span>Ar 유량: 20~60 sccm</span>
            </div>
          </div>
          <PVDChamberSVG />
        </div>
        <div className="case-problem">
          <strong>분석 과제:</strong> 스퍼터링 후 가장자리 다이 시트 저항이 웨이퍼 중심 대비 평균 +12% 높음. 타겟 침식 불균일인지 Ar 가스 압력 구배 때문인지 빠르게 특정해야 한다.
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 14 ─────────────────────────────────────────────────
function Slide14() {
  return (
    <SlideShell>
      <SlideNumber n={14} />
      <SlideTag label="Case 01 · BEFORE" />
      <h2 className="s-title">기존 방식의 한계</h2>
      <div className="before-box">
        {[
          '스퍼터링 후 웨이퍼 저항 측정 결과 파일 열기 (Lot당 1개)',
          '다이 좌표(X, Y)로 위치 확인 후 저항 이상 셀 수작업 표시',
          'Edge 다이와 Center 다이 저항을 따로 계산해 차이 비교',
          '여러 Lot 비교하려면 파일을 따로 열어 수치를 눈으로 대조',
        ].map((s, i) => (
          <div className="bb-step" key={i}><span>{i + 1}</span><p>{s}</p></div>
        ))}
        <div className="bb-pain">
          <AlertTriangle size={16} color="#ef4444" />
          <p>10 Lot 비교 = 2~3시간. 가장자리·중심 패턴은 여전히 주관적 판단.</p>
        </div>
      </div>
      <div className="time-compare">
        <div className="tc-label">Lot 10개 분석 소요 시간 비교</div>
        <div className="tc-row">
          <div className="tc-name">기존 엑셀</div>
          <div className="tc-bar-wrap"><div className="tc-bar old" style={{ width: '100%' }}><span>2~3시간 소요</span></div></div>
          <div className="tc-val old">2~3h</div>
        </div>
        <div className="tc-row">
          <div className="tc-name">AI 히트맵</div>
          <div className="tc-bar-wrap"><div className="tc-bar new" style={{ width: '5%' }}><span></span></div></div>
          <div className="tc-val new">4분</div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 15 ─────────────────────────────────────────────────
function Slide15() {
  const prompt = `나는 반도체 PVD 스퍼터링 공정에서 웨이퍼 저항 편차를 분석하고 싶다.

입력 데이터: wafer_resistance.csv
컬럼 구성: Lot_ID, Wafer_ID, Die_X, Die_Y, SheetResistance_mohm
분석 기간: 최근 30일, 10개 Lot

요청 사항:
1. Die_X / Die_Y 좌표로 웨이퍼 저항 히트맵을 그려줘
2. 저항 목표값 ±5% 초과 다이는 빨간색으로 강조해줘
3. Lot별로 가장자리 vs 중심 저항 평균을 비교해줘
4. 공간적 이상 군집 위치와 원인 후보 3가지를 요약해줘
5. 결과물은 인터랙티브 HTML 파일로 만들어줘`;
  const { copied, copy } = useCopy(prompt);
  return (
    <SlideShell>
      <SlideNumber n={15} />
      <SlideTag label="Case 01 · PROMPT" />
      <h2 className="s-title">작업지시서</h2>
      <div className="prompt-block">
        <div className="pb-header">
          <span>작업지시서</span>
          <button className={`pb-copy${copied ? ' copied' : ''}`} onClick={copy}>
            {copied ? <><Check size={14} /> 복사됨</> : <><Copy size={14} /> 복사</>}
          </button>
        </div>
        <pre>{prompt}</pre>
      </div>
    </SlideShell>
  );
}

// ── Slide 16 ─────────────────────────────────────────────────
function Slide16() {
  const wafer = [
    [0,0,1,1,1,0,0],
    [0,1,1,1,1,1,0],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0],
  ];
  const cellColor = (r: number, c: number) => {
    const dist = Math.sqrt((r - 3) ** 2 + (c - 3) ** 2);
    if (dist > 2.8) return '#ef4444';
    if (dist > 1.8) return '#fbbf24';
    return '#0ea5e9';
  };
  return (
    <SlideShell>
      <SlideNumber n={16} />
      <SlideTag label="Case 01 · AFTER" />
      <h2 className="s-title">AI가 만들어 준 결과</h2>
      <div className="ar-split">
        <div className="ar-list">
          {[
            '웨이퍼 저항 히트맵 HTML — 마우스 올리면 다이 좌표·저항값 표시',
            '가장자리 평균 128 mΩ/□ vs 중심 평균 112 mΩ/□ — 구배 명확',
            '원인 후보 ① 타겟 엣지 침식(race-track 마모) ② Ar 압력 구배 ③ 기판 온도 분포 차이',
            'Lot별 비교 차트 — 7주차부터 가장자리 저항 상승 트렌드 확인',
          ].map((t, i) => (
            <div className="ar-item" key={i}>
              <CheckCircle2 size={18} color="#10b981" />
              <p>{t}</p>
            </div>
          ))}
          <div className="after-time">
            <Zap size={16} color="#f59e0b" />
            <span>작업지시서 입력 후 <strong>4분 만에</strong> 완성 — 기존 대비 30배 이상 빠름</span>
          </div>
        </div>
        <div className="ar-mini-viz">
          <div className="arv-title">웨이퍼 저항 히트맵</div>
          <div className="arv-grid" style={{ gridTemplateColumns: 'repeat(7,1fr)' }}>
            {wafer.map((row, ri) => row.map((v, ci) => (
              <div key={`${ri}-${ci}`} className="arv-cell"
                style={{ background: v ? cellColor(ri, ci) : 'transparent' }} />
            )))}
          </div>
          <div className="arv-legend">
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#0ea5e9' }} /><span className="arv-leg-label">중심 정상 (112 mΩ)</span></div>
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#fbbf24' }} /><span className="arv-leg-label">경계 구간</span></div>
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#ef4444' }} /><span className="arv-leg-label">가장자리 이상 (128 mΩ)</span></div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 17 ─────────────────────────────────────────────────
function Slide17() {
  return (
    <SlideShell>
      <SlideNumber n={17} />
      <SlideTag label="Case 01 · 검증 포인트" />
      <h2 className="s-title">엔지니어가 확인해야 할 것</h2>
      <div className="verify-list">
        {[
          'AI가 찾은 가장자리 이상 구역이 타겟 race-track 침식 위치와 일치하는가?',
          '해당 Lot의 PVD 챔버 타겟 누적 전력(kWh)과 저항 상승 시점이 겹치는가?',
          '동일 챔버 처리 다른 제품·레이어에서도 같은 가장자리 패턴이 나타나는가?',
          'Lot별 가장자리/중심 저항 비율 트렌드가 타겟 교체 후 개선되는가?',
        ].map((p, i) => (
          <div className="verify-item" key={i}>
            <span className="vi-num">{i + 1}</span>
            <p>{p}</p>
          </div>
        ))}
      </div>
      <div className="verify-principle">
        <Target size={16} color="#6366f1" />
        <p>AI는 패턴을 찾아준다. 원인을 <strong>확정</strong>하는 것은 공정 이력을 아는 엔지니어다.</p>
      </div>
    </SlideShell>
  );
}

// ── Slide 18 ─────────────────────────────────────────────────
function Slide18() {
  return (
    <SlideShell accent>
      <div className="case-open-new">
        <div className="case-badge-new"><Monitor size={16} /> Case 02 · 디스플레이 OLED 증착</div>
        <div className="case-open-body">
          <div className="cop-text">
            <div className="cop-proc-name">OLED 유기물 진공 증착 공정</div>
            <p className="cop-proc-desc">고진공 챔버에서 유기 발광 재료를 가열·증발시켜 유리 기판 위에 EML(발광층)·HTL(정공수송층)을 수 nm 단위로 정밀 적층. 쉐도우 마스크로 RGB 픽셀 패턴을 정의합니다.</p>
            <div className="cop-params">
              <span>진공: 10⁻⁷ Pa</span><span>증착률: 0.1~1 Å/s</span><span>두께: 수십 nm</span>
            </div>
          </div>
          <OLEDEvapSVG />
        </div>
        <div className="case-problem">
          <strong>분석 과제:</strong> 유기물 증착 후 패널 하단(Y: 0~80 mm) 구간에서 휘도 편차 ±15% 이상 반복 발생. 증발원 각도 편차인지, 쉐도우 마스크 처짐인지 원인을 빠르게 특정해야 한다.
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 19 ─────────────────────────────────────────────────
function Slide19() {
  return (
    <SlideShell>
      <SlideNumber n={19} />
      <SlideTag label="Case 02 · BEFORE" />
      <h2 className="s-title">기존 방식의 한계</h2>
      <div className="before-box">
        {[
          '휘도 측정기 출력을 Excel에 패널 좌표별로 수작업 입력',
          '패널 중심 기준 편차(%) 수식을 행·열별로 따로 계산',
          '조건부 서식으로 편차 초과 구역 색칠 — 수백 셀 수작업',
          '증착 단계별(EML/HTL/ETL) 패널을 따로 만들어 눈으로 비교',
        ].map((s, i) => (
          <div className="bb-step" key={i}><span>{i + 1}</span><p>{s}</p></div>
        ))}
        <div className="bb-pain">
          <AlertTriangle size={16} color="#ef4444" />
          <p>50장 패널 분석 = 반나절. 증착 단계별 비교는 다음 날로 미뤄짐.</p>
        </div>
      </div>
      <div className="time-compare">
        <div className="tc-label">패널 50장 분석 소요 시간 비교</div>
        <div className="tc-row">
          <div className="tc-name">기존 엑셀</div>
          <div className="tc-bar-wrap"><div className="tc-bar old" style={{ width: '100%' }}><span>반나절 (4~6시간)</span></div></div>
          <div className="tc-val old">4~6h</div>
        </div>
        <div className="tc-row">
          <div className="tc-name">AI 히트맵</div>
          <div className="tc-bar-wrap"><div className="tc-bar new" style={{ width: '3%' }}><span></span></div></div>
          <div className="tc-val new">4분</div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 20 ─────────────────────────────────────────────────
function Slide20() {
  const prompt = `나는 OLED 디스플레이 유기물 증착 공정에서 패널 휘도 편차를 분석하고 싶다.

입력 데이터: oled_luminance.csv
컬럼: Panel_ID, Process_Step, X_mm, Y_mm, Luminance_cdm2, Uniformity_pct

요청 사항:
1. X_mm / Y_mm 좌표로 패널 휘도 분포 히트맵을 그려줘
2. 패널 중심 대비 ±10% 초과 구역을 빨간색으로 강조해줘
3. Process_Step별로 분포 맵을 분리해서 비교해줘
4. 균일도(Uniformity%) 하위 패널 10개를 순위표로 보여줘
5. 이상 구역 위치 패턴과 원인 후보 3가지를 요약해줘
6. 결과를 HTML 대시보드로 만들어줘`;
  const { copied, copy } = useCopy(prompt);
  return (
    <SlideShell>
      <SlideNumber n={20} />
      <SlideTag label="Case 02 · PROMPT" />
      <h2 className="s-title">작업지시서</h2>
      <div className="prompt-block">
        <div className="pb-header">
          <span>작업지시서</span>
          <button className={`pb-copy${copied ? ' copied' : ''}`} onClick={copy}>
            {copied ? <><Check size={14} /> 복사됨</> : <><Copy size={14} /> 복사</>}
          </button>
        </div>
        <pre>{prompt}</pre>
      </div>
    </SlideShell>
  );
}

// ── Slide 21 ─────────────────────────────────────────────────
function Slide21() {
  const panelRows = 8;
  const panelCols = 6;
  const panelColor = (r: number) => {
    const yFromBottom = panelRows - 1 - r;
    if (yFromBottom <= 1) return '#ef4444';
    if (yFromBottom === 2) return '#fbbf24';
    return '#0ea5e9';
  };
  return (
    <SlideShell>
      <SlideNumber n={21} />
      <SlideTag label="Case 02 · AFTER + 검증" />
      <h2 className="s-title">결과 & 엔지니어 검증</h2>
      <div className="ar-split">
        <div className="ar-list">
          {[
            '증착 단계별 휘도 분포 맵 — EML 후 하단 Y:0~80mm 구간 휘도 저하 집중',
            '하단 구간 균일도 평균 73% — 목표(±10%) 미달 12매 / 50매',
            '원인 후보: ① 증발원 B 각도 편차 ② 쉐도우 마스크 하단 처짐 ③ 기판 하단 온도 구배',
            '4분 만에 완성 — 기존 수작업 반나절 대비 약 30배 빠름',
          ].map((t, i) => (
            <div className="ar-item" key={i}><CheckCircle2 size={18} color="#10b981" /><p>{t}</p></div>
          ))}
          <div className="verify-list compact">
            {[
              'AI가 찾은 하단 편차 구역이 증발원 B 방향 벡터와 일치하는가?',
              '쉐도우 마스크 재설치 후 동일 구간 균일도가 개선되었는가?',
              '동일 증착 챔버의 다른 로트에서도 하단 패턴이 반복되는가?',
            ].map((p, i) => (
              <div className="verify-item" key={i}><span className="vi-num">{i + 1}</span><p>{p}</p></div>
            ))}
          </div>
        </div>
        <div className="ar-mini-viz">
          <div className="arv-title">패널 휘도 분포 맵</div>
          <div className="arv-grid" style={{ gridTemplateColumns: `repeat(${panelCols},1fr)` }}>
            {Array.from({ length: panelRows }, (_, r) =>
              Array.from({ length: panelCols }, (_, c) => (
                <div key={`${r}-${c}`} className="arv-cell" style={{ background: panelColor(r) }} />
              ))
            )}
          </div>
          <div className="arv-legend">
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#0ea5e9' }} /><span className="arv-leg-label">정상 휘도 (±5%)</span></div>
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#fbbf24' }} /><span className="arv-leg-label">주의 구간 (±10%)</span></div>
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#ef4444' }} /><span className="arv-leg-label">하단 편차 집중</span></div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 22 ─────────────────────────────────────────────────
function Slide22() {
  return (
    <SlideShell accent>
      <div className="case-open-new">
        <div className="case-badge-new"><Battery size={16} /> Case 03 · 2차전지 전극 공정</div>
        <div className="case-open-body">
          <div className="cop-text">
            <div className="cop-proc-name">슬롯다이 코팅 공정 (Slot-Die Coating)</div>
            <p className="cop-proc-desc">미세 슬롯으로 전극 슬러리(활물질+바인더+도전재)를 집전체 위에 균일하게 도포하는 핵심 공정. 코팅 두께·저항 균일성이 배터리 용량·사이클 수명에 직결됩니다.</p>
            <div className="cop-params">
              <span>코팅 속도: 20~80 m/min</span><span>슬롯 갭: 50~200 μm</span><span>폭: 300~700 mm</span>
            </div>
          </div>
          <SlotDieSVG />
        </div>
        <div className="case-problem">
          <strong>분석 과제:</strong> 전극 코팅 후 폭 방향 520~580 mm 구간에서 저항 편차 집중 발생. 슬롯다이 노즐 막힘인지, 슬러리 점도 문제인지 빠르게 판단해야 한다.
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 23 ─────────────────────────────────────────────────
function Slide23() {
  const prompt = `나는 2차전지 전극 코팅 공정에서 저항 편차를 분석하고 싶다.

입력: coating_resistance.csv
컬럼: Roll_ID, X_mm, Y_mm, Resistance_mohm, Line_Speed

요청:
1. X/Y 좌표로 저항 분포 히트맵을 그려줘 (폭 600mm 기준)
2. 저항 목표값 ±5% 초과 구역을 강조해줘
3. 폭 방향 위치별 평균 저항을 선그래프로 추가해줘
4. 반복 패턴이 있으면 패턴 주기와 원인 후보를 알려줘`;
  const { copied, copy } = useCopy(prompt);
  return (
    <SlideShell>
      <SlideNumber n={23} />
      <SlideTag label="Case 03 · BEFORE + PROMPT" />
      <h2 className="s-title">기존 방식 → 작업지시서</h2>
      <div className="split-slide">
        <div className="ss-before">
          <div className="ss-label bad">BEFORE</div>
          {['저항 측정기 출력 데이터를 Excel로 가져오기', '폭 방향 위치별로 평균 수작업 계산'].map((s, i) => (
            <div className="bb-step" key={i}><span>{i + 1}</span><p>{s}</p></div>
          ))}
          <div className="bb-pain"><AlertTriangle size={14} color="#ef4444" /><p>Roll 하나 분석에 1시간+</p></div>
        </div>
        <div className="ss-prompt">
          <div className="ss-label good">PROMPT</div>
          <div className="prompt-block small">
            <div className="pb-header">
              <span>작업지시서</span>
              <button className={`pb-copy${copied ? ' copied' : ''}`} onClick={copy}>
                {copied ? <><Check size={12} /> 복사됨</> : <><Copy size={12} /> 복사</>}
              </button>
            </div>
            <pre>{prompt}</pre>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 24 ─────────────────────────────────────────────────
function Slide24() {
  const stripCols = 10;
  const stripRows = 4;
  const stripColor = (c: number) => {
    if (c === 5 || c === 6) return '#ef4444';
    if (c === 4 || c === 7) return '#fbbf24';
    return '#0ea5e9';
  };
  return (
    <SlideShell>
      <SlideNumber n={24} />
      <SlideTag label="Case 03 · AFTER + 검증" />
      <h2 className="s-title">결과 & 엔지니어 검증</h2>
      <div className="ar-split">
        <div className="ar-list">
          {[
            '폭 방향 520–580mm 구간에 저항 편차 집중 — 슬롯다이 끝단 막힘 패턴',
            '길이 방향 주기성 없음 → 슬러리 점도 문제 가능성 낮음',
            '원인 후보: ① 슬롯다이 엣지 노즐 막힘 ② 코팅 갭 틀어짐',
            '3분 만에 분석 완성 — Roll 1개 기존 1시간+ 대비 약 20배 빠름',
          ].map((t, i) => (
            <div className="ar-item" key={i}><CheckCircle2 size={18} color="#10b981" /><p>{t}</p></div>
          ))}
          <div className="verify-list compact">
            {[
              'AI가 찾은 520–580mm 구간이 실제 슬롯다이 노즐 위치와 일치하는가?',
              '슬롯다이 세정 후 동일 구간 편차가 개선되었는가?',
              'Roll 속도(Line_Speed) 변경 전후 패턴이 달라지는지 확인했는가?',
            ].map((p, i) => (
              <div className="verify-item" key={i}><span className="vi-num">{i + 1}</span><p>{p}</p></div>
            ))}
          </div>
        </div>
        <div className="ar-mini-viz">
          <div className="arv-title">전극 저항 히트맵 (폭 방향)</div>
          <div className="arv-grid" style={{ gridTemplateColumns: `repeat(${stripCols},1fr)` }}>
            {Array.from({ length: stripRows }, (_, r) =>
              Array.from({ length: stripCols }, (_, c) => (
                <div key={`${r}-${c}`} className="arv-cell" style={{ background: stripColor(c), aspectRatio: '0.6' }} />
              ))
            )}
          </div>
          <div className="arv-note">← 0mm · · · 600mm →<br />col 5~6 = 520~580mm 편차</div>
          <div className="arv-legend">
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#0ea5e9' }} /><span className="arv-leg-label">정상 저항</span></div>
            <div className="arv-leg-row"><div className="arv-leg-dot" style={{ background: '#ef4444' }} /><span className="arv-leg-label">막힘 구간 (편차↑)</span></div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 25 ─────────────────────────────────────────────────
function Slide25() {
  return (
    <SlideShell>
      <SlideNumber n={25} />
      <SlideTag label="작업지시서 설계" />
      <h2 className="s-title">히트맵 작업지시서 5요소</h2>
      <div className="five-items">
        {[
          { n: '01', label: '문제', desc: '어떤 공정/장비/데이터에서 발생했는가?', ex: 'PVD 후 가장자리 저항 +12% 상승 의심' },
          { n: '02', label: '데이터', desc: '파일 형식, 컬럼, 단위, 기간', ex: 'wafer_resistance.csv · 30일 · 10 Lot' },
          { n: '03', label: '기준', desc: '정상/이상 판정 기준값, spec', ex: '목표값 ±5% 초과 = 이상 다이' },
          { n: '04', label: '산출물', desc: '히트맵, 대시보드, 비교 차트 등', ex: 'HTML 히트맵 + Lot별 가장자리/중심 비교표' },
          { n: '05', label: '검증', desc: '엔지니어가 다시 확인해야 할 리스크', ex: '타겟 race-track 침식 위치 일치 여부' },
        ].map(item => (
          <div className="fi-item" key={item.n}>
            <span className="fi-num">{item.n}</span>
            <strong>{item.label}</strong>
            <p>{item.desc}</p>
            <div className="fi-example">{item.ex}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 26 ─────────────────────────────────────────────────
function Slide26() {
  return (
    <SlideShell>
      <SlideNumber n={26} />
      <SlideTag label="작업지시서 비교 — 나쁜 예" />
      <h2 className="s-title">이렇게 하면 AI가 역질문만 한다</h2>
      <div className="bad-prompt-box">
        <div className="bpb-prompt">
          <span>입력한 프롬프트</span>
          <p className="bpb-text">"수율 데이터 히트맵으로 그려줘"</p>
        </div>
        <ArrowRight size={20} color="#475569" />
        <div className="bpb-response">
          <span>AI 응답</span>
          <div className="ai-questions">
            {['어떤 파일 형식인가요?', '컬럼 구성이 어떻게 되나요?', 'X/Y 좌표 컬럼 이름은?', '이상 판정 기준값은?', '결과물 형태는?'].map(q => (
              <p key={q}>• {q}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="bad-lesson">
        <AlertTriangle size={16} color="#f59e0b" />
        <p>5요소 중 하나라도 빠지면 AI와 대화만 3~5번 더 해야 한다.</p>
      </div>
    </SlideShell>
  );
}

// ── Slide 27 ─────────────────────────────────────────────────
function Slide27() {
  return (
    <SlideShell>
      <SlideNumber n={27} />
      <SlideTag label="작업지시서 비교 — 좋은 예" />
      <h2 className="s-title">5요소가 모두 있으면 즉시 실행된다</h2>
      <div className="good-prompt-box">
        {[
          { tag: '문제', text: 'PVD 스퍼터링 후 웨이퍼 가장자리 저항 상승 의심' },
          { tag: '데이터', text: 'wafer_resistance.csv — Die_X, Die_Y, SheetResistance_mohm' },
          { tag: '기준', text: '저항 목표값 ±5% 초과 = 이상 판정' },
          { tag: '산출물', text: '인터랙티브 히트맵 HTML + Lot별 가장자리/중심 비교표' },
          { tag: '검증', text: '원인 후보 3가지 + 엔지니어 확인 질문 목록' },
        ].map(e => (
          <div className="gpb-elem" key={e.tag}>
            <span className="gpb-tag">{e.tag}</span>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
      <div className="good-result">
        <CheckCircle2 size={16} color="#10b981" />
        <p>→ AI가 바로 코드 생성 시작. 역질문 0회.</p>
      </div>
    </SlideShell>
  );
}

// ── Slide 28 ─────────────────────────────────────────────────
function Slide28() {
  const templates = [
    {
      domain: '반도체',
      icon: <Cpu size={14} />,
      text: `나는 반도체 [공정명] 공정에서 [웨이퍼/다이] 수율 데이터를 분석하고 싶다.
입력: [파일명].csv — Die_X, Die_Y, Yield(%), Lot_ID
기준: 수율 [N]% 미만 = 이상
요청: 인터랙티브 웨이퍼 히트맵 + 가장자리/중심 비교 + 원인 후보 3가지`,
    },
    {
      domain: '디스플레이',
      icon: <Monitor size={14} />,
      text: `나는 디스플레이 [공정명] 공정에서 패널 불량 위치를 분석하고 싶다.
입력: [파일명].csv — Panel_ID, X_pos, Y_pos, Defect_Type
기준: 군집 3개 이상 구역 강조
요청: 공정 단계별 분포맵 + 군집 구역 표시 + 원인 후보`,
    },
    {
      domain: '2차전지',
      icon: <Battery size={14} />,
      text: `나는 전극 코팅 공정에서 저항 편차를 분석하고 싶다.
입력: [파일명].csv — X_mm, Y_mm, Resistance_mohm
기준: 목표값 ±[N]% 초과 = 이상
요청: 저항 히트맵 + 폭 방향 평균 선그래프 + 반복 패턴 분석`,
    },
  ];
  return (
    <SlideShell>
      <SlideNumber n={28} />
      <SlideTag label="도메인별 작업지시서 템플릿" />
      <h2 className="s-title">바로 복사해서 쓰세요</h2>
      <div className="template-cards">
        {templates.map(t => {
          const { copied, copy } = useCopy(t.text);
          return (
            <div className="template-card" key={t.domain}>
              <div className="tc-header">
                {t.icon}<span>{t.domain}</span>
                <button className={`pb-copy${copied ? ' copied' : ''}`} onClick={copy}>
                  {copied ? <><Check size={12} /> 복사됨</> : <><Copy size={12} /> 복사</>}
                </button>
              </div>
              <pre>{t.text}</pre>
            </div>
          );
        })}
      </div>
    </SlideShell>
  );
}

// ── Slide 29 ─────────────────────────────────────────────────
function Slide29() {
  return (
    <SlideShell accent>
      <div className="lab-opening">
        <div className="lab-badge"><Play size={18} /> 실습</div>
        <h2>Antigravity로<br />지금 바로 만들어봅시다</h2>
        <div className="lab-steps">
          {[
            'Antigravity 실행 — 새 프로젝트 열기',
            '슬라이드 28의 템플릿을 본인 도메인에 맞게 수정 후 붙여넣기',
            '코드 생성 → 실행 → 결과물 확인',
            '완성 후 슬라이드 30으로 돌아와서 검증 체크',
          ].map((s, i) => (
            <div className="lab-step" key={i}>
              <span>{i + 1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 30 ─────────────────────────────────────────────────
function Slide30() {
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const toggle = (i: number) => setChecks(prev => prev.map((v, idx) => idx === i ? !v : v));
  const items = [
    '히트맵이 화면에 표시되고 마우스 호버 시 값이 보이는가?',
    '이상 구역이 지정한 기준값 기반으로 올바르게 강조되는가?',
    '공간적 군집이 실제 예상하던 위치와 일치하는가?',
    'AI가 제안한 원인 후보가 공정 경험상 합리적인가?',
    '결과물을 팀원에게 공유하거나 보고서에 붙일 수 있는가?',
  ];
  const done = checks.filter(Boolean).length;
  return (
    <SlideShell>
      <SlideNumber n={30} />
      <SlideTag label="실습 후 검증 체크리스트" />
      <h2 className="s-title">5가지 모두 체크되면 완성</h2>
      <div className="check-progress">
        <div className="cp-bar"><div className="cp-fill" style={{ width: `${(done / 5) * 100}%` }} /></div>
        <span>{done} / 5</span>
      </div>
      <div className="checklist-items">
        {items.map((item, i) => (
          <div className={`cl-item${checks[i] ? ' done' : ''}`} key={i} onClick={() => toggle(i)}>
            <div className="cl-box">{checks[i] && <Check size={13} />}</div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 31 ─────────────────────────────────────────────────
function Slide31() {
  return (
    <SlideShell>
      <SlideNumber n={31} />
      <SlideTag label="핵심 요약" />
      <h2 className="s-title">오늘 배운 것 3가지</h2>
      <div className="summary-items">
        {[
          { n: '01', title: '히트맵은 엔지니어의 눈이다', body: '숫자 표가 아닌 색 지도로 보면 패턴이 3초 안에 보인다.', stat: '3초 vs 20~30분 = 600배 빠른 패턴 인식' },
          { n: '02', title: 'AI는 위치를 찾고, 엔지니어는 원인을 확정한다', body: '공간 군집 발견은 AI가, 공정 이력 대조는 엔지니어가 한다.', stat: '3 케이스 모두 AI 패턴 → 엔지니어 원인 확정 성공' },
          { n: '03', title: '5요소 완성 = 역질문 0회, 즉시 실행', body: '문제/데이터/기준/산출물/검증이 모두 있어야 AI가 바로 코드를 만든다.', stat: '5요소 완비 시 평균 4분 이내 코드 완성' },
        ].map(s => (
          <div className="summary-item" key={s.n}>
            <span className="si-num">{s.n}</span>
            <div>
              <strong>{s.title}</strong>
              <p>{s.body}</p>
              <span className="si-stat">{s.stat}</span>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 32 ─────────────────────────────────────────────────
function Slide32() {
  return (
    <SlideShell>
      <SlideNumber n={32} />
      <SlideTag label="다음 강의 예고" />
      <h2 className="s-title">5강에서 6강으로</h2>
      <div className="bridge-wrap">
        <div className="bridge-card from">
          <div className="bc-label">5강 (오늘)</div>
          <Grid3x3 size={36} color="#06b6d4" />
          <strong>위치</strong>
          <p>어느 구역이 문제인가?</p>
          <ul className="bc-bullets">
            <li>PVD — 웨이퍼 가장자리 저항 상승</li>
            <li>OLED — 패널 하단 휘도 편차</li>
            <li>2차전지 — 폭방향 편차 구간</li>
          </ul>
        </div>
        <div className="bridge-arrow">
          <ArrowRight size={36} color="#334155" />
          <span>다음 질문</span>
        </div>
        <div className="bridge-card to">
          <div className="bc-label">6강</div>
          <Zap size={36} color="#f59e0b" />
          <strong>시간</strong>
          <p>언제부터 이상이 시작됐는가?</p>
          <ul className="bc-bullets">
            <li>OOC 자동 탐지 (관리도)</li>
            <li>실시간 모니터링 대시보드</li>
            <li>이상 징후 조기 경보 시스템</li>
          </ul>
        </div>
      </div>
      <div className="next-title">6강 — 설비 이상 징후 감지 및 실시간 모니터링 (OOC 자동 탐지)</div>
    </SlideShell>
  );
}

// ── Slide 33 ─────────────────────────────────────────────────
function Slide33() {
  return (
    <SlideShell>
      <SlideNumber n={33} />
      <SlideTag label="자료 및 링크" />
      <h2 className="s-title">수고하셨습니다</h2>
      <div className="final-next">
        {[
          { n: '①', text: '슬라이드 28 템플릿을 자신의 공정 데이터에 맞게 수정하고 Antigravity로 히트맵을 만들어보세요' },
          { n: '②', text: '만든 결과물을 팀원이나 상사에게 공유하고, AI가 찾은 패턴을 공정 이력과 대조해보세요' },
          { n: '③', text: '6강에서 시간 축 이상 탐지(OOC)를 학습해 히트맵(공간)과 트렌드(시간)를 함께 활용하세요' },
        ].map(item => (
          <div className="final-next-item" key={item.n}>
            <span className="fni-num">{item.n}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="final-links">
        {[
          { label: '← 4강 교안', href: 'https://heekeunlee.github.io/lecture04/' },
          { label: '6강 교안 →', href: 'https://heekeunlee.github.io/lecture06/' },
        ].map(l => (
          <a className="final-link" href={l.href} key={l.label} target="_blank" rel="noreferrer">
            {l.label} <ExternalLink size={14} />
          </a>
        ))}
      </div>
      <div className="final-reminder">
        <CheckCircle2 size={18} color="#10b981" />
        <p>작업지시서 템플릿은 슬라이드 28에서 언제든 복사할 수 있습니다.</p>
      </div>
    </SlideShell>
  );
}

// ── 슬라이드 배열 ────────────────────────────────────────────
const SLIDES = [
  Slide01, Slide02, Slide03, Slide04,
  Slide05, Slide06, Slide07, Slide08, Slide09, Slide10, Slide11, Slide12,
  Slide13, Slide14, Slide15, Slide16, Slide17,
  Slide18, Slide19, Slide20, Slide21,
  Slide22, Slide23, Slide24,
  Slide25, Slide26, Slide27, Slide28,
  Slide29, Slide30,
  Slide31, Slide32, Slide33,
];

// ── 메인 App ─────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app-container lecture05-scroll">
      <header className="main-header">
        <div className="header-top">
          <div className="logo-group">
            <img
              src="/lecture05/logo.png"
              alt="LettUin Edu"
              className="header-logo"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="header-tag-container">
            <span className="header-tag">AI를 지휘하는 스마트한 엔지니어의 시작</span>
          </div>
        </div>

        <div className="hero-section">
          <h1>Ch.5 수율 히트맵 &amp; 웨이퍼 맵 시각화</h1>
          <p className="subtitle">불량 위치를 지도로 그린다 - AI 코딩으로 10분 안에</p>
          <div className="lesson-meta" aria-label="lesson summary">
            <span>40분</span>
            <span>{TOTAL_SLIDES}개 섹션</span>
            <span>반도체</span>
            <span>디스플레이</span>
            <span>2차전지</span>
            <span>Antigravity 실습 포함</span>
          </div>
        </div>
      </header>

      <main className="lecture-sections">
        {SLIDES.slice(1).map((SlideComponent, index) => (
          <section className="lecture-section" key={index + 2}>
            <SlideComponent />
          </section>
        ))}
      </main>

      <footer>
        <p>Ch.5 수율 히트맵 &amp; 웨이퍼 맵 시각화</p>
      </footer>
    </div>
  );
}
