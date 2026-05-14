import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
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

// ── Slide 02 ─────────────────────────────────────────────────
function Slide02() {
  return (
    <SlideShell>
      <SlideNumber n={2} />
      <SlideTag label="BEFORE / AFTER" />
      <h2 className="s-title">같은 데이터, 다른 세계</h2>
      <div className="ba-grid">
        <div className="ba-card bad">
          <div className="ba-label">BEFORE</div>
          <div className="ba-icon"><BarChart3 size={32} /></div>
          <h3>엑셀 표</h3>
          <ul>
            <li>100개 셀 숫자를 눈으로 읽음</li>
            <li>이상 구역 찾기까지 20~30분</li>
            <li>패턴은 머릿속으로만 파악</li>
          </ul>
        </div>
        <div className="ba-arrow"><ArrowRight size={28} /></div>
        <div className="ba-card good">
          <div className="ba-label">AFTER</div>
          <div className="ba-icon"><Grid3x3 size={32} /></div>
          <h3>히트맵</h3>
          <ul>
            <li>색상으로 패턴을 즉시 인식</li>
            <li>이상 구역 파악까지 3초</li>
            <li>공간 군집이 시각적으로 보임</li>
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 03 ─────────────────────────────────────────────────
function Slide03() {
  const goals = [
    { n: '01', text: '수율 데이터의 공간 분포를 히트맵으로 시각화하는 원리를 이해한다' },
    { n: '02', text: 'AI 작업지시서로 인터랙티브 웨이퍼/패널 맵을 직접 만들 수 있다' },
    { n: '03', text: '시각화 결과에서 공정 불균일성의 원인 후보 3가지를 도출할 수 있다' },
  ];
  return (
    <SlideShell>
      <SlideNumber n={3} />
      <SlideTag label="학습 목표" />
      <h2 className="s-title">오늘이 끝나면 할 수 있는 것</h2>
      <div className="goals-list">
        {goals.map(g => (
          <div className="goal-item" key={g.n}>
            <span className="goal-num">{g.n}</span>
            <p>{g.text}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 04 ─────────────────────────────────────────────────
function Slide04() {
  const parts = [
    { label: 'INTRO', slides: '01–04', time: '4분', color: '#6366f1' },
    { label: '개념', slides: '05–12', time: '8분', color: '#06b6d4' },
    { label: '실무 사례', slides: '13–24', time: '15분', color: '#f59e0b' },
    { label: '작업지시서', slides: '25–28', time: '5분', color: '#10b981' },
    { label: '실습', slides: '29–30', time: '5분', color: '#ef4444' },
    { label: '마무리', slides: '31–33', time: '3분', color: '#8b5cf6' },
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
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 05 ─────────────────────────────────────────────────
function Slide05() {
  return (
    <SlideShell>
      <SlideNumber n={5} />
      <SlideTag label="개념 01" />
      <h2 className="s-title">히트맵이란?</h2>
      <div className="definition-box">
        <p className="def-main">
          수치 데이터를 <strong>2D 색상 격자</strong>로 변환하여<br />
          숫자를 읽는 것보다 <strong>10배 빠른 패턴 인식</strong>을 가능하게 하는 시각화 기법
        </p>
      </div>
      <div className="concept-analogy">
        <div className="analogy-item">
          <span className="analogy-emoji">🌡️</span>
          <strong>온도 지도</strong>
          <p>기상청 날씨 지도처럼 — 숫자 대신 색으로 지역 차이를 즉시 파악</p>
        </div>
        <div className="analogy-item">
          <span className="analogy-emoji">🔴</span>
          <strong>낮은 수율 = 빨강</strong>
          <p>문제 구역이 지도 위에서 바로 눈에 들어옴</p>
        </div>
        <div className="analogy-item">
          <span className="analogy-emoji">🔵</span>
          <strong>높은 수율 = 파랑</strong>
          <p>정상과 비정상의 경계가 선명하게 보임</p>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 06 ─────────────────────────────────────────────────
function Slide06() {
  const rows = [
    [92, 94, 91, 88, 72],
    [95, 97, 95, 90, 68],
    [93, 96, 94, 87, 65],
    [88, 90, 86, 71, 52],
    [70, 68, 65, 55, 40],
  ];
  const toColor = (v: number) => {
    if (v >= 90) return '#0ea5e9';
    if (v >= 80) return '#38bdf8';
    if (v >= 70) return '#fbbf24';
    if (v >= 60) return '#f97316';
    return '#ef4444';
  };
  return (
    <SlideShell>
      <SlideNumber n={6} />
      <SlideTag label="개념 01 심화" />
      <h2 className="s-title">숫자 → 색 → 패턴</h2>
      <div className="transform-flow">
        <div className="tf-step">
          <div className="tf-label">① 원시 데이터</div>
          <div className="mini-table">
            {rows.map((row, ri) => (
              <div className="mini-row" key={ri}>
                {row.map((v, ci) => <div className="mini-cell text" key={ci}>{v}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div className="tf-arrow"><ArrowRight size={24} /></div>
        <div className="tf-step">
          <div className="tf-label">② 히트맵</div>
          <div className="mini-table">
            {rows.map((row, ri) => (
              <div className="mini-row" key={ri}>
                {row.map((v, ci) => (
                  <div className="mini-cell color" key={ci} style={{ background: toColor(v) }} title={String(v)} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="tf-arrow"><ArrowRight size={24} /></div>
        <div className="tf-step">
          <div className="tf-label">③ 발견</div>
          <div className="tf-insight">
            <AlertTriangle size={20} color="#f59e0b" />
            <p>우하단 구역<br />집중 이상 패턴<br />→ 가장자리 문제</p>
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
      <div className="compare-table">
        <div className="ct-header">
          <div />
          <div>엑셀 표</div>
          <div>히트맵</div>
        </div>
        {[
          ['패턴 파악', '사람이 눈으로 읽음', '색상으로 즉시 인식'],
          ['소요 시간', '20~30분', '3초'],
          ['공간 군집', '발견하기 어려움', '바로 보임'],
          ['이상 구역', '수동 표시 필요', '자동 강조'],
          ['공유 편의성', '파일 첨부', '웹 링크 하나'],
        ].map(([item, bad, good]) => (
          <div className="ct-row" key={item}>
            <div className="ct-item">{item}</div>
            <div className="ct-bad">{bad}</div>
            <div className="ct-good">{good}</div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ── Slide 08 ─────────────────────────────────────────────────
function Slide08() {
  return (
    <SlideShell>
      <SlideNumber n={8} />
      <SlideTag label="개념 02" />
      <h2 className="s-title">웨이퍼 맵이란?</h2>
      <div className="wm-explain">
        <div className="wm-visual">
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
              const yld = v ? Math.max(40, 98 - dist * 13) : -1;
              const col = yld < 0 ? 'transparent' : yld > 88 ? '#0ea5e9' : yld > 72 ? '#38bdf8' : yld > 55 ? '#fbbf24' : '#ef4444';
              return <div key={`${ri}-${ci}`} className="wm-die" style={{ background: col, visibility: v ? 'visible' : 'hidden' }} />;
            }))}
          </div>
        </div>
        <div className="wm-desc">
          <p className="wm-def">웨이퍼 위 <strong>다이(Die) 하나하나의 수율·불량</strong>을<br />격자 지도로 표현한 것</p>
          <div className="wm-points">
            <div><Cpu size={16} /><span>반도체 — 웨이퍼 다이 수율맵</span></div>
            <div><Monitor size={16} /><span>디스플레이 — 패널 불량 위치맵</span></div>
            <div><Battery size={16} /><span>2차전지 — 전극 저항 분포맵</span></div>
          </div>
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
        <div className="gd-map">
          {grid.map((row, ri) => row.map((v, ci) => (
            v === null
              ? <div key={`${ri}-${ci}`} className="gd-cell empty" />
              : <div key={`${ri}-${ci}`} className="gd-cell" style={{ background: toCol(v) }} title={`${Math.round(v)}%`} />
          )))}
        </div>
        <div className="gd-legend">
          <div className="gd-legend-title">수율 범례</div>
          {[
            { color: '#0ea5e9', label: '90%+ 정상' },
            { color: '#38bdf8', label: '75–90%' },
            { color: '#fbbf24', label: '60–75%' },
            { color: '#f97316', label: '45–60%' },
            { color: '#ef4444', label: '45% 미만 이상' },
          ].map(item => (
            <div className="gd-legend-item" key={item.label}>
              <div className="gd-swatch" style={{ background: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
          <div className="gd-insight">
            <AlertTriangle size={14} color="#f59e0b" />
            <p>가장자리 수율 하락<br />→ 공정 가스·온도 불균일 의심</p>
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
            <div className="pl-item"><div className="pl-dot ok" />정상</div>
            <div className="pl-item"><div className="pl-dot warn" />주의</div>
            <div className="pl-item"><div className="pl-dot defect" />불량</div>
          </div>
          <div className="panel-insight">
            <Layers size={15} color="#06b6d4" />
            <p>우상단 코너 불량 군집 → 챔버 내 특정 위치 오염원 의심</p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 11 ─────────────────────────────────────────────────
function Slide11() {
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
          {[
            { shape: 'dot', label: '점(Dot) 군집', cause: '파티클, 국소 오염', color: '#ef4444' },
            { shape: 'line', label: '선(Line) 군집', cause: '스크래치, 반송계 접촉', color: '#f59e0b' },
            { shape: 'band', label: '띠(Band) 군집', cause: '공정 불균일, 가스 구배', color: '#6366f1' },
          ].map(t => (
            <div className="cluster-type-card" key={t.label}>
              <div className={`ct-shape ct-shape-${t.shape}`} style={{ '--clr': t.color } as React.CSSProperties} />
              <strong>{t.label}</strong>
              <span>{t.cause}</span>
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
          { pattern: '중심 > 가장자리', cause: '가스·온도 불균일 (CVD, PVD)', domain: '반도체' },
          { pattern: '가장자리 > 중심', cause: '척 클램핑 불량, 온도 구배', domain: '반도체' },
          { pattern: '특정 열 반복', cause: '노즐 막힘, 슬롯다이 결함', domain: '디스플레이' },
          { pattern: '대각선 띠', cause: '기판 이송 각도 불량', domain: '디스플레이' },
          { pattern: '균일 분산', cause: '공정 변수 외 다른 원인 탐색', domain: '공통' },
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
        <line key={i} x1={x} y1="36" x2={x + (i % 2 === 0 ? -2 : 2)} y2="136"
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
        <line key={i} x1={x} y1="118" x2={x + (i % 2 === 0 ? -4 : 4)} y2="35"
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
  return (
    <SlideShell>
      <SlideNumber n={16} />
      <SlideTag label="Case 01 · AFTER" />
      <h2 className="s-title">AI가 만들어 준 결과</h2>
      <div className="after-results">
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
      </div>
      <div className="after-time">
        <Zap size={16} color="#f59e0b" />
        <span>작업지시서 입력 후 <strong>4분 만에</strong> 완성 — 기존 대비 30배 이상 빠름</span>
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
  return (
    <SlideShell>
      <SlideNumber n={21} />
      <SlideTag label="Case 02 · AFTER + 검증" />
      <h2 className="s-title">결과 & 엔지니어 검증</h2>
      <div className="after-results">
        {[
          '증착 단계별 휘도 분포 맵 — EML 후 하단 Y:0~80mm 구간 휘도 저하 집중',
          '하단 구간 균일도 평균 73% — 목표(±10%) 미달 12매 / 50매',
          '원인 후보: ① 증발원 B 각도 편차 ② 쉐도우 마스크 하단 처짐 ③ 기판 하단 온도 구배',
        ].map((t, i) => (
          <div className="ar-item" key={i}><CheckCircle2 size={18} color="#10b981" /><p>{t}</p></div>
        ))}
      </div>
      <div className="verify-list compact">
        {[
          'AI가 찾은 하단 편차 구역이 증발원 B 방향 벡터와 일치하는가?',
          '쉐도우 마스크 재설치 후 동일 구간 균일도가 개선되었는가?',
        ].map((p, i) => (
          <div className="verify-item" key={i}><span className="vi-num">{i + 1}</span><p>{p}</p></div>
        ))}
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
  return (
    <SlideShell>
      <SlideNumber n={24} />
      <SlideTag label="Case 03 · AFTER + 검증" />
      <h2 className="s-title">결과 & 엔지니어 검증</h2>
      <div className="after-results">
        {[
          '폭 방향 520–580mm 구간에 저항 편차 집중 — 슬롯다이 끝단 막힘 패턴',
          '길이 방향 주기성 없음 → 슬러리 점도 문제 가능성 낮음',
          '원인 후보: ① 슬롯다이 엣지 노즐 막힘 ② 코팅 갭 틀어짐',
        ].map((t, i) => (
          <div className="ar-item" key={i}><CheckCircle2 size={18} color="#10b981" /><p>{t}</p></div>
        ))}
      </div>
      <div className="verify-list compact">
        {[
          'AI가 찾은 520–580mm 구간이 실제 슬롯다이 노즐 위치와 일치하는가?',
          '슬롯다이 세정 후 동일 구간 편차가 개선되었는가?',
        ].map((p, i) => (
          <div className="verify-item" key={i}><span className="vi-num">{i + 1}</span><p>{p}</p></div>
        ))}
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
          { n: '01', label: '문제', desc: '어떤 공정/장비/데이터에서 발생했는가?' },
          { n: '02', label: '데이터', desc: '파일 형식, 컬럼, 단위, 기간' },
          { n: '03', label: '기준', desc: '정상/이상 판정 기준값, spec' },
          { n: '04', label: '산출물', desc: '히트맵, 대시보드, 비교 차트 등' },
          { n: '05', label: '검증', desc: '엔지니어가 다시 확인해야 할 리스크' },
        ].map(item => (
          <div className="fi-item" key={item.n}>
            <span className="fi-num">{item.n}</span>
            <strong>{item.label}</strong>
            <p>{item.desc}</p>
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
          { n: '01', title: '히트맵은 엔지니어의 눈이다', body: '숫자 표가 아닌 색 지도로 보면 패턴이 3초 안에 보인다.' },
          { n: '02', title: 'AI는 위치를 찾고, 엔지니어는 원인을 확정한다', body: '공간 군집 발견은 AI가, 공정 이력 대조는 엔지니어가 한다.' },
          { n: '03', title: '5요소 완성 = 역질문 0회, 즉시 실행', body: '문제/데이터/기준/산출물/검증이 모두 있어야 AI가 바로 코드를 만든다.' },
        ].map(s => (
          <div className="summary-item" key={s.n}>
            <span className="si-num">{s.n}</span>
            <div><strong>{s.title}</strong><p>{s.body}</p></div>
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
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL_SLIDES) return;
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(current + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, go]);

  const SlideComponent = SLIDES[current];
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '6%' : '-6%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-6%' : '6%', opacity: 0 }),
  };

  return (
    <div className="deck">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }} />
      </div>
      <div className="slide-stage">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="slide-motion"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="nav-bar">
        <button className="nav-btn" onClick={() => go(current - 1)} disabled={current === 0}>
          <ChevronLeft size={20} />
        </button>
        <div className="nav-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`nav-dot${i === current ? ' active' : ''}`} onClick={() => go(i)} />
          ))}
        </div>
        <div className="nav-counter">{current + 1} / {TOTAL_SLIDES}</div>
        <button className="nav-btn" onClick={() => go(current + 1)} disabled={current === TOTAL_SLIDES - 1}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
