import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { C, FPS, sec, prog, pop, rel, inter, tight, serif, mono, copperText, EASE } from './theme';
import { Glass, Sfx, Spark } from './components';

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const slam = (f: number, at: number) => { const p = pop(f, at, 10); return { s: 1 + (1 - Math.min(1, p)) * 1.1, o: clamp((f - at) / 4) }; };
const Check: React.FC<{ s?: number; c?: string }> = ({ s = 28, c = C.dark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
const Win: React.FC<{ x: number; y: number; w: number; h: number; title: string; a: number; children?: React.ReactNode; dark?: boolean }> = ({ x, y, w, h, title, a, children, dark = true }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 26, overflow: 'hidden', background: dark ? '#14131b' : '#f4f1ec', border: '2px solid rgba(255,255,255,.12)', boxShadow: '0 40px 80px rgba(0,0,0,.5)',
    opacity: Math.min(1, a), transform: `translateY(${(1 - Math.min(1, a)) * 80}px) scale(${0.92 + 0.08 * Math.min(1.03, a)})` }}>
    <div style={{ height: 48, display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px', background: dark ? '#1e1c28' : '#e6e1d9', font: `600 19px ${inter}`, color: dark ? 'rgba(245,239,233,.6)' : '#6b6560' }}>
      <span style={{ width: 13, height: 13, borderRadius: 7, background: '#ff6b6b' }} /><span style={{ width: 13, height: 13, borderRadius: 7, background: '#ffd23f' }} /><span style={{ width: 13, height: 13, borderRadius: 7, background: '#5fd068' }} />&nbsp;&nbsp;{title}
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 48, bottom: 0 }}>{children}</div>
  </div>
);
const BigNum: React.FC<{ n: number; f: number }> = ({ n, f }) => { const a = pop(f, 0, 14); return (
  <div style={{ position: 'absolute', right: 70, top: 440, width: 120, height: 120, borderRadius: 60, border: `3px solid ${C.copper}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `900 64px ${tight}`, color: '#fff', transform: `scale(${Math.min(1.05, a)}) rotate(${(1 - Math.min(1, a)) * -40}deg)`, opacity: Math.min(1, a), boxShadow: '0 0 40px rgba(232,135,92,.35)' }}>{n}</div>); };
const FileIcon: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div style={{ width: 120, textAlign: 'center' }}>
    <div style={{ width: 84, height: 104, margin: '0 auto', borderRadius: 12, background: '#fff', position: 'relative', boxShadow: '0 8px 18px rgba(0,0,0,.25)' }}>
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 14, height: 26, borderRadius: 6, background: color, color: '#fff', font: `800 14px ${inter}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{label.split('.').pop()?.toUpperCase()}</div>
    </div>
    <div style={{ marginTop: 10, font: `600 17px ${inter}`, color: '#4a4540' }}>{label}</div>
  </div>
);

/* ============ KANCA ============ */
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const how = sec(rel('hook', 'l02', 0.55)), proof = sec(rel('hook', 'l03'));
  const imgs = ['img/r1.jpg', 'img/r2.jpg', 'img/r3.jpg', 'img/r4.jpg', 'img/r5.jpg'];
  const t = f / FPS;
  return (
    <AbsoluteFill>
      {imgs.map((src, i) => {
        const a = pop(f, 2 + i * 3, 14), off = i - 2;
        const focus = f >= proof ? prog(f, proof, 12) : 0;
        const x = 540 + off * 170 * (1 - focus * 0.2), rot = off * 9 * (1 - focus), y = 520 + Math.abs(off) * 40 + Math.sin(t * 1.4 + i) * 8;
        return (
          <div key={i} style={{ position: 'absolute', left: x - 140, top: y, width: 280, height: 520, borderRadius: 34, overflow: 'hidden', border: '6px solid #16151a', boxShadow: '0 30px 60px rgba(0,0,0,.55)', zIndex: 10 - Math.abs(off),
            transform: `rotate(${rot}deg) scale(${Math.min(1.04, a) * (off === 0 ? 1.08 : 0.95)})`, opacity: Math.min(1, a) }}>
            <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        );
      })}
      {f >= how && f < proof && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', zIndex: 20, transform: `scale(${slam(f, how).s}) rotate(-6deg)`, opacity: slam(f, how).o }}>
          <span style={{ display: 'inline-block', padding: '14px 40px', borderRadius: 24, border: `6px solid ${C.copper}`, background: 'rgba(6,7,12,.9)', boxShadow: '0 20px 60px rgba(0,0,0,.6)' }}><span style={{ font: `900 120px/1 ${tight}`, letterSpacing: '-.03em', ...copperText }}>NASIL?</span></span>
        </div>
      )}
      {f >= proof && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 1080, display: 'flex', justifyContent: 'center', zIndex: 20, transform: `scale(${Math.min(1.06, pop(f, proof + 6, 12))})` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 26px', borderRadius: 30, background: C.copper, color: C.dark, font: `800 30px ${inter}` }}><Spark size={30} color={C.dark} />Claude Code ile yapıldı</div>
        </div>
      )}
      {imgs.map((_, i) => <Sfx key={i} at={2 + i * 3} name="pop" vol={0.4} />)}
      <Sfx at={0} name="impact" vol={0.8} /><Sfx at={how} name="impact" vol={0.9} /><Sfx at={proof + 6} name="success" vol={0.6} />
    </AbsoluteFill>
  );
};

/* ============ 1) UYGULAMAYI İNDİR ============ */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const notB = sec(rel('s1', 'l05'));
  const dl = interpolate(f, [8, sec(rel('s1', 'l04', 0.9))], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lap = pop(f, 0, 14);
  return (
    <AbsoluteFill>
      <BigNum n={1} f={f} />
      <div style={{ position: 'absolute', left: 140, top: 560, width: 800, opacity: Math.min(1, lap), transform: `translateY(${(1 - Math.min(1, lap)) * 60}px)` }}>
        <div style={{ height: 470, borderRadius: '28px 28px 8px 8px', border: '14px solid #26242e', background: 'linear-gradient(160deg,#2b2240,#17141f)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center' }}><Spark size={110} /></div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', font: `800 40px ${tight}`, color: '#fff' }}>Claude masaüstü</div>
          <div style={{ position: 'absolute', left: 120, right: 120, top: 330, height: 16, borderRadius: 8, background: 'rgba(255,255,255,.1)' }}>
            <div style={{ width: `${dl * 100}%`, height: '100%', borderRadius: 8, background: C.copper }} /></div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 362, textAlign: 'center', font: `700 24px ${mono}`, color: dl >= 1 ? C.copper2 : C.dim }}>{dl >= 1 ? 'Kuruldu ✓' : `İndiriliyor %${Math.round(dl * 100)}`}</div>
        </div>
        <div style={{ height: 26, margin: '0 -60px', borderRadius: '0 0 30px 30px', background: '#2f2d38' }} />
      </div>
      {f >= notB && (
        <Win x={190} y={760} w={700} h={330} title="tarayıcı · claude.ai" a={pop(f, notB, 12)} dark={false}>
          <div style={{ padding: 30, font: `600 26px ${inter}`, color: '#6b6560' }}>Sohbet sekmesi…</div>
          <svg width={700} height={282} style={{ position: 'absolute', inset: 0 }}><g opacity={clamp((f - notB - 6) / 4)} stroke="#ef4b4b" strokeWidth={14} strokeLinecap="round"><line x1={60} y1={30} x2={640} y2={250} /><line x1={640} y1={30} x2={60} y2={250} /></g></svg>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, textAlign: 'center', font: `900 34px ${tight}`, color: '#ef4b4b', opacity: clamp((f - notB - 8) / 4) }}>TARAYICI DEĞİL</div>
        </Win>
      )}
      <Sfx at={sec(rel('s1', 'l04', 0.9))} name="success" vol={0.6} /><Sfx at={notB + 6} name="error" vol={0.8} />
    </AbsoluteFill>
  );
};

/* ============ 2) KLASÖR ============ */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const named = sec(rel('s2', 'l06', 0.55)), files = sec(rel('s2', 'l07'));
  const nm = 'AI Video Editörü'; const typed = nm.slice(0, Math.floor(clamp((f - named) / 18) * nm.length));
  const fl: [string, string][] = [['skill.md', '#7a62e6'], ['ses.wav', '#3aa36b'], ['reel.mp4', '#e8875c']];
  return (
    <AbsoluteFill>
      <BigNum n={2} f={f} />
      <Win x={90} y={600} w={900} h={520} title="Masaüstü" a={pop(f, 0, 14)} dark={false}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 200, background: '#ece8e1', padding: 22, font: `600 20px/2 ${inter}`, color: '#8a837b' }}>Masaüstü<br />Belgeler<br />İndirilenler</div>
        <div style={{ position: 'absolute', left: 240, top: 40, display: 'flex', gap: 34 }}>
          {['Projeler', 'Fotoğraflar'].map((n) => <div key={n} style={{ width: 130, textAlign: 'center' }}><div style={{ width: 110, height: 84, margin: '0 auto', borderRadius: 12, background: '#7fb3ef' }} /><div style={{ marginTop: 10, font: `600 18px ${inter}`, color: '#4a4540' }}>{n}</div></div>)}
          {(() => { const a = pop(f, 10, 14); return a > 0 ? (
            <div style={{ width: 200, textAlign: 'center', transform: `scale(${Math.min(1.05, a)})` }}>
              <div style={{ width: 110, height: 84, margin: '0 auto', borderRadius: 12, background: C.copper, boxShadow: f < files ? `0 0 0 4px rgba(232,135,92,.35)` : 'none' }} />
              <div style={{ marginTop: 10, font: `700 18px ${inter}`, color: '#2a2520', padding: '2px 6px', borderRadius: 6, background: f < named + 22 && f >= named ? 'rgba(232,135,92,.25)' : 'transparent' }}>{f >= named ? typed || '|' : 'adsız klasör'}</div>
            </div>) : null; })()}
        </div>
        {f >= files && <div style={{ position: 'absolute', left: 240, right: 30, top: 230, height: 220, borderRadius: 18, background: '#fff', border: '2px solid #e6e1d9', display: 'flex', gap: 30, alignItems: 'center', padding: '0 30px' }}>
          {fl.map(([n, c], i) => { const a = pop(f, files + 4 + i * 5, 12); return a > 0 ? <div key={n} style={{ transform: `translateY(${(1 - Math.min(1, a)) * -60}px)`, opacity: Math.min(1, a) }}><FileIcon label={n} color={c} /></div> : null; })}
        </div>}
      </Win>
      <Sfx at={10} name="pop" vol={0.6} />{fl.map((_, i) => <Sfx key={i} at={files + 4 + i * 5} name="tap" vol={0.6} />)}
    </AbsoluteFill>
  );
};

/* ============ 3) YEREL SOHBET ============ */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const pick = sec(rel('s3', 'l08', 0.45)), folder = sec(rel('s3', 'l08', 0.8)), rw = sec(rel('s3', 'l09', 0.3));
  const menu = f >= pick - 8 && f < pick + 10;
  return (
    <AbsoluteFill>
      <BigNum n={3} f={f} />
      <Win x={90} y={600} w={900} h={480} title="Claude Code · yeni sohbet" a={pop(f, 0, 14)}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 60, display: 'flex', justifyContent: 'center' }}><Spark size={64} /></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', font: `italic 400 52px ${serif}`, color: '#fff' }}>Ne yapalım?</div>
        <div style={{ position: 'absolute', left: 50, right: 50, top: 240, height: 150, borderRadius: 22, border: '2px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.03)' }}>
          <div style={{ position: 'absolute', left: 22, top: 20, font: `500 24px ${inter}`, color: 'rgba(245,239,233,.4)' }}>Claude’a bir şey sor…</div>
          <div style={{ position: 'absolute', left: 18, bottom: 16, display: 'flex', gap: 12 }}>
            <span style={{ padding: '8px 16px', borderRadius: 12, background: f >= pick ? C.copper : 'rgba(255,255,255,.08)', color: f >= pick ? C.dark : '#fff', font: `800 22px ${inter}` }}>{f >= pick ? 'Yerel' : 'Bulut'} ▾</span>
            {f >= folder && <span style={{ padding: '8px 16px', borderRadius: 12, background: 'rgba(232,135,92,.18)', border: `2px solid ${C.copper}`, color: C.copper2, font: `700 22px ${inter}`, transform: `scale(${Math.min(1.05, pop(f, folder, 10))})` }}>📁 AI Video Editörü</span>}
          </div>
        </div>
        {menu && <div style={{ position: 'absolute', left: 68, top: 400, width: 220, borderRadius: 16, background: '#262433', border: '2px solid rgba(255,255,255,.12)', padding: 8, font: `700 22px ${inter}` }}>
          {['Yerel', 'Bulut'].map((o) => <div key={o} style={{ padding: '10px 14px', borderRadius: 10, background: o === 'Yerel' && f >= pick - 2 ? 'rgba(232,135,92,.25)' : 'transparent', color: '#fff' }}>{o}</div>)}
        </div>}
      </Win>
      {f >= rw && <div style={{ position: 'absolute', left: 0, right: 0, top: 1100, textAlign: 'center', transform: `scale(${slam(f, rw).s})`, opacity: slam(f, rw).o }}>
        <span style={{ font: `900 76px ${tight}`, letterSpacing: '-.02em', filter: 'drop-shadow(0 0 24px rgba(232,135,92,.5))', ...copperText }}>OKU + YAZ</span></div>}
      <Sfx at={pick - 8} name="tap" vol={0.8} /><Sfx at={pick} name="tap" vol={0.8} /><Sfx at={folder} name="pop" vol={0.6} /><Sfx at={rw} name="impact" vol={0.7} />
    </AbsoluteFill>
  );
};

/* ============ 4) KURULUM KONTROLÜ ============ */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const cmd = 'kurulumumu kontrol et'; const typed = cmd.slice(0, Math.floor(clamp((f - sec(rel('s4', 'l10', 0.35))) / 16) * cmd.length));
  const go = sec(rel('s4', 'l11'));
  const tools: [string, number][] = [['Node.js', 0], ['FFmpeg', 1], ['Remotion', 0], ['Chromium', 1]];
  return (
    <AbsoluteFill>
      <BigNum n={4} f={f} />
      <Win x={90} y={600} w={900} h={500} title="Claude Code · AI Video Editörü" a={pop(f, 0, 14)}>
        <div style={{ position: 'absolute', left: 40, right: 40, top: 30, padding: '18px 22px', borderRadius: 18, background: 'rgba(232,135,92,.12)', border: `2px solid rgba(232,135,92,.4)`, font: `700 30px ${mono}`, color: '#fff' }}>&gt; {typed}<span style={{ opacity: Math.floor(f / 8) % 2 ? 1 : 0 }}>▍</span></div>
        <div style={{ position: 'absolute', left: 40, right: 40, top: 130 }}>
          {f >= go - 4 && <div style={{ font: `700 22px ${inter}`, color: C.dim, marginBottom: 14 }}>Kurulum kontrol ediliyor…</div>}
          {tools.map(([n, missing], i) => {
            const at = go + i * 7; if (f < at) return null;
            const installing = missing && f < at + 22; const done = !installing;
            return (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 18, height: 66, font: `700 30px ${mono}`, color: '#fff', opacity: Math.min(1, pop(f, at, 8)) }}>
                <span style={{ width: 38, height: 38, borderRadius: 19, background: done ? C.copper : 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{done ? <Check s={24} /> : <span style={{ width: 14, height: 14, borderRadius: 7, border: '3px solid #fff', borderTopColor: 'transparent', transform: `rotate(${f * 20}deg)` }} />}</span>
                {n}<span style={{ font: `600 22px ${inter}`, color: missing ? C.copper2 : C.dim }}>{missing ? (installing ? 'eksik · kuruluyor…' : 'kuruldu') : 'hazır'}</span>
              </div>
            );
          })}
        </div>
      </Win>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 1140, textAlign: 'center', font: `500 22px ${inter}`, color: 'rgba(245,239,233,.5)', opacity: prog(f, go, 10) }}>Kurulumlar senin onayınla yapılır.</div>
      {tools.map((_, i) => <Sfx key={i} at={go + i * 7 + (tools[i][1] ? 22 : 0)} name="tick" vol={0.9} />)}
    </AbsoluteFill>
  );
};

/* ---- çay + yağmur (özgün çizim) ---- */
const ChaiRain: React.FC<{ f: number; w: number; h: number }> = ({ f, w, h }) => {
  const t = f / FPS;
  return (
    <svg width={w} height={h} viewBox="0 0 300 540" style={{ display: 'block' }}>
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d2240" /><stop offset="1" stopColor="#3b3460" /></linearGradient></defs>
      <rect width={300} height={540} fill="url(#sky)" />
      <rect x={30} y={60} width={240} height={250} rx={12} fill="#2a2f55" stroke="#8a5232" strokeWidth={10} />
      <line x1={150} y1={60} x2={150} y2={310} stroke="#8a5232" strokeWidth={6} /><line x1={30} y1={185} x2={270} y2={185} stroke="#8a5232" strokeWidth={6} />
      {Array.from({ length: 26 }).map((_, i) => { const x = 40 + (i * 37) % 225, y = 70 + ((i * 53 + t * 260) % 230); return <line key={i} x1={x} y1={y} x2={x - 4} y2={y + 14} stroke="rgba(180,200,255,.6)" strokeWidth={2} />; })}
      <rect x={0} y={360} width={300} height={180} fill="#5a3a26" />
      <path d="M95 380 L205 380 L195 470 Q190 492 150 492 Q110 492 105 470 Z" fill="#fff" opacity={0.92} />
      <path d="M103 396 L197 396 L192 462 Q188 480 150 480 Q112 480 108 462 Z" fill="#b5501f" />
      <path d="M205 400 Q240 404 236 430 Q232 452 200 452" fill="none" stroke="#fff" strokeWidth={8} opacity={0.92} />
      {[0, 1, 2].map((k) => <path key={k} d={`M${130 + k * 20} 370 q ${Math.sin(t * 3 + k) * 8} -20 0 -40 q ${-Math.sin(t * 3 + k) * 8} -20 0 -40`} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={4} strokeLinecap="round" />)}
    </svg>
  );
};

/* ============ 5) TEK SATIR ============ */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = 'yağmurda çay neden daha güzel, bunun reels’ini yap';
  const ts = sec(rel('s5', 'l13', 0.15)); const typed = p.slice(0, Math.floor(clamp((f - ts) / 40) * p.length));
  const sent = sec(rel('s5', 'l13', 0.95)), outs = sec(rel('s5', 'l14'));
  const items: [string, string][] = [['Senaryo', 'senaryo.md'], ['Seslendirme', 'ses.wav'], ['Animasyon', 'sahneler'], ['Altyazı', 'altyazi.srt']];
  const fun = pop(f, 0, 14);
  return (
    <AbsoluteFill>
      <BigNum n={5} f={f} />
      {f < ts && <div style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', transform: `scale(${Math.min(1.05, fun)}) rotate(-4deg)`, opacity: Math.min(1, fun) * (1 - prog(f, ts - 6, 6)) }}>
        <div style={{ font: `900 130px/0.95 ${tight}`, color: '#fff', letterSpacing: '-.04em' }}>SADECE</div>
        <div style={{ font: `900 150px/1 ${tight}`, letterSpacing: '-.04em', ...copperText }}>1 SATIR</div></div>}
      {f >= ts && <>
        <div style={{ position: 'absolute', left: 70, right: 70, top: 600, padding: '24px 28px', borderRadius: 24, background: '#14131b', border: `2px solid ${f >= sent ? C.copper : 'rgba(255,255,255,.14)'}`, font: `600 32px/1.35 ${inter}`, color: '#fff', minHeight: 140, opacity: Math.min(1, pop(f, ts - 4, 10)) }}>
          {typed}<span style={{ opacity: f < sent && Math.floor(f / 8) % 2 ? 1 : 0, color: C.copper }}>▍</span>
          <span style={{ position: 'absolute', right: 18, bottom: 16, padding: '6px 12px', borderRadius: 10, background: 'rgba(255,255,255,.08)', font: `700 18px ${inter}`, color: C.dim }}>1 satır</span>
        </div>
        {f >= outs && <div style={{ position: 'absolute', left: 70, top: 800, width: 560 }}>
          {items.map(([n, file], i) => { const a = pop(f, outs + i * 9, 10); return a > 0 ? (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16, height: 76, marginBottom: 12, padding: '0 20px', borderRadius: 20, background: 'rgba(255,255,255,.05)', border: '2px solid rgba(255,255,255,.1)', opacity: Math.min(1, a), transform: `translateX(${(1 - Math.min(1, a)) * -60}px)` }}>
              <span style={{ width: 40, height: 40, borderRadius: 20, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check s={24} /></span>
              <span style={{ font: `800 30px ${tight}`, color: '#fff' }}>{n}</span><span style={{ marginLeft: 'auto', font: `600 20px ${mono}`, color: C.dim }}>{file}</span>
            </div>) : null; })}
        </div>}
        {f >= outs + 6 && <div style={{ position: 'absolute', left: 660, top: 790, width: 300, height: 540, borderRadius: 36, overflow: 'hidden', border: '6px solid #16151a', boxShadow: '0 30px 60px rgba(0,0,0,.55)', transform: `scale(${Math.min(1.04, pop(f, outs + 6, 14))}) rotate(3deg)`, transformOrigin: 'top center' }}>
          <ChaiRain f={f} w={300} h={540} />
        </div>}
      </>}
      <Sfx at={0} name="rise" vol={0.6} /><Sfx at={sent} name="tap" vol={0.9} />{items.map((_, i) => <Sfx key={i} at={outs + i * 9} name="tick" vol={0.9} />)}<Sfx at={outs + 6} name="shimmer" vol={0.5} />
    </AbsoluteFill>
  );
};

/* ============ 6) DÜZELT, BİTİR ============ */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const b1 = 6, b2 = 6 + sec(0.7), render = sec(rel('s6', 'l15', 0.6));
  const rp = interpolate(f, [render, render + sec(1.0)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
  const Bubble: React.FC<{ at: number; me?: boolean; text: string; y: number }> = ({ at, me, text, y }) => { const a = pop(f, at, 10); return a > 0 ? (
    <div style={{ position: 'absolute', top: y, [me ? 'right' : 'left']: 90, maxWidth: 700, padding: '18px 26px', borderRadius: 26, background: me ? C.copper : 'rgba(255,255,255,.08)', color: me ? C.dark : '#fff', font: `700 32px ${inter}`, transform: `scale(${Math.min(1.05, a)})`, transformOrigin: me ? 'right center' : 'left center' } as React.CSSProperties}>{text}</div>) : null; };
  return (
    <AbsoluteFill>
      <BigNum n={6} f={f} />
      <Bubble at={b1} me text="Daha hızlı olsun" y={600} />
      <Bubble at={b2} me text="Renkleri sıcak yap" y={700} />
      <Bubble at={b2 + sec(0.5)} text="Tamam, düzeltiyorum ✓" y={800} />
      {f >= render && <Glass style={{ left: 90, right: 90, top: 920, height: 190 }}>
        <div style={{ position: 'absolute', left: 30, top: 26, font: `800 32px ${mono}`, color: '#fff' }}>{rp >= 1 ? 'reel.mp4 hazır ✓' : 'Render alınıyor…'}</div>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 100, height: 22, borderRadius: 11, background: 'rgba(255,255,255,.08)' }}><div style={{ width: `${rp * 100}%`, height: '100%', borderRadius: 11, background: C.copper }} /></div>
        <div style={{ position: 'absolute', right: 30, top: 30, font: `700 26px ${mono}`, color: C.copper2 }}>%{Math.round(rp * 100)}</div>
      </Glass>}
      <Sfx at={b1} name="pop" vol={0.6} /><Sfx at={b2} name="pop" vol={0.6} /><Sfx at={b2 + sec(0.5)} name="pop" vol={0.5} /><Sfx at={render + sec(1.0)} name="success" vol={0.8} />
    </AbsoluteFill>
  );
};

/* ============ FİNAL ============ */
export const Final: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const steps = ['Uygulamayı indir', 'Klasör aç', 'Yerel sohbet', 'Kurulumu kontrol et', 'Tek satır yaz', 'Düzelt, bitir'];
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 150, right: 150, top: 470 }}>
        {steps.map((s, i) => { const a = pop(f, 2 + i * 3, 10); return a > 0 ? (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 18, height: 70, marginBottom: 10, padding: '0 22px', borderRadius: 20, background: 'rgba(255,255,255,.05)', border: '2px solid rgba(255,255,255,.09)', opacity: Math.min(1, a), transform: `translateX(${(1 - Math.min(1, a)) * 60}px)` }}>
            <span style={{ width: 40, height: 40, borderRadius: 20, background: C.copper, color: C.dark, font: `900 22px ${tight}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
            <span style={{ font: `800 30px ${tight}`, color: '#fff' }}>{s}</span><span style={{ marginLeft: 'auto' }}><Check s={28} c={C.copper2} /></span>
          </div>) : null; })}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1000, textAlign: 'center', transform: `scale(${Math.min(1.05, pop(f, 22, 14)) * (1 + 0.03 * Math.sin(t * 5))})`, opacity: Math.min(1, pop(f, 22, 14)) }}>
        <span style={{ display: 'inline-block', padding: '18px 56px', borderRadius: 70, background: C.copper, color: C.dark, font: `900 96px/1 ${tight}`, letterSpacing: '.02em', boxShadow: '0 18px 50px rgba(232,135,92,.4)' }}>“REELS”</span>
      </div>
      {steps.map((_, i) => <Sfx key={i} at={2 + i * 3} name="tick" vol={0.8} />)}<Sfx at={22} name="impact" vol={0.7} />
    </AbsoluteFill>
  );
};
