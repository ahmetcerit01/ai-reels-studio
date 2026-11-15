import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Audio, Sequence, staticFile, OffthreadVideo } from 'remotion';
import { C, EASE, EASE_IO, LAYOUT, inter, interTight, serif, mono, sec, captionTimes, Scene, Zoom, Tap, Step, TL } from '../theme';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const prog = (frame: number, start: number, dur: number, ease = EASE) =>
  interpolate(frame, [start, start + Math.max(1, dur)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
export const pop = (frame: number, start: number, dur = 14) => {
  // küçük taşmalı "pop" (back-out)
  const x = clamp01((frame - start) / dur);
  const c1 = 1.7, c3 = c1 + 1;
  return x <= 0 ? 0 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

/* ---------------- İkonlar (özgün, basit çizgi ikonlar) ---------------- */
export const Icon: React.FC<{ name: string; color: string; size?: number }> = ({ name, color, size = 34 }) => {
  const p = { fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const s: Record<string, React.ReactNode> = {
    dot: <><circle cx="12" cy="12" r="4.5" fill={color} stroke="none" /><circle cx="12" cy="12" r="8.5" {...p} opacity={0.45} /></>,
    parking: <><rect x="4" y="3.5" width="16" height="17" rx="4" {...p} /><path d="M10 16.5v-9h3a2.6 2.6 0 0 1 0 5.2h-3" {...p} /></>,
    clock: <><circle cx="12" cy="12" r="8.5" {...p} /><path d="M12 7.5V12l3 2" {...p} /></>,
    pin: <><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" {...p} /><circle cx="12" cy="10" r="2.3" {...p} /></>,
    ruler: <><rect x="2.5" y="8" width="19" height="8" rx="2" {...p} transform="rotate(-30 12 12)" /><path d="M8 9.5l1 1.7M11 7.8l1 1.7M14 6l1 1.7" {...p} transform="rotate(0)" /></>,
    plus: <><circle cx="12" cy="12" r="8.5" {...p} /><path d="M12 8v8M8 12h8" {...p} /></>,
    user: <><circle cx="12" cy="8.5" r="3.6" {...p} /><path d="M5 20c1.2-3.6 3.9-5.4 7-5.4s5.8 1.8 7 5.4" {...p} /></>,
    download: <><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" {...p} /></>,
    check: <><circle cx="12" cy="12" r="8.5" {...p} /><path d="m8 12.3 2.7 2.7L16.3 9.4" {...p} /></>,
    nav: <><path d="M12 3.5 19 20l-7-3.6L5 20z" {...p} /></>,
    share: <><circle cx="17.5" cy="5.5" r="2.6" {...p} /><circle cx="6.5" cy="12" r="2.6" {...p} /><circle cx="17.5" cy="18.5" r="2.6" {...p} /><path d="m8.8 10.7 6.4-3.9M8.8 13.3l6.4 3.9" {...p} /></>,
    people: <><circle cx="9" cy="9" r="3.2" {...p} /><path d="M3.5 19c.9-3 3-4.6 5.5-4.6s4.6 1.6 5.5 4.6" {...p} /><circle cx="16.8" cy="8" r="2.6" {...p} /><path d="M15.8 13.2c2.2 0 3.9 1.4 4.7 4" {...p} /></>,
    pegman: <><circle cx="12" cy="5" r="2.4" {...p} /><path d="M9 21v-6.5L7.5 13V9.6A1.6 1.6 0 0 1 9.1 8h5.8a1.6 1.6 0 0 1 1.6 1.6V13L15 14.5V21" {...p} /></>,
    layers: <><path d="m12 3.5 8.5 4.6L12 12.7 3.5 8.1z" {...p} /><path d="m3.5 12 8.5 4.6 8.5-4.6M3.5 15.9l8.5 4.6 8.5-4.6" {...p} /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{s[name] ?? s.dot}</svg>;
};

/* ---------------- Üst etiket (bölüm hapı) ---------------- */
export const SectionPill: React.FC<{ scene: Scene; frame: number }> = ({ scene, frame }) => {
  const a = prog(frame, 2, 14);
  const label = scene.index ? `${String(scene.index).padStart(2, '0')} / 05` : '';
  return (
    <div style={{ position: 'absolute', left: LAYOUT.panel.x + 8, top: LAYOUT.pillY - 22, display: 'flex', alignItems: 'center', gap: 14,
      opacity: a, transform: `translateY(${(1 - a) * -16}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px 12px 16px', borderRadius: 40, background: C.white,
        boxShadow: '0 6px 20px rgba(20,20,30,.08)', font: `700 26px ${inter}`, color: C.ink, letterSpacing: '-0.01em' }}>
        <span style={{ width: 14, height: 14, borderRadius: 7, background: scene.accent ?? C.copper }} />
        {scene.title}
      </div>
      {label && <div style={{ font: `600 24px ${mono}`, color: C.sub }}>{label}</div>}
    </div>
  );
};

/* ---------------- İlerleme noktaları (panel altı) ---------------- */
export const ProgressDots: React.FC<{ active: number; frame: number; accent: string; within: number }> = ({ active, frame, accent, within }) => {
  const { panel } = LAYOUT;
  const names = ['Park', 'Mesafe', 'Çevrimdışı', 'Paylaş', 'Zaman'];
  const w = 760, x0 = panel.x + (panel.w - w) / 2, y = panel.y + panel.h - 64;
  const fill = (active - 1 + within) / 4;
  return (
    <div style={{ position: 'absolute', left: x0, top: y, width: w, height: 60 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 13, height: 4, borderRadius: 2, background: 'rgba(20,20,30,.12)' }} />
      <div style={{ position: 'absolute', left: 0, width: `${Math.min(1, fill) * 100}%`, top: 13, height: 4, borderRadius: 2, background: accent }} />
      {names.map((n, i) => {
        const on = i + 1 <= active, cur = i + 1 === active;
        const s = cur ? 0.7 + 0.45 * Math.min(1.1, pop(frame, 4, 16)) : 1;
        return (
          <div key={n} style={{ position: 'absolute', left: (i / 4) * w - 15, top: 0, width: 30, textAlign: 'center' }}>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: on ? accent : '#fff', border: `3px solid ${on ? accent : 'rgba(20,20,30,.18)'}`,
              transform: `scale(${s})`, boxShadow: cur ? `0 0 0 8px ${accent}33` : 'none' }} />
            <div style={{ position: 'absolute', left: -60, right: -60, top: 38, font: `600 19px ${inter}`, color: cur ? C.ink : C.sub, opacity: cur ? 1 : 0.7 }}>{n}</div>
          </div>
        );
      })}
    </div>
  );
};

/* ---------------- Altyazı (kelime kelime, iki satırlı) ---------------- */
export const Captions: React.FC<{ scene: Scene; frame: number; y?: number; dark?: boolean; size?: number }> = ({ scene, frame, y = LAYOUT.captionY, dark = false, size = 66 }) => {
  const { fps } = useVideoConfig();
  const times = captionTimes(scene);
  const t = frame / fps;
  const idx = times.findIndex((w) => t >= w.start && t < w.end);
  if (idx < 0) return null;
  const cap = scene.captions[idx], win = times[idx];
  const wa = cap.a.split(' '), wb = cap.b ? cap.b.split(' ') : [];
  const all = [...wa.map((w) => ({ w, line: 0 })), ...wb.map((w) => ({ w, line: 1 }))];
  const revealSpan = Math.min(win.end - win.start, 1.1) * 0.75;
  const st = sec(win.start);
  const exitA = prog(frame, sec(win.end) - 5, 5, EASE_IO);
  const word = (o: { w: string; line: number }, k: number) => {
    const at = st + sec((k / Math.max(1, all.length)) * revealSpan);
    const a = prog(frame, at, 9);
    const base = o.line === 0
      ? { font: `800 ${size}px ${interTight}`, color: dark ? '#fff' : C.ink, letterSpacing: '-0.03em' }
      : { font: `400 ${size * 1.12}px ${serif}`, color: dark ? C.copper2 : C.copper, letterSpacing: '-0.01em' };
    return (
      <span key={k} style={{ ...base, display: 'inline-block', marginRight: '0.24em', opacity: 0.18 + 0.82 * a,
        filter: `blur(${(1 - a) * 6}px)`, transform: `translateY(${(1 - a) * 18}px)` }}>{o.w}</span>
    );
  };
  return (
    <div style={{ position: 'absolute', left: 40, right: 40, top: y, textAlign: 'center', opacity: 1 - exitA,
      textShadow: dark ? '0 4px 24px rgba(0,0,0,.45)' : 'none' }}>
      <div style={{ lineHeight: 1.08 }}>{all.filter((o) => o.line === 0).map((o) => word(o, all.indexOf(o)))}</div>
      {wb.length > 0 && <div style={{ lineHeight: 1.12, marginTop: 2 }}>{all.filter((o) => o.line === 1).map((o) => word(o, all.indexOf(o)))}</div>}
    </div>
  );
};

/* ---------------- Adım kartları (nasıl yapılır) ---------------- */
export const StepCards: React.FC<{ steps: Step[]; frame: number; accent: string; total: number }> = ({ steps, frame, accent, total }) => {
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const active = steps.reduce((a, s, i) => (t >= s.at ? i : a), -1);
  const exit = prog(frame, sec(total) - 6, 6, EASE_IO);
  return (
    <div style={{ position: 'absolute', left: 92, right: 92, top: LAYOUT.stepsY, opacity: 1 - exit }}>
      {steps.map((s, i) => {
        const a = pop(frame, sec(s.at) - 6, 16);
        const on = i === active, done = i < active;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, height: 78, marginBottom: 14, padding: '0 26px 0 14px', borderRadius: 24,
            background: on ? '#fff' : 'rgba(255,255,255,.62)', boxShadow: on ? `0 14px 36px rgba(20,20,30,.10), 0 0 0 3px ${accent}` : '0 4px 14px rgba(20,20,30,.05)',
            opacity: Math.max(0.0, Math.min(1, a)) * (on || done ? 1 : 0.9), transform: `translateX(${(1 - Math.min(1, a)) * 60}px) scale(${on ? 1 : 0.97})` }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: done ? accent : `${accent}1f` }}>
              {done ? <Icon name="check" color="#fff" size={30} /> : <Icon name={s.icon} color={accent} size={30} />}
            </div>
            <div style={{ font: `700 27px ${inter}`, color: on ? C.ink : C.sub, letterSpacing: '-0.015em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span style={{ font: `600 22px ${mono}`, color: accent, marginRight: 12 }}>{i + 1}</span>{s.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ---------------- Zoom anahtar kareleri ---------------- */
export const zoomAt = (zooms: Zoom[] | undefined, frame: number) => {
  if (!zooms || zooms.length === 0) return { s: 1, x: 0.5, y: 0.5 };
  let cur = zooms[0], prev = zooms[0];
  for (const z of zooms) if (frame >= sec(z.at)) { prev = cur; cur = z; }
  if (cur === zooms[0]) return { s: cur.s, x: cur.x, y: cur.y };
  const p = prog(frame, sec(cur.at), 16, EASE);
  const L = (a: number, b: number) => a + (b - a) * p;
  return { s: L(prev.s, cur.s), x: L(prev.x, cur.x), y: L(prev.y, cur.y) };
};

/* ---------------- Telefon çerçevesi + ekran kaydı yuvası ---------------- */
export const Phone: React.FC<{ scene: Scene; frame: number; children?: React.ReactNode; cx: number; cy: number; extraScale?: number; opacity?: number }> = ({ scene, frame, children, cx, cy, extraScale = 1, opacity = 1 }) => {
  const { w, h } = LAYOUT.phone;
  const z = zoomAt(scene.zooms, frame);
  const dx = (z.x - 0.5) * w, dy = (z.y - 0.5) * h;
  const k = 0.6; // odak noktasını merkeze ne kadar çekelim (0: hiç, 1: tam)
  const enter = pop(frame, 0, 20);
  const s = z.s * extraScale * (0.86 + 0.14 * Math.min(1.05, enter));
  const has = !!scene.recordingFile;
  return (
    <div style={{ position: 'absolute', left: cx - w / 2, top: cy - h / 2, width: w, height: h, opacity: opacity * Math.min(1, enter * 1.4),
      transform: `translate(${-dx * z.s * k}px, ${-dy * z.s * k}px) scale(${s})`, transformOrigin: '50% 50%' }}>
      <div style={{ position: 'absolute', inset: -14, borderRadius: 66, background: '#16151a', boxShadow: '0 40px 90px rgba(20,20,40,.28), inset 0 0 0 2px #3a3940' }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 54, overflow: 'hidden', background: '#eef1ec' }}>
        {has ? (
          <OffthreadVideo src={staticFile(scene.recordingFile!)} startFrom={sec(scene.recordingStart ?? 0)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : children}
        <TapRipples taps={scene.taps} frame={frame} />
      </div>
      <div style={{ position: 'absolute', left: w / 2 - 58, top: 14, width: 116, height: 32, borderRadius: 18, background: '#16151a' }} />
    </div>
  );
};

export const SampleBadge: React.FC<{ show: boolean }> = ({ show }) => show ? (
  <div style={{ position: 'absolute', right: LAYOUT.panel.x + 26, top: LAYOUT.panel.y + 26, padding: '9px 16px', borderRadius: 20, background: 'rgba(22,21,26,.8)',
    color: '#fff', font: `600 17px ${mono}`, letterSpacing: '.04em' }}>ÖRNEK ANİMASYON · ekran kaydını ekle</div>
) : null;

export const PlaceholderTag: React.FC<{ text: string; top?: number }> = ({ text, top = 58 }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center' }}>
    <div style={{ padding: '7px 14px', borderRadius: 20, background: 'rgba(22,21,26,.78)', color: '#fff', font: `600 13px ${mono}`, letterSpacing: '.04em' }}>{text}</div>
  </div>
);

export const TapRipples: React.FC<{ taps?: Tap[]; frame: number }> = ({ taps, frame }) => {
  const { w, h } = LAYOUT.phone;
  return (
    <>
      {(taps ?? []).map((tp, i) => {
        const st = sec(tp.at), d = tp.hold ? 26 : 16;
        const p = (frame - st) / d;
        if (p < -0.2 || p > 1.4) return null;
        const press = prog(frame, st - 5, 5);
        const rel = prog(frame, st, d);
        return (
          <div key={i} style={{ position: 'absolute', left: tp.x * w, top: tp.y * h }}>
            <div style={{ position: 'absolute', left: -26, top: -26, width: 52, height: 52, borderRadius: 26, background: 'rgba(255,255,255,.55)',
              border: '3px solid rgba(22,21,26,.55)', transform: `scale(${0.6 + 0.4 * press - 0.3 * rel})`, opacity: press * (1 - rel) }} />
            <div style={{ position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: 30, border: '3px solid rgba(255,255,255,.95)',
              transform: `scale(${1 + rel * (tp.hold ? 2.2 : 1.6)})`, opacity: (1 - rel) * (p > 0 ? 1 : 0) }} />
          </div>
        );
      })}
    </>
  );
};

/* ---------------- Sonuç rozeti (sahne sonunda) ---------------- */
export const ResultChip: React.FC<{ frame: number; at: number; accent: string; icon: string; title: string; sub: string; x: number; y: number }> = ({ frame, at, accent, icon, title, sub, x, y }) => {
  const a = pop(frame, sec(at), 18);
  if (a <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 26px 16px 16px', borderRadius: 26, background: '#fff',
      boxShadow: '0 24px 60px rgba(20,20,40,.18)', transform: `scale(${a}) rotate(${(1 - Math.min(1, a)) * -6}deg)`, transformOrigin: 'left center' }}>
      <div style={{ width: 56, height: 56, borderRadius: 18, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} color="#fff" size={32} />
      </div>
      <div>
        <div style={{ font: `800 26px ${inter}`, color: C.ink, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{title}</div>
        <div style={{ font: `500 19px ${inter}`, color: C.sub, whiteSpace: 'nowrap', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
};

/* ---------------- Ses efektleri ---------------- */
export const Sfx: React.FC<{ at: number; name: string; vol?: number }> = ({ at, name, vol = 1 }) => (
  <Sequence from={Math.max(0, at)} durationInFrames={sec(1.6)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={TL.sfxVolume * vol} />
  </Sequence>
);

export const BigIndex: React.FC<{ n: number; frame: number; accent: string }> = ({ n, frame, accent }) => {
  const a = prog(frame, 4, 22);
  return (
    <div style={{ position: 'absolute', left: LAYOUT.panel.x + 44, top: LAYOUT.panel.y + 36, font: `900 190px/0.9 ${interTight}`, letterSpacing: '-0.06em',
      color: 'transparent', WebkitTextStroke: `3px ${accent}`, opacity: 0.55 * a, transform: `translateY(${(1 - a) * 40}px)` }}>
      {String(n).padStart(2, '0')}
    </div>
  );
};

export { AbsoluteFill, interpolate, useCurrentFrame };
