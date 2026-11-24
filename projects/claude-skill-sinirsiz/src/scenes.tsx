import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { C, FPS, sec, prog, pop, rel, inter, tight, serif, mono, copperText, EASE } from './theme';
import { Glass, Sfx, Spark } from './components';

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const slam = (f: number, at: number) => { const p = pop(f, at, 10); return { s: 1 + (1 - Math.min(1, p)) * 1.1, o: clamp((f - at) / 4) }; };
const REELS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'].map((n) => `img/${n}.jpg`);
const Check: React.FC<{ s?: number; c?: string }> = ({ s = 26, c = C.dark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
const Phone: React.FC<{ src: string; x: number; y: number; w?: number; rot?: number; a?: number; z?: number }> = ({ src, x, y, w = 260, rot = 0, a = 1, z = 1 }) => (
  <div style={{ position: 'absolute', left: x - w / 2, top: y, width: w, height: w * 1.78, borderRadius: w * 0.12, overflow: 'hidden', border: '6px solid #16151a', boxShadow: '0 30px 60px rgba(0,0,0,.55)', zIndex: z,
    transform: `rotate(${rot}deg) scale(${Math.min(1.04, a)})`, opacity: Math.min(1, a) }}>
    <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);
const Tag: React.FC<{ children: React.ReactNode; a?: number; style?: React.CSSProperties }> = ({ children, a = 1, style }) => (
  <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 20, background: 'rgba(255,255,255,.06)', border: '2px solid rgba(255,255,255,.12)', font: `700 26px ${inter}`, color: '#fff', whiteSpace: 'nowrap',
    opacity: Math.min(1, a), transform: `scale(${Math.min(1.05, a)})`, ...style }}>{children}</div>
);

/* ============ KANCA: kart destesi + sayaç ============ */
export const Hook: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const spread = prog(f, sec(rel('hook', 'l01', 0.55)), 16);
  const count = Math.min(8, 1 + Math.floor(clamp((f - 6) / sec(2.4)) * 7));
  return (
    <AbsoluteFill>
      {REELS.map((src, i) => {
        const a = pop(f, 2 + i * 2, 12);
        const col = i % 4, row = Math.floor(i / 4);
        const stackX = 540 + (i - 3.5) * 8, stackY = 470 + i * 4;
        const gx = 175 + col * 243, gy = 450 + row * 400;
        const x = stackX + (gx - stackX) * spread, y = stackY + (gy - stackY) * spread;
        return <Phone key={i} src={src} x={x} y={y + Math.sin(t * 1.3 + i) * 5} w={260 - 60 * spread} rot={(i - 3.5) * 4 * (1 - spread)} a={a} z={i} />;
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1160, display: 'flex', justifyContent: 'center', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 30, background: 'rgba(6,7,12,.85)', border: `2px solid ${C.copper}`, font: `700 28px ${inter}`, color: '#fff' }}>
          yapılan reels: <span style={{ font: `800 32px ${mono}`, color: C.copper2 }}>{count}</span></div>
      </div>
      {REELS.map((_, i) => <Sfx key={i} at={2 + i * 2} name="tick" vol={0.5} />)}<Sfx at={0} name="impact" vol={0.7} />
    </AbsoluteFill>
  );
};

/* ============ KOD: fikir → kod, video AI değil, kredi yok ============ */
export const Kod: React.FC = () => {
  const f = useCurrentFrame();
  const idea = '> yağmurda çay neden daha güzel, bunun reels’ini yap';
  const typed = idea.slice(0, Math.floor(clamp((f - 6) / sec(1.2)) * idea.length));
  const code = ['sahne("yağmur", { katman: 3 })', 'bardak.buhar(0.6)', 'altyazi(seslendirme.srt)', 'sfx("yagmur", -18)', 'render("reels.mp4")'];
  const vAt = sec(rel('kod', 'l04')), kAt = sec(rel('kod', 'l04', 0.7)), crAt = sec(rel('kod', 'l05'));
  const term = 1 - prog(f, vAt - 6, 8);
  return (
    <AbsoluteFill>
      <Glass style={{ left: 90, top: 470, width: 900, height: 560, background: '#14131b', opacity: term, transform: `scale(${0.95 + 0.05 * Math.min(1, pop(f, 0, 12))})` }}>
        <div style={{ position: 'absolute', left: 30, top: 26, display: 'flex', alignItems: 'center', gap: 10, font: `600 20px ${inter}`, color: C.dim }}><Spark size={22} />Claude Code</div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 80, font: `700 28px/1.4 ${mono}`, color: C.copper2 }}>{typed}</div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 200 }}>
          {code.map((c, i) => { const a = prog(f, sec(1.4) + i * 5, 6); return <div key={i} style={{ font: `500 27px/1.7 ${mono}`, color: 'rgba(245,239,233,.85)', opacity: a, transform: `translateX(${(1 - a) * 20}px)` }}><span style={{ color: C.faint }}>{String(i + 1).padStart(2, '0')}  </span>{c}</div>; })}
        </div>
        <div style={{ position: 'absolute', right: 30, bottom: 26, padding: '8px 16px', borderRadius: 12, background: 'rgba(232,135,92,.15)', color: C.copper2, font: `700 22px ${inter}`, opacity: prog(f, sec(1.4) + 26, 6) }}>sahne 6/6 ✓</div>
      </Glass>
      {f >= vAt - 4 && <>
        <Glass style={{ left: 90, top: 520, width: 430, height: 300, opacity: prog(f, vAt - 4, 8), borderColor: 'rgba(239,75,75,.4)' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', font: `800 44px ${tight}`, color: C.dim }}>video AI</div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', font: `600 24px ${inter}`, color: C.faint }}>kare kare üretim, kredi</div>
          <svg width={430} height={300} style={{ position: 'absolute', inset: 0 }}><line x1={60} y1={240} x2={370} y2={60} stroke="#ef4b4b" strokeWidth={10} strokeLinecap="round" opacity={clamp((f - vAt) / 5)} /></svg>
        </Glass>
        {f >= kAt && <Glass style={{ left: 560, top: 520, width: 430, height: 300, borderColor: C.copper, boxShadow: '0 0 60px rgba(232,135,92,.25)', transform: `scale(${slam(f, kAt).s})`, opacity: slam(f, kAt).o }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 50, textAlign: 'center', font: `900 100px ${mono}`, ...copperText }}>&lt;/&gt;</div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 190, textAlign: 'center', font: `900 54px ${tight}`, color: '#fff' }}>kod</div>
        </Glass>}
        {f >= crAt && <Glass style={{ left: 190, top: 860, width: 700, height: 190, opacity: Math.min(1, pop(f, crAt, 10)) }}>
          <div style={{ position: 'absolute', left: 30, top: 28, font: `700 26px ${inter}`, color: C.dim }}>harcanan video kredisi</div>
          <div style={{ position: 'absolute', left: 30, right: 30, top: 90, height: 24, borderRadius: 12, background: 'rgba(255,255,255,.08)' }} />
          <div style={{ position: 'absolute', right: 34, top: 20, font: `900 64px ${tight}`, ...copperText }}>0</div>
        </Glass>}
      </>}
      <Sfx at={6} name="tap" vol={0.7} />{code.map((_, i) => <Sfx key={i} at={sec(1.4) + i * 5} name="tick" vol={0.6} />)}
      <Sfx at={vAt} name="error" vol={0.6} /><Sfx at={kAt} name="impact" vol={0.8} /><Sfx at={crAt} name="pop" vol={0.6} />
    </AbsoluteFill>
  );
};

/* ============ STİL: her cümlede başka reels ============ */
export const Stil: React.FC = () => {
  const f = useCurrentFrame();
  const items: [string, string, string, 'wide' | 'tall'][] = [
    ['l07', 'img/fx_uyku.jpg', 'uyku masalı', 'wide'],
    ['l08', 'img/a3.jpg', 'motion grafik', 'tall'],
    ['l09', 'img/a6.jpg', 'veri anlatımı', 'tall'],
    ['l10', 'img/fx_film.jpg', 'kısa film', 'wide'],
  ];
  const starts = items.map(([id]) => sec(rel('stil', id)));
  const same = sec(rel('stil', 'l11'));
  let cur = -1; starts.forEach((s, i) => { if (f >= s - 3) cur = i; });
  return (
    <AbsoluteFill>
      {f < same && cur < 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', font: `italic 400 140px ${serif}`, ...copperText, opacity: Math.min(1, pop(f, 2, 12)) }}>istediğin stil</div>}
      {f < same && cur >= 0 && (() => {
        const [, src, label, kind] = items[cur]; const a = pop(f, starts[cur] - 3, 10);
        const w = kind === 'wide' ? 900 : 380, h = kind === 'wide' ? 506 : 676;
        return (
          <div key={cur} style={{ position: 'absolute', left: 540 - w / 2, top: kind === 'wide' ? 560 : 470, width: w, height: h, borderRadius: 30, overflow: 'hidden', border: '4px solid rgba(255,255,255,.14)', boxShadow: '0 40px 80px rgba(0,0,0,.55)',
            transform: `scale(${Math.min(1.04, a)}) rotate(${(cur % 2 ? 2 : -2) * (1 - Math.min(1, a))}deg)`, opacity: Math.min(1, a) }}>
            <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', left: 20, top: 20, padding: '8px 16px', borderRadius: 14, background: C.copper, color: C.dark, font: `800 26px ${inter}` }}>{label}</div>
          </div>
        );
      })()}
      {f >= same && items.map(([, src], i) => { const a = pop(f, same + i * 3, 10);
        return <div key={i} style={{ position: 'absolute', left: 540 - 170 + (i - 1.5) * 26, top: 520 + i * 26, width: 340, height: 520, borderRadius: 30, overflow: 'hidden', border: '4px solid #16151a', boxShadow: '0 30px 60px rgba(0,0,0,.5)', transform: `rotate(${(i - 1.5) * 6}deg) scale(${Math.min(1.03, a)})`, opacity: Math.min(1, a) }}>
          <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>; })}
      {f >= same && <Tag a={pop(f, same + 12, 10)} style={{ left: 380, top: 1120, background: C.copper, color: C.dark, border: 'none' }}><Spark size={24} color={C.dark} />aynı skill</Tag>}
      {starts.map((s, i) => <Sfx key={i} at={s - 3} name="whoosh" vol={0.4} />)}<Sfx at={same + 12} name="pop" vol={0.6} />
    </AbsoluteFill>
  );
};

/* ============ BU VİDEO: Claude yaptı ============ */
export const Bu: React.FC = () => {
  const f = useCurrentFrame();
  const made = sec(rel('bu', 'l12', 0.7));
  const checks = ['her kelime', 'her animasyon', 'her ses efekti'].map((s, i) => [s, sec(rel('bu', 'l13', i * 0.33))] as [string, number]);
  return (
    <AbsoluteFill>
      <Glass style={{ left: 120, top: 470, width: 840, height: 520, background: '#14131b', opacity: Math.min(1, pop(f, 0, 12)) }}>
        <div style={{ position: 'absolute', left: 24, top: 20, display: 'flex', gap: 9 }}>{['#ff6b6b', '#ffd23f', '#5fd068'].map((c) => <span key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />)}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 16, textAlign: 'center', font: `600 20px ${inter}`, color: C.dim }}>● bu reels · şu an</div>
        <div style={{ position: 'absolute', left: 300, top: 60, width: 240, height: 427, borderRadius: 18, overflow: 'hidden', border: '3px solid rgba(255,255,255,.12)' }}>
          <Img src={staticFile('img/self.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {f >= made && <div style={{ position: 'absolute', right: 40, top: 360, padding: '10px 20px', borderRadius: 14, border: `3px solid ${C.copper}`, color: C.copper2, font: `900 30px ${tight}`, transform: `rotate(-8deg) scale(${slam(f, made).s})`, opacity: slam(f, made).o, background: 'rgba(6,7,12,.85)' }}>CLAUDE YAPTI</div>}
      </Glass>
      {checks.map(([s, at], i) => { const a = pop(f, at, 10); return a > 0 ? (
        <Tag key={s} a={a} style={{ left: 140 + i * 270, top: 1040, padding: '12px 18px' }}><span style={{ width: 32, height: 32, borderRadius: 16, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check s={20} /></span>{s}</Tag>) : null; })}
      <Sfx at={made} name="impact" vol={0.8} />{checks.map(([, at], i) => <Sfx key={i} at={at} name="tick" vol={0.9} />)}
    </AbsoluteFill>
  );
};

/* ============ SAYI: 10 günde 8 reels (gerçek) ============ */
export const Sayi: React.FC = () => {
  const f = useCurrentFrame();
  const n = Math.min(8, Math.floor(interpolate(f, [4, sec(rel('sayi', 'l14', 0.9))], [0, 8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const zero = sec(rel('sayi', 'l15', 0.4));
  return (
    <AbsoluteFill>
      <Glass style={{ left: 90, top: 450, width: 900, height: 640 }}>
        <div style={{ position: 'absolute', left: 30, top: 26, display: 'flex', gap: 22 }}>
          {[[String(n), 'reels'], ['10', 'gün'], [f >= zero ? '0' : '–', 'kurgu programı']].map(([v, l], i) => (
            <div key={l} style={{ padding: '10px 20px', borderRadius: 18, background: i === 2 && f >= zero ? C.copper : 'rgba(255,255,255,.06)', textAlign: 'center', minWidth: 130 }}>
              <div style={{ font: `900 46px ${mono}`, color: i === 2 && f >= zero ? C.dark : C.copper2 }}>{v}</div>
              <div style={{ font: `600 20px ${inter}`, color: i === 2 && f >= zero ? C.dark : C.dim }}>{l}</div></div>))}
        </div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 170, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {REELS.map((src, i) => <div key={i} style={{ height: 210, borderRadius: 14, overflow: 'hidden', opacity: i < n ? 1 : 0.08, transform: `scale(${i < n ? 1 : 0.9})` }}><Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>)}
        </div>
      </Glass>
      {Array.from({ length: 8 }).map((_, i) => <Sfx key={i} at={4 + Math.round(i * (sec(rel('sayi', 'l14', 0.9)) - 4) / 8)} name="tick" vol={0.7} />)}<Sfx at={zero} name="pop" vol={0.7} />
    </AbsoluteFill>
  );
};

/* ============ REHBER ============ */
export const Rehber: React.FC = () => {
  const f = useCurrentFrame();
  const rows = ['Seri / tema kuralları', 'Sahne ve zamanlama', 'Seslendirme ve altyazı', 'Ses efektleri', 'Render ve kontrol'];
  const tags = [['her prompt', sec(rel('rehber', 'l16', 0.62))], ['her adım', sec(rel('rehber', 'l16', 0.85))]] as [string, number][];
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 200, top: 470, width: 680, height: 620, borderRadius: 28, background: '#f4f1ec', boxShadow: '0 40px 80px rgba(0,0,0,.5)', transform: `rotate(-2deg) scale(${Math.min(1.03, pop(f, 0, 14))})`, opacity: Math.min(1, pop(f, 0, 14)) }}>
        <div style={{ position: 'absolute', left: 40, top: 40, font: `900 42px ${tight}`, color: '#16151a' }}>Claude ile Reels</div>
        <div style={{ position: 'absolute', left: 40, top: 98, font: `italic 400 38px ${serif}`, color: C.copperDeep }}>rehber + promptlar</div>
        {rows.map((r, i) => { const a = prog(f, 8 + i * 4, 6); return (
          <div key={r} style={{ position: 'absolute', left: 40, right: 40, top: 190 + i * 76, display: 'flex', alignItems: 'center', gap: 16, font: `700 28px ${inter}`, color: '#2a2622', opacity: a }}>
            <span style={{ width: 36, height: 36, borderRadius: 18, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check s={22} /></span>{r}</div>); })}
      </div>
      {tags.map(([s, at], i) => { const a = pop(f, at, 10); return a > 0 ? <Tag key={s} a={a} style={{ left: i ? 620 : 120, top: i ? 980 : 520, background: C.copper, color: C.dark, border: 'none', transform: `rotate(${i ? 4 : -5}deg) scale(${Math.min(1.05, a)})` }}><Check s={22} />{s}</Tag> : null; })}
      {rows.map((_, i) => <Sfx key={i} at={8 + i * 4} name="tick" vol={0.6} />)}{tags.map(([, at], i) => <Sfx key={`t${i}`} at={at} name="pop" vol={0.6} />)}
    </AbsoluteFill>
  );
};

/* ============ FİNAL ============ */
export const Final: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', font: `800 44px ${tight}`, color: '#fff', opacity: prog(f, 2, 10) }}>Yorumlara yaz</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 650, textAlign: 'center', transform: `scale(${Math.min(1.05, pop(f, 4, 14)) * (1 + 0.03 * Math.sin(t * 5))})`, opacity: Math.min(1, pop(f, 4, 14)) }}>
        <span style={{ display: 'inline-block', padding: '20px 56px', borderRadius: 70, background: C.copper, color: C.dark, font: `900 104px/1 ${tight}`, letterSpacing: '.01em', boxShadow: '0 18px 50px rgba(232,135,92,.4)' }}>“SINIRSIZ”</span>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', font: `italic 400 64px ${serif}`, color: C.copper2, opacity: prog(f, 14, 10) }}>rehberin linki DM’de</div>
      <Sfx at={4} name="impact" vol={0.7} />
    </AbsoluteFill>
  );
};
export { EASE };
