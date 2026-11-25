import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FPS, sec, prog, pop, rel, inter, tight, serif, mono, copperText, EASE } from './theme';
import { Glass, Sfx, Spark } from './components';

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const slam = (f: number, at: number) => { const p = pop(f, at, 10); return { s: 1 + (1 - Math.min(1, p)) * 1.1, o: clamp((f - at) / 4) }; };
const Check: React.FC<{ s?: number; c?: string }> = ({ s = 26, c = C.dark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
const Cross: React.FC<{ s?: number; c?: string }> = ({ s = 26, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>;

/* Ses dalgası: konuşma benzeri zarf; active=0 iken sakin, 1 iken canlı */
const Wave: React.FC<{ w: number; h: number; n?: number; active?: number; seed?: number; color?: string; dim?: string; progress?: number }> = ({ w, h, n = 48, active = 1, seed = 1, color = C.copper, dim = 'rgba(255,255,255,.22)', progress = -1 }) => {
  const t = useCurrentFrame() / FPS; const bw = w / n;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {Array.from({ length: n }).map((_, i) => {
        const base = 0.25 + 0.55 * Math.abs(Math.sin(i * 0.61 + seed * 1.7) * Math.cos(i * 0.23 + seed));
        const live = 0.5 + 0.5 * Math.sin(t * 9 + i * 0.9 + seed) * Math.sin(t * 3.3 + i * 0.37);
        const v = Math.max(0.08, base * (0.35 + 0.65 * (active > 0 ? 1 - active + active * live : 0.6)));
        const bh = v * h; const on = progress < 0 || i / n <= progress;
        return <rect key={i} x={i * bw + bw * 0.2} y={(h - bh) / 2} width={bw * 0.6} height={bh} rx={bw * 0.3} fill={on ? color : dim} />;
      })}
    </svg>
  );
};
const MicIcon: React.FC<{ s?: number; c?: string; off?: boolean }> = ({ s = 60, c = '#fff', off }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" />{off && <path d="M4 4l16 16" stroke="#ef4b4b" strokeWidth={2.6} />}</svg>
);
const Chip: React.FC<{ children: React.ReactNode; a?: number; style?: React.CSSProperties }> = ({ children, a = 1, style }) => (
  <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderRadius: 22, background: 'rgba(255,255,255,.06)', border: '2px solid rgba(255,255,255,.12)', font: `700 28px ${inter}`, color: '#fff', whiteSpace: 'nowrap',
    opacity: clamp(a), transform: `scale(${Math.min(1.05, a)})`, ...style }}>{children}</div>
);

/* ============ KANCA: konuşan ben değilim / ses benim ============ */
export const Hook: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const benAt = sec(rel('hook', 'l01', 0.55)), sesAt = sec(rel('hook', 'l02', 0.35));
  const a0 = Math.min(1, pop(f, 0, 12));
  const s = slam(f, sesAt);
  return (
    <AbsoluteFill>
      {/* büyük canlı dalga */}
      <div style={{ position: 'absolute', left: 90, top: 400, opacity: 0.9 * a0, transform: `scaleY(${a0})` }}><Wave w={900} h={260} n={56} seed={3} /></div>
      {/* sol: ben (mikrofon kapalı) */}
      <Glass style={{ left: 90, top: 720, width: 430, height: 330, opacity: Math.min(1, pop(f, 4, 12)), transform: `scale(${Math.min(1.04, pop(f, 4, 12))})` }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 40, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 130, height: 130, borderRadius: 65, background: 'linear-gradient(135deg,#3a3d48,#22242c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={80} height={80} viewBox="0 0 24 24" fill="rgba(255,255,255,.7)"><circle cx="12" cy="9" r="4" /><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6z" /></svg></div></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 196, textAlign: 'center', font: `900 46px ${tight}`, color: '#fff' }}>ben</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 256, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, font: `700 26px ${inter}`, color: '#ef7b6b', opacity: prog(f, benAt, 6) }}><MicIcon s={32} c="#ef7b6b" off />konuşmuyor</div>
      </Glass>
      {/* sağ: ses benim */}
      {f >= sesAt - 2 && <Glass style={{ left: 560, top: 720, width: 430, height: 330, borderColor: C.copper, boxShadow: '0 0 70px rgba(232,135,92,.25)', transform: `scale(${s.s})`, opacity: s.o }}>
        <div style={{ position: 'absolute', left: 40, top: 56 }}><Wave w={350} h={120} n={26} seed={8} /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 196, textAlign: 'center', font: `900 46px ${tight}`, color: '#fff' }}>ses</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', justifyContent: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 20, background: C.copper, color: C.dark, font: `800 28px ${inter}` }}><Check s={24} />benim</span></div>
      </Glass>}
      <Sfx at={0} name="impact" vol={0.7} /><Sfx at={4} name="pop" vol={0.5} /><Sfx at={benAt} name="error" vol={0.45} /><Sfx at={sesAt} name="impact" vol={0.8} />
      {t < 0 && null}
    </AbsoluteFill>
  );
};

/* ============ NASIL: kısa kayıt → Claude → metin benim sesimle ============ */
export const Nasil: React.FC = () => {
  const f = useCurrentFrame();
  const cpAt = sec(rel('nasil', 'l04', 0.05)), readAt = sec(rel('nasil', 'l04', 0.45));
  const lines = ['Bu videoda konuşan ben değilim.', 'Claude’a kısa bir ses kaydımı verdim.', 'Abonelik yok, kredi yok.'];
  const rec = Math.min(1, pop(f, 2, 12));
  return (
    <AbsoluteFill>
      {/* ses kaydı dosyası */}
      <Glass style={{ left: 90, top: 450, width: 900, height: 170, opacity: rec, transform: `scale(${Math.min(1.03, rec)})` }}>
        <div style={{ position: 'absolute', left: 30, top: 30, width: 110, height: 110, borderRadius: 26, background: 'rgba(232,135,92,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MicIcon s={60} c={C.copper2} /></div>
        <div style={{ position: 'absolute', left: 170, top: 34, font: `700 30px ${mono}`, color: '#fff' }}>ses_kaydim.wav</div>
        <div style={{ position: 'absolute', left: 170, top: 82 }}><Wave w={560} h={56} n={40} seed={5} active={0.4} progress={clamp((f - 4) / 40)} /></div>
        <div style={{ position: 'absolute', right: 34, top: 36, font: `800 30px ${mono}`, color: C.copper2 }}>0:10</div>
      </Glass>
      {/* ok + Claude */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', opacity: prog(f, 12, 8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 30px', borderRadius: 30, background: '#14131b', border: `2px solid ${C.glassLine}`, font: `700 30px ${inter}`, color: '#fff' }}>
          <Spark size={30} />Claude: <span style={{ font: `700 28px ${mono}`, color: C.copper2 }}>sesi_kopyala()</span>
          {f >= cpAt && <span style={{ width: 40, height: 40, borderRadius: 20, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.1, pop(f, cpAt, 10))})` }}><Check s={24} /></span>}
        </div>
      </div>
      {/* metin → benim sesim */}
      <Glass style={{ left: 90, top: 770, width: 900, height: 330, opacity: prog(f, cpAt - 4, 8) }}>
        <div style={{ position: 'absolute', left: 30, top: 24, font: `700 22px ${inter}`, color: C.dim, letterSpacing: '.12em' }}>METİN → BENİM SESİM</div>
        {lines.map((l, i) => {
          const at = readAt + i * 9; const p = prog(f, at, 10);
          return (
            <div key={i} style={{ position: 'absolute', left: 30, right: 30, top: 74 + i * 82, height: 66, display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: 0, font: `600 28px ${inter}`, color: 'rgba(245,239,233,.8)', opacity: 1 - p, whiteSpace: 'nowrap' }}>{l}</div>
              <div style={{ position: 'absolute', left: 0, opacity: p, transform: `scaleX(${0.6 + 0.4 * p})`, transformOrigin: 'left' }}><Wave w={760} h={56} n={50} seed={11 + i} active={f > at && f < at + 30 ? 1 : 0.3} /></div>
            </div>
          );
        })}
      </Glass>
      <Sfx at={2} name="pop" vol={0.6} /><Sfx at={12} name="whoosh" vol={0.4} /><Sfx at={cpAt} name="success" vol={0.6} />
      {lines.map((_, i) => <Sfx key={i} at={readAt + i * 9} name="tick" vol={0.6} />)}
    </AbsoluteFill>
  );
};

/* ============ ÜCRETSİZ: açık kaynak, abonelik yok, kredi yok ============ */
export const Bedava: React.FC = () => {
  const f = useCurrentFrame();
  const a0 = Math.min(1, pop(f, 2, 12));
  const abAt = sec(rel('bedava', 'l06', 0.05)), krAt = sec(rel('bedava', 'l06', 0.55)), zAt = sec(rel('bedava', 'l06', 0.95));
  const z = slam(f, zAt);
  return (
    <AbsoluteFill>
      <Glass style={{ left: 190, top: 450, width: 700, height: 250, opacity: a0, transform: `scale(${Math.min(1.03, a0)})` }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 40, textAlign: 'center', font: `900 100px ${mono}`, ...copperText }}>{'{ }'}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center', font: `800 40px ${tight}`, color: '#fff' }}>açık kaynak model</div>
      </Glass>
      {[['abonelik', abAt, 140], ['kredi', krAt, 560]].map(([s, at, x]) => {
        const a = pop(f, at as number, 10); const cut = clamp((f - (at as number) - 4) / 5);
        return a > 0 ? (
          <Glass key={s as string} style={{ left: x as number, top: 750, width: 380, height: 140, opacity: clamp(a), transform: `scale(${Math.min(1.05, a)})`, borderColor: 'rgba(239,75,75,.35)' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 44, textAlign: 'center', font: `800 44px ${tight}`, color: C.dim }}>{s as string}</div>
            <svg width={380} height={140} style={{ position: 'absolute', inset: 0 }}><line x1={50} y1={72} x2={50 + 280 * cut} y2={72} stroke="#ef4b4b" strokeWidth={8} strokeLinecap="round" /></svg>
          </Glass>) : null;
      })}
      {f >= zAt - 2 && <div style={{ position: 'absolute', left: 0, right: 0, top: 930, textAlign: 'center', transform: `scale(${z.s})`, opacity: z.o }}>
        <span style={{ display: 'inline-block', padding: '14px 44px', borderRadius: 50, background: C.copper, color: C.dark, font: `900 72px/1 ${tight}` }}>0 ₺</span></div>}
      <Sfx at={2} name="pop" vol={0.6} /><Sfx at={abAt + 4} name="error" vol={0.5} /><Sfx at={krAt + 4} name="error" vol={0.5} /><Sfx at={zAt} name="impact" vol={0.8} />
    </AbsoluteFill>
  );
};

/* ============ TEST: A mı B mi ============ */
export const Test: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const aS = sec(rel('test', 'l08')), aE = sec(rel('test', 'l08', 1)), bS = sec(rel('test', 'l09')), bE = sec(rel('test', 'l09', 1));
  const card = (k: 'A' | 'B', x: number, s0: number, s1: number, appear: number) => {
    const a = Math.min(1, pop(f, appear, 12)); const on = f >= s0 && f < s1; const done = f >= s1;
    const pr = clamp((f - s0) / Math.max(1, s1 - s0));
    return (
      <Glass key={k} style={{ left: x, top: 470, width: 430, height: 560, opacity: a, transform: `scale(${Math.min(1.03, a) * (on ? 1.04 : 1)})`, borderColor: on ? C.copper : C.glassLine, boxShadow: on ? '0 0 80px rgba(232,135,92,.3)' : 'none' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 40, textAlign: 'center', font: `900 170px/1 ${tight}`, ...(on || done ? copperText : { color: 'rgba(255,255,255,.25)' }) }}>{k}</div>
        <div style={{ position: 'absolute', left: 40, top: 270 }}><Wave w={350} h={120} n={28} seed={k === 'A' ? 21 : 34} active={on ? 1 : 0} progress={on || done ? pr : 0} /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 440, display: 'flex', justifyContent: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px', borderRadius: 22, background: on ? C.copper : 'rgba(255,255,255,.07)', color: on ? C.dark : C.dim, font: `800 28px ${inter}` }}>
            {on ? <><svg width={22} height={22} viewBox="0 0 24 24" fill={C.dark}><path d="M7 4v16l13-8z" /></svg>çalıyor</> : done ? 'dinlendi' : 'sırada'}</span></div>
      </Glass>
    );
  };
  const qAt = bE - 2; const q = Math.min(1, pop(f, qAt, 12));
  return (
    <AbsoluteFill>
      {card('A', 90, aS, aE, 4)}{card('B', 560, bS, bE, 8)}
      {f >= qAt && <div style={{ position: 'absolute', left: 0, right: 0, top: 1066, textAlign: 'center', opacity: q, transform: `scale(${Math.min(1.05, q)})` }}>
        <span style={{ font: `900 64px ${tight}`, color: '#fff' }}>A mı, <span style={{ font: `italic 400 76px ${serif}`, ...copperText }}>B mi?</span></span></div>}
      <Sfx at={4} name="pop" vol={0.5} /><Sfx at={8} name="pop" vol={0.5} /><Sfx at={aS - 2} name="tap" vol={0.5} /><Sfx at={bS - 2} name="tap" vol={0.5} /><Sfx at={qAt} name="impact" vol={0.6} />
      {t < 0 && null}
    </AbsoluteFill>
  );
};

/* ============ KONTROL: denemeler, yazıya dök, yeniden üret ============ */
export const Kontrol: React.FC = () => {
  const f = useCurrentFrame();
  const rows: [string, string, boolean, number][] = [
    ['deneme 1', 'kelime yuttu', false, sec(rel('kontrol', 'l10', 0.55))],
    ['deneme 2', 'boşluk bıraktı', false, sec(rel('kontrol', 'l10', 0.8))],
    ['deneme 3', 'metinle birebir', true, sec(rel('kontrol', 'l11', 0.75))],
  ];
  const scanAt = sec(rel('kontrol', 'l11', 0.1)); const scan = prog(f, scanAt, sec(1.2));
  return (
    <AbsoluteFill>
      <Glass style={{ left: 90, top: 450, width: 900, height: 600, opacity: Math.min(1, pop(f, 2, 12)) }}>
        <div style={{ position: 'absolute', left: 36, top: 30, display: 'flex', alignItems: 'center', gap: 12, font: `700 24px ${inter}`, color: C.dim, letterSpacing: '.1em' }}><Spark size={24} />CÜMLE KONTROLÜ</div>
        {rows.map(([n, d, ok, at], i) => {
          const a = pop(f, at, 10);
          return (
            <div key={n} style={{ position: 'absolute', left: 36, right: 36, top: 100 + i * 150, height: 124, borderRadius: 24, background: ok ? 'rgba(232,135,92,.14)' : 'rgba(255,255,255,.04)', border: `2px solid ${ok ? C.copper : 'rgba(255,255,255,.08)'}`, opacity: clamp(a), transform: `translateX(${(1 - clamp(a)) * 40}px)` }}>
              <div style={{ position: 'absolute', left: 28, top: 22, font: `800 32px ${tight}`, color: '#fff' }}>{n}</div>
              <div style={{ position: 'absolute', left: 28, top: 70, font: `600 26px ${inter}`, color: ok ? C.copper2 : '#ef7b6b' }}>{d}</div>
              <div style={{ position: 'absolute', left: 300, top: 32 }}><Wave w={380} h={60} n={30} seed={40 + i} active={0} color={ok ? C.copper : 'rgba(239,123,107,.6)'} /></div>
              <div style={{ position: 'absolute', right: 26, top: 32, width: 60, height: 60, borderRadius: 30, background: ok ? C.copper : 'rgba(239,75,75,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ok ? <Check s={34} /> : <Cross s={30} />}</div>
            </div>
          );
        })}
        {f >= scanAt && scan < 1 && <div style={{ position: 'absolute', left: 36, right: 36, top: 100 + 2 * 150 + 124 * scan, height: 4, background: C.copper2, boxShadow: `0 0 20px ${C.copper}`, opacity: f < rows[2][3] ? 1 : 0 }} />}
      </Glass>
      {rows.map(([, , ok, at], i) => <Sfx key={i} at={at} name={ok ? 'success' : 'error'} vol={0.55} />)}
    </AbsoluteFill>
  );
};

/* ============ KURAL: sadece kendi sesin ============ */
export const Kural: React.FC = () => {
  const f = useCurrentFrame();
  const okAt = sec(rel('kural', 'l12', 0.5)); const s = slam(f, okAt);
  return (
    <AbsoluteFill>
      <Glass style={{ left: 190, top: 470, width: 700, height: 300, borderColor: C.copper, boxShadow: '0 0 70px rgba(232,135,92,.2)', transform: `scale(${s.s})`, opacity: s.o }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 50, display: 'flex', justifyContent: 'center' }}><div style={{ width: 100, height: 100, borderRadius: 50, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check s={60} /></div></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 180, textAlign: 'center', font: `900 54px ${tight}`, color: '#fff' }}>sadece <span style={{ font: `italic 400 64px ${serif}`, ...copperText }}>kendi sesin</span></div>
      </Glass>
      <Chip a={pop(f, okAt + 8, 10)} style={{ left: 290, top: 830, color: C.dim, borderColor: 'rgba(239,75,75,.35)' }}><Cross s={26} c="#ef7b6b" />başkasının sesi: izinsiz olmaz</Chip>
      <Sfx at={okAt} name="impact" vol={0.7} /><Sfx at={okAt + 8} name="pop" vol={0.5} />
    </AbsoluteFill>
  );
};

/* ============ FİNAL ============ */
export const Final: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const sesAt = sec(rel('final', 'l13', 0.55));
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 480, display: 'flex', justifyContent: 'center', gap: 40 }}>
        {['A', 'B'].map((k, i) => { const a = Math.min(1, pop(f, 2 + i * 4, 12)); return (
          <div key={k} style={{ width: 200, height: 200, borderRadius: 40, background: C.glass, border: `2px solid ${C.glassLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `900 120px/1 ${tight}`, ...copperText, opacity: a, transform: `scale(${a}) rotate(${(i ? 5 : -5) + Math.sin(t * 2 + i) * 2}deg)` }}>{k}</div>); })}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 730, textAlign: 'center', font: `800 44px ${tight}`, color: '#fff', opacity: prog(f, 6, 10) }}>cevabını yorumlara yaz</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 830, textAlign: 'center', transform: `scale(${Math.min(1.05, pop(f, sesAt, 14)) * (1 + 0.03 * Math.sin(t * 5))})`, opacity: Math.min(1, pop(f, sesAt, 14)) }}>
        <span style={{ display: 'inline-block', padding: '20px 60px', borderRadius: 70, background: C.copper, color: C.dark, font: `900 104px/1 ${tight}`, boxShadow: '0 18px 50px rgba(232,135,92,.4)' }}>“SES”</span>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1000, textAlign: 'center', font: `italic 400 56px ${serif}`, color: C.copper2, opacity: prog(f, sesAt + 10, 10) }}>kurulum + prompt DM’de</div>
      <Sfx at={2} name="pop" vol={0.5} /><Sfx at={6} name="pop" vol={0.5} /><Sfx at={sesAt} name="impact" vol={0.7} />
    </AbsoluteFill>
  );
};
export { EASE };
