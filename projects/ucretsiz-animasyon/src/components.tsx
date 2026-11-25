import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { C, TL, TIMING, FPS, sec, prog, pop, inter, tight, serif, copperText, EASE_IO } from './theme';

const TAU = Math.PI * 2;
const rng = (seed: number) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const STARS = (() => { const r = rng(2024); return Array.from({ length: 200 }, () => [r() * 1080, r() * 1920, r() * 1.8 + 0.3, r() * TAU, r()]); })();

/* ---------- Arka plan: her zamanki tema + bakır tonlu Vice City silüeti ---------- */
export const Background: React.FC<{ glow?: number; city?: boolean }> = ({ glow = 0, city = false }) => {
  const f = useCurrentFrame(); const t = f / FPS;
  const r = rng(9);
  const towers = Array.from({ length: 22 }, (_, i) => ({ x: i * 52 - 20 + r() * 20, w: 30 + r() * 34, h: 90 + r() * 230 }));
  const palm = (x: number, y: number, s: number, k: number) => {
    const sway = Math.sin(t * 0.8 + k) * 3;
    return (
      <g key={k} transform={`translate(${x} ${y}) scale(${s})`}>
        <path d={`M0 0 C 6 -60, ${2 + sway} -140, ${10 + sway} -220`} stroke="#1b1512" strokeWidth={10} fill="none" strokeLinecap="round" />
        {[-150, -110, -60, -20, 20, 60].map((a, j) => (
          <path key={j} transform={`translate(${10 + sway} -220) rotate(${a + sway * 2})`} d="M0 0 C 40 -20, 80 -10, 110 20 C 76 4, 40 0, 0 0Z" fill="#1b1512" />
        ))}
      </g>
    );
  };
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="g1" cx="540" cy="820" r="900" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="rgba(40,36,60,.55)" /><stop offset="1" stopColor="rgba(6,7,12,0)" /></radialGradient>
          <radialGradient id="g2" cx="540" cy="820" r="640" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor={`rgba(232,135,92,${0.22 * glow})`} /><stop offset="1" stopColor="rgba(232,135,92,0)" /></radialGradient>
          <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(232,135,92,.0)" /><stop offset=".6" stopColor="rgba(232,135,92,.16)" /><stop offset="1" stopColor="rgba(232,135,92,.28)" /></linearGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#g1)" />
        <rect width={1080} height={1920} fill="url(#g2)" />
        {[380, 520, 680].map((rr, i) => <circle key={i} cx={540} cy={960} r={rr + Math.sin(t * 0.6 + i) * 6} fill="none" stroke="rgba(255,255,255,.035)" strokeWidth={2} />)}
        {STARS.map(([x, y, rad, ph, sp], i) => <circle key={i} cx={x} cy={((y - t * 6 * sp) % 1920 + 1920) % 1920} r={rad} fill="#fff" opacity={0.15 + 0.6 * Math.abs(Math.sin(t * (0.6 + sp) + ph))} />)}
        {/* alt ufuk: bakır gün batımı + şehir + palmiyeler (IG arayüzünün altında, dekor) */}
        {city && <>
        <rect x={0} y={1500} width={1080} height={420} fill="url(#sun)" />
        <g opacity={0.95}>{towers.map((b, i) => <rect key={i} x={b.x} y={1920 - 170 - b.h} width={b.w} height={b.h + 170} fill="#120f10" />)}</g>
        {towers.map((b, i) => Array.from({ length: 6 }).map((_, j) => ((i * 7 + j * 3) % 5 === 0) ? <rect key={`${i}-${j}`} x={b.x + 6 + (j % 2) * 12} y={1920 - 170 - b.h + 14 + j * 22} width={6} height={8} fill={`rgba(242,166,121,${0.35 + 0.3 * Math.abs(Math.sin(t * 1.5 + i + j))})`} /> : null))}
        {palm(90, 1920, 1.1, 1)}{palm(1000, 1920, 1.25, 2)}{palm(860, 1930, 0.8, 3)}
        </>}
      </svg>
    </AbsoluteFill>
  );
};

/* ---------- Sahne başlığı ---------- */
export const Spark: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = C.copper }) => {
  let d = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU - Math.PI / 2, a1 = a - 0.32, a2 = a + 0.32, R = i % 2 ? 9.8 : 11.8;
    d += `M12 12 L${12 + Math.cos(a1) * 3.2} ${12 + Math.sin(a1) * 3.2} L${12 + Math.cos(a) * R} ${12 + Math.sin(a) * R} L${12 + Math.cos(a2) * 3.2} ${12 + Math.sin(a2) * 3.2}Z `; }
  return <svg width={size} height={size} viewBox="0 0 24 24"><path d={d} fill={color} /></svg>;
};
export const Header: React.FC<{ eyebrow: string; title: string; em: string; frame: number; dur: number; step?: number }> = ({ eyebrow, title, em, frame, dur, step = 0 }) => {
  const a = Math.min(prog(frame, 0, 10), 1 - prog(frame, dur - 7, 7, EASE_IO));
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', opacity: a, transform: `translateY(${(1 - prog(frame, 0, 12)) * -18}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, color: C.copper, font: `700 30px/1 ${inter}`, letterSpacing: '.24em' }}><Spark />{eyebrow}</div>
      {step > 0 && <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 18 }}>{[1, 2, 3].map((k) => <span key={k} style={{ width: k === step ? 34 : 10, height: 10, borderRadius: 5, background: k <= step ? C.copper : 'rgba(255,255,255,.18)' }} />)}</div>}
      {title && <div style={{ marginTop: step > 0 ? 18 : 26, font: `900 92px/1 ${tight}`, letterSpacing: '-.035em', color: C.ink, whiteSpace: 'nowrap' }}>{title} <span style={{ font: `italic 400 110px/1 ${serif}`, letterSpacing: '-.01em', paddingRight: 8, ...copperText }}>{em}</span></div>}
    </div>
  );
};

/* ---------- Altyazı (seslendirmeyle birebir) ---------- */
export const Captions: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const L = TIMING.lines; const idx = L.findIndex((l, i) => t >= l.start - 0.02 && t < (i < L.length - 1 ? L[i + 1].start - 0.02 : TIMING.total));
  if (idx < 0) return null;
  const { line, start } = L[idx]; const next = idx < L.length - 1 ? L[idx + 1].start : TIMING.total;
  const words = [...(line.a ? line.a.split(' ').map((w) => ({ w, b: false })) : []), ...line.b.split(' ').map((w) => ({ w, b: true }))];
  const span = Math.max(0.25, (line.dur) * 0.85);
  const out = prog(f, sec(next) - 3, 3, EASE_IO);
  const word = (o: { w: string; b: boolean }, k: number) => {
    const at = sec(start + (k / words.length) * span) - 2; const a = prog(f, at, 6);
    return <span key={k} style={{ display: 'inline-block', margin: '0 .12em', opacity: a * (1 - out), transform: `translateY(${(1 - a) * 16}px)`, filter: `blur(${(1 - a) * 4}px)` }}>{o.w}</span>;
  };
  return (
    <div style={{ position: 'absolute', left: 56, right: 56, top: 1236, textAlign: 'center' }}>
      {line.a && <div style={{ font: `800 52px/1.12 ${tight}`, letterSpacing: '-.025em', color: '#fff' }}>{words.filter((o) => !o.b).map((o) => word(o, words.indexOf(o)))}</div>}
      <div style={{ font: `italic 400 62px/1.1 ${serif}`, color: C.copper2, marginTop: 2 }}>{words.filter((o) => o.b).map((o) => word(o, words.indexOf(o)))}</div>
    </div>
  );
};

/* ---------- Yorum pill'i (her zamanki yapı) ---------- */
export const Pill: React.FC<{ from: number; ctaFrom: number; words?: string[]; minW?: number }> = ({ from, ctaFrom, words = ['REELS'], minW = 150 }) => {
  const f = useCurrentFrame(); const t = f / FPS;
  const a = prog(f, from, 10);
  const cyc = t % 3.2; const w = words[Math.floor(t / 3.2) % words.length];
  let n = cyc < 0.8 ? 0 : cyc < 1.5 ? Math.ceil(((cyc - 0.8) / 0.7) * w.length) : w.length; if (f > ctaFrom) n = w.length;
  const cur = Math.floor(t * 2.4) % 2 === 0 || (cyc > 0.8 && cyc < 1.5);
  const s = 1 + 0.03 * Math.max(0, 1 - Math.abs(cyc - 1.55) / 0.2) + (f > ctaFrom ? 0.04 * Math.abs(Math.sin(t * 4)) : 0);
  return (
    <div style={{ position: 'absolute', left: '50%', top: 1424, transform: `translateX(-50%) scale(${s})`, opacity: a, height: 92, padding: '0 26px 0 16px', display: 'flex', alignItems: 'center', gap: 16,
      borderRadius: 60, background: 'rgba(255,255,255,.045)', border: '2px solid rgba(255,255,255,.09)', whiteSpace: 'nowrap', font: `800 36px/1 ${inter}`, letterSpacing: '-.02em', boxShadow: '0 10px 40px rgba(0,0,0,.4)' }}>
      <div style={{ width: 56, height: 56, borderRadius: 28, background: 'linear-gradient(135deg,#3a3d48,#22242c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={32} height={32} viewBox="0 0 24 24" fill="rgba(255,255,255,.7)"><circle cx="12" cy="9" r="4" /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6z" /></svg></div>
      <span style={{ color: '#fff' }}>Yorumlara</span>
      <span style={{ display: 'inline-block', minWidth: minW, textAlign: 'center', color: C.copper }}>{w.slice(0, n)}<span style={{ display: 'inline-block', width: 4, height: 36, background: '#fff', margin: '0 2px -6px', borderRadius: 2, opacity: cur ? 1 : 0 }} /></span>
      <span style={{ color: '#fff' }}>yaz</span>
    </div>
  );
};

/* ---------- Ses efekti ---------- */
export const Sfx: React.FC<{ at: number; name: string; vol?: number }> = ({ at, name, vol = 1 }) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={sec(1.6)} layout="none"><Audio src={staticFile(`sfx/${name}.wav`)} volume={TL.sfxVolume * vol} /></Sequence>
);

/* ---------- Bayraklar (sade çizim) ---------- */
const star5 = (cx: number, cy: number, R: number, r: number) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; d += `${i ? 'L' : 'M'}${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr}`; } return d + 'Z'; };
export const FlagTR: React.FC<{ w?: number }> = ({ w = 120 }) => (
  <svg width={w} height={w * 2 / 3} viewBox="0 0 30 20" style={{ borderRadius: 6, display: 'block' }}>
    <rect width={30} height={20} fill="#E30A17" /><circle cx={11.25} cy={10} r={5} fill="#fff" /><circle cx={12.5} cy={10} r={4} fill="#E30A17" />
    <path d={star5(16.6, 10, 2.5, 1.0)} fill="#fff" transform="rotate(-18 16.6 10)" />
  </svg>
);
export const FlagNZ: React.FC<{ w?: number }> = ({ w = 120 }) => (
  <svg width={w} height={w / 2} viewBox="0 0 60 30" style={{ borderRadius: 6, display: 'block' }}>
    <rect width={60} height={30} fill="#012169" />
    <g><clipPath id="cnz"><rect width={30} height={15} /></clipPath><g clipPath="url(#cnz)">
      <path d="M0 0 L30 15 M30 0 L0 15" stroke="#fff" strokeWidth={3} /><path d="M0 0 L30 15 M30 0 L0 15" stroke="#C8102E" strokeWidth={1.2} />
      <path d="M15 0 V15 M0 7.5 H30" stroke="#fff" strokeWidth={5} /><path d="M15 0 V15 M0 7.5 H30" stroke="#C8102E" strokeWidth={3} />
    </g></g>
    {[[45, 7, 1.6], [41, 14, 1.4], [49, 13, 1.4], [45, 23, 1.7]].map(([x, y, s], i) => (<g key={i}><path d={star5(x, y, s * 1.35, s * 0.55)} fill="#fff" /><path d={star5(x, y, s, s * 0.4)} fill="#C8102E" /></g>))}
  </svg>
);

export const Glass: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div style={{ position: 'absolute', background: C.glass, border: `2px solid ${C.glassLine}`, borderRadius: 36, ...style }}>{children}</div>
);
export { pop, prog };
