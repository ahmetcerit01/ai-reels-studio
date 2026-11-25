import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { C, FPS, sec, prog, pop, rel, inter, tight, serif, mono, copperText, EASE } from './theme';
import { Glass, Sfx, Spark } from './components';

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const slam = (f: number, at: number) => { const p = pop(f, at, 10); return { s: 1 + (1 - Math.min(1, p)) * 1.1, o: clamp((f - at) / 4) }; };
const Check: React.FC<{ s?: number; c?: string }> = ({ s = 26, c = C.dark }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
const Phone: React.FC<{ src: string; x: number; y: number; w?: number; rot?: number; a?: number; z?: number }> = ({ src, x, y, w = 260, rot = 0, a = 1, z = 1 }) => (
  <div style={{ position: 'absolute', left: x - w / 2, top: y, width: w, height: w * 1.78, borderRadius: w * 0.12, overflow: 'hidden', border: '6px solid #16151a', boxShadow: '0 30px 60px rgba(0,0,0,.55)', zIndex: z,
    transform: `rotate(${rot}deg) scale(${Math.min(1.04, a)})`, opacity: clamp(a) }}>
    <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);
const Badge: React.FC<{ children: React.ReactNode; a?: number; style?: React.CSSProperties }> = ({ children, a = 1, style }) => (
  <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 22, background: C.copper, color: C.dark, font: `800 28px ${inter}`, whiteSpace: 'nowrap',
    opacity: clamp(a), transform: `scale(${Math.min(1.06, a)})`, boxShadow: '0 12px 30px rgba(232,135,92,.35)', ...style }}>{children}</div>
);
const Win: React.FC<{ title: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ title, style, children }) => (
  <div style={{ position: 'absolute', borderRadius: 30, background: '#14131b', border: `2px solid ${C.glassLine}`, boxShadow: '0 40px 80px rgba(0,0,0,.5)', overflow: 'hidden', ...style }}>
    <div style={{ height: 58, display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px', borderBottom: `2px solid ${C.glassLine}` }}>
      {['#3a3940', '#3a3940', '#3a3940'].map((c, i) => <span key={i} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />)}
      <span style={{ marginLeft: 14, font: `600 22px ${inter}`, color: C.dim }}>{title}</span>
    </div>
    {children}
  </div>
);
const type = (s: string, f: number, at: number, dur: number) => s.slice(0, Math.floor(clamp((f - at) / Math.max(1, dur)) * s.length));
const Caret: React.FC<{ f: number }> = ({ f }) => <span style={{ display: 'inline-block', width: 4, height: '1em', background: C.copper2, marginLeft: 3, verticalAlign: '-0.15em', opacity: Math.floor(f / 8) % 2 ? 0 : 1 }} />;

/* ============ KANCA: ücretli araçlar → 0 ₺ → sadece kod ============ */
export const Hook: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const stopAt = sec(rel('hook', 'l01', 0.72)), zeroAt = sec(rel('hook', 'l02', 0.5)), codeAt = sec(rel('hook', 'l03', 0.15));
  const paid = ['aylık abonelik', 'kredi paketi', 'video başına ücret'];
  const outA = prog(f, zeroAt - 8, 8);
  const z = slam(f, zeroAt); const up = prog(f, codeAt - 4, 12);
  const code = ['<div class="sahne">', '  <h1>Yağmur</h1>', '  anim.fadeIn(0.6)', '</div>'];
  return (
    <AbsoluteFill>
      {/* ücretli araç kartları */}
      {paid.map((p, i) => {
        const a = Math.min(1, pop(f, 2 + i * 4, 12)); const cut = clamp((f - stopAt - i * 2) / 6);
        return (
          <Glass key={p} style={{ left: 140, top: 470 + i * 190, width: 800, height: 160, opacity: a * (1 - outA), transform: `translateX(${(1 - a) * 60 + outA * -80}px) rotate(${(i - 1) * -1.5}deg)` }}>
            <div style={{ position: 'absolute', left: 40, top: 50, font: `800 46px ${tight}`, color: '#fff' }}>{p}</div>
            <div style={{ position: 'absolute', right: 40, top: 46, font: `800 46px ${mono}`, color: C.copper2 }}>₺₺₺</div>
            <svg width={800} height={160} style={{ position: 'absolute', inset: 0 }}><line x1={30} y1={82} x2={30 + 740 * cut} y2={82} stroke="#ef4b4b" strokeWidth={9} strokeLinecap="round" /></svg>
          </Glass>
        );
      })}
      {/* bizim videolar + 0 ₺ */}
      {f >= zeroAt - 6 && <>
        {['img/a5.jpg', 'img/a1.jpg', 'img/a6.jpg'].map((src, i) => <Phone key={i} src={src} x={540 + (i - 1) * 260} y={480 - up * 40 + Math.abs(i - 1) * 40 + Math.sin(t * 1.4 + i) * 5} w={(i === 1 ? 300 : 250) * (1 - up * 0.25)} rot={(i - 1) * 8} a={pop(f, zeroAt - 6 + i * 2, 12)} z={i === 1 ? 3 : 1} />)}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 700 - up * 150, textAlign: 'center', zIndex: 10, transform: `scale(${z.s * (1 - up * 0.3)})`, opacity: z.o }}>
          <span style={{ display: 'inline-block', padding: '16px 54px', borderRadius: 60, background: C.copper, color: C.dark, font: `900 120px/1 ${tight}`, boxShadow: '0 20px 60px rgba(232,135,92,.45)' }}>0 ₺</span></div>
      </>}
      {f >= codeAt - 4 && <Win title="index.html" style={{ left: 140, top: 830, width: 800, height: 330, zIndex: 12, opacity: up, transform: `translateY(${(1 - up) * 60}px)` }}>
        <div style={{ padding: '22px 30px' }}>{code.map((c, i) => { const a = prog(f, codeAt + 4 + i * 4, 5); return <div key={i} style={{ font: `500 30px/1.6 ${mono}`, color: i % 3 === 0 ? C.copper2 : 'rgba(245,239,233,.85)', opacity: a, whiteSpace: 'pre' }}>{c}</div>; })}</div>
      </Win>}
      <Sfx at={0} name="impact" vol={0.6} />{paid.map((_, i) => <Sfx key={i} at={2 + i * 4} name="pop" vol={0.45} />)}
      <Sfx at={stopAt} name="error" vol={0.6} /><Sfx at={zeroAt} name="impact" vol={0.85} /><Sfx at={codeAt} name="whoosh" vol={0.5} />
      {code.map((_, i) => <Sfx key={`c${i}`} at={codeAt + 4 + i * 4} name="tick" vol={0.5} />)}
    </AbsoluteFill>
  );
};

/* ============ ADIM 1: Node.js + FFmpeg ============ */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const nAt = sec(rel('s1', 'l04', 0.2)), fAt = sec(rel('s1', 'l04', 0.45)), freeAt = sec(rel('s1', 'l04', 0.78)), flowAt = sec(rel('s1', 'l05'));
  const app = (name: string, icon: React.ReactNode, x: number, at: number) => {
    const a = Math.min(1, pop(f, at, 12));
    return (
      <Glass key={name} style={{ left: x, top: 480, width: 430, height: 360, opacity: a, transform: `scale(${Math.min(1.04, a)})` }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 50, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 140, height: 140, borderRadius: 36, background: 'rgba(232,135,92,.14)', border: `2px solid rgba(232,135,92,.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 220, textAlign: 'center', font: `900 52px ${tight}`, color: '#fff' }}>{name}</div>
        <Badge a={pop(f, freeAt + (x > 300 ? 4 : 0), 10)} style={{ left: 120, top: 292 }}><Check s={22} />ücretsiz</Badge>
      </Glass>
    );
  };
  const flow = ['</> kod', 'bilgisayarın', '▶ video.mp4'];
  return (
    <AbsoluteFill>
      {app('Node.js', <svg width={84} height={84} viewBox="0 0 24 24" fill="none" stroke={C.copper2} strokeWidth={1.8}><path d="M12 2 21 7v10l-9 5-9-5V7z" /><path d="M12 8v8" /></svg>, 90, nAt)}
      {app('FFmpeg', <svg width={84} height={84} viewBox="0 0 24 24" fill={C.copper2}><path d="M7 4v16l13-8z" /></svg>, 560, fAt)}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 930, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
        {flow.map((s, i) => { const a = pop(f, flowAt + i * 9, 10); return (
          <React.Fragment key={s}>
            {i > 0 && <span style={{ font: `800 40px ${inter}`, color: C.copper, opacity: clamp(a) }}>→</span>}
            <span style={{ padding: '14px 24px', borderRadius: 22, background: i === 2 ? C.copper : C.glass, border: `2px solid ${i === 2 ? C.copper : C.glassLine}`, color: i === 2 ? C.dark : '#fff', font: `800 30px ${i === 0 ? mono : inter}`, opacity: clamp(a), transform: `scale(${Math.min(1.05, a)})`, display: 'inline-block', whiteSpace: 'nowrap' }}>{s}</span>
          </React.Fragment>); })}
      </div>
      <Sfx at={nAt} name="pop" vol={0.6} /><Sfx at={fAt} name="pop" vol={0.6} /><Sfx at={freeAt} name="success" vol={0.55} />
      {flow.map((_, i) => <Sfx key={i} at={flowAt + i * 9} name="tick" vol={0.6} />)}
    </AbsoluteFill>
  );
};

/* ============ ADIM 2: ayarlar + skill yükle (temsilî ekran) ============ */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const planAt = sec(rel('s2', 'l07', 0.2)), togAt = sec(rel('s2', 'l08', 0.3)), upAt = sec(rel('s2', 'l08', 0.62)), doneAt = sec(rel('s2', 'l08', 0.98));
  const tog = prog(f, togAt, 8); const up = clamp((f - upAt) / Math.max(1, doneAt - upAt));
  const side = ['Genel', 'Yetenekler', 'Özelleştir', 'Hesap'];
  return (
    <AbsoluteFill>
      <Win title="Claude · Ayarlar" style={{ left: 70, top: 460, width: 940, height: 640, opacity: Math.min(1, pop(f, 2, 12)) }}>
        <div style={{ position: 'absolute', left: 0, top: 58, bottom: 0, width: 230, borderRight: `2px solid ${C.glassLine}`, padding: '26px 20px' }}>
          {side.map((s, i) => <div key={s} style={{ padding: '14px 16px', borderRadius: 14, marginBottom: 8, font: `700 25px ${inter}`, color: i === 1 || (i === 2 && f > upAt - 10) ? '#fff' : C.faint, background: (i === 1 && f < upAt - 10) || (i === 2 && f >= upAt - 10) ? 'rgba(255,255,255,.07)' : 'transparent' }}>{s}</div>)}
        </div>
        <div style={{ position: 'absolute', left: 260, right: 30, top: 90 }}>
          <div style={{ font: `800 34px ${tight}`, color: '#fff' }}>Yetenekler</div>
          <div style={{ marginTop: 24, padding: '24px 26px', borderRadius: 20, background: 'rgba(255,255,255,.04)', border: `2px solid ${tog > 0.5 ? 'rgba(232,135,92,.5)' : C.glassLine}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div><div style={{ font: `700 28px ${inter}`, color: '#fff' }}>Kod çalıştırma ve</div><div style={{ font: `700 28px ${inter}`, color: '#fff' }}>dosya oluşturma</div></div>
            <div style={{ width: 96, height: 54, borderRadius: 27, background: tog > 0.5 ? C.copper : 'rgba(255,255,255,.15)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 5, left: 5 + tog * 42, width: 44, height: 44, borderRadius: 22, background: '#fff' }} /></div>
          </div>
          <div style={{ marginTop: 30, font: `800 34px ${tight}`, color: '#fff', opacity: prog(f, upAt - 10, 8) }}>Skill yükle</div>
          <div style={{ marginTop: 20, padding: '22px 26px', borderRadius: 20, border: `2px dashed ${up >= 1 ? C.copper : 'rgba(255,255,255,.2)'}`, opacity: prog(f, upAt - 10, 8), transform: `translateY(${(1 - prog(f, upAt - 10, 10)) * 30}px)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: 'rgba(232,135,92,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `800 22px ${mono}`, color: C.copper2 }}>ZIP</div>
              <div style={{ flex: 1 }}>
                <div style={{ font: `700 28px ${mono}`, color: '#fff' }}>animasyon-skill.zip</div>
                <div style={{ marginTop: 12, height: 12, borderRadius: 6, background: 'rgba(255,255,255,.1)' }}><div style={{ width: `${up * 100}%`, height: '100%', borderRadius: 6, background: C.copper }} /></div>
              </div>
              {up >= 1 && <div style={{ width: 52, height: 52, borderRadius: 26, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.1, pop(f, doneAt, 10))})` }}><Check s={30} /></div>}
            </div>
          </div>
        </div>
      </Win>
      <Badge a={pop(f, planAt, 12)} style={{ right: 110, top: 1060, transform: `rotate(-3deg) scale(${Math.min(1.06, pop(f, planAt, 12))})`, font: `800 32px ${inter}` }}><Check s={26} />Ücretsiz plan</Badge>
      <div style={{ position: 'absolute', left: 90, top: 1112, font: `600 20px ${inter}`, color: C.faint }}>temsilî görünüm</div>
      <Sfx at={2} name="pop" vol={0.5} /><Sfx at={planAt} name="impact" vol={0.6} /><Sfx at={togAt} name="tap" vol={0.8} /><Sfx at={upAt} name="whoosh" vol={0.4} /><Sfx at={doneAt} name="success" vol={0.6} />
    </AbsoluteFill>
  );
};

/* ============ ADIM 3: tek cümle → tek dosya ============ */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const typeAt = sec(rel('s3', 'l09', 0.15)), typeEnd = sec(rel('s3', 'l09', 0.95));
  const items: [string, number][] = [['hikâye', sec(rel('s3', 'l10', 0.1))], ['sahneler', sec(rel('s3', 'l10', 0.22))], ['her hareket', sec(rel('s3', 'l10', 0.36))]];
  const fileAt = sec(rel('s3', 'l10', 0.72)); const fl = slam(f, fileAt);
  const prompt = 'Yağmurda çay neden daha güzel? Kısa bir animasyon yap.';
  const sent = f >= typeEnd + 2;
  return (
    <AbsoluteFill>
      <Win title="Claude" style={{ left: 70, top: 460, width: 940, height: 660, opacity: Math.min(1, pop(f, 2, 12)) }}>
        {!sent && <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, font: `italic 400 60px ${serif}`, color: '#fff' }}><Spark size={44} />İyi akşamlar</div>}
        <div style={{ position: 'absolute', left: 40, right: 40, top: sent ? 90 : 290, padding: '24px 28px', borderRadius: 24, background: sent ? 'rgba(232,135,92,.14)' : 'rgba(255,255,255,.05)', border: `2px solid ${sent ? 'rgba(232,135,92,.4)' : C.glassLine}`, font: `600 30px/1.4 ${inter}`, color: '#fff', minHeight: 110 }}>
          {type(prompt, f, typeAt, typeEnd - typeAt)}{!sent && <Caret f={f} />}
        </div>
        {sent && <div style={{ position: 'absolute', left: 40, right: 40, top: 270 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            {items.map(([s, at]) => { const a = pop(f, at, 10); return <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 20, background: C.glass, border: `2px solid ${C.glassLine}`, font: `700 28px ${inter}`, color: '#fff', opacity: clamp(a), transform: `scale(${Math.min(1.05, a)})` }}><span style={{ width: 34, height: 34, borderRadius: 17, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check s={20} /></span>{s}</span>; })}
          </div>
          {f >= fileAt - 2 && <div style={{ marginTop: 40, padding: '28px 30px', borderRadius: 26, background: '#1d1b24', border: `2px solid ${C.copper}`, boxShadow: '0 0 60px rgba(232,135,92,.25)', display: 'flex', alignItems: 'center', gap: 22, transform: `scale(${fl.s})`, opacity: fl.o }}>
            <div style={{ width: 90, height: 110, borderRadius: 14, background: 'rgba(232,135,92,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `800 28px ${mono}`, color: C.copper2 }}>&lt;/&gt;</div>
            <div style={{ flex: 1 }}><div style={{ font: `800 40px ${mono}`, color: '#fff' }}>index.html</div><div style={{ marginTop: 8, font: `600 26px ${inter}`, color: C.dim }}>tek dosya · indir</div></div>
            <div style={{ width: 70, height: 70, borderRadius: 35, background: C.copper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth={3} strokeLinecap="round"><path d="M12 4v12M6 11l6 6 6-6M5 20h14" /></svg></div>
          </div>}
        </div>}
      </Win>
      <Sfx at={2} name="pop" vol={0.5} /><Sfx at={typeAt} name="tap" vol={0.6} /><Sfx at={typeEnd + 2} name="whoosh" vol={0.45} />
      {items.map(([, at], i) => <Sfx key={i} at={at} name="tick" vol={0.6} />)}<Sfx at={fileAt} name="impact" vol={0.75} />
    </AbsoluteFill>
  );
};

/* ============ SİHİR: tek komut → bitmiş video ============ */
export const Sihir: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const cmdAt = sec(rel('sihir', 'l12', 0.0)), cmdEnd = sec(rel('sihir', 'l12', 0.9)), runAt = cmdEnd + 3, doneAt = sec(rel('sihir', 'l13', 0.62));
  const p = clamp((f - runAt) / Math.max(1, doneAt - runAt)); const ph = slam(f, doneAt);
  const cmd = 'npx hyperframes render -o video.mp4';
  const termA = Math.min(1, pop(f, 2, 12));
  return (
    <AbsoluteFill>
      {/* parıltılar */}
      {Array.from({ length: 10 }).map((_, i) => { const a = Math.max(0, Math.sin(t * 3 + i * 1.7)); return <div key={i} style={{ position: 'absolute', left: 120 + ((i * 337) % 840), top: 430 + ((i * 211) % 700), opacity: a * prog(f, 0, 10) * 0.8, transform: `scale(${0.5 + a})` }}><Spark size={26} color={C.copper2} /></div>; })}
      <Win title="Terminal" style={{ left: 70, top: 470, width: 940, height: 420, opacity: termA * (1 - 0.45 * prog(f, doneAt - 6, 10)), transform: `scale(${Math.min(1.02, termA) * (1 - 0.06 * prog(f, doneAt - 6, 10))})` }}>
        <div style={{ padding: '26px 32px', font: `600 30px/1.7 ${mono}`, color: 'rgba(245,239,233,.85)' }}>
          <div><span style={{ color: C.faint }}>~/video %</span> ls</div>
          <div style={{ color: C.copper2 }}>index.html</div>
          <div><span style={{ color: C.faint }}>~/video %</span> <span style={{ color: '#fff' }}>{type(cmd, f, cmdAt, cmdEnd - cmdAt)}</span>{f < runAt && f >= cmdAt - 10 && <Caret f={f} />}</div>
          {f >= runAt && <>
            <div style={{ marginTop: 14, height: 18, borderRadius: 9, background: 'rgba(255,255,255,.1)' }}><div style={{ width: `${p * 100}%`, height: '100%', borderRadius: 9, background: `linear-gradient(90deg, ${C.copperDeep}, ${C.copper2})` }} /></div>
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', font: `600 26px ${mono}`, color: C.dim }}><span>kare {Math.round(p * 1080)}/1080</span><span style={{ color: p >= 1 ? C.copper2 : C.dim }}>{p >= 1 ? '✓ bitti' : `%${Math.round(p * 100)}`}</span></div>
          </>}
        </div>
      </Win>
      {f >= doneAt - 2 && <>
        <Phone src="img/a4.jpg" x={540} y={600} w={300} a={ph.o} z={5} />
        <Badge a={pop(f, doneAt + 4, 10)} style={{ left: 380, top: 1150 - 30, zIndex: 6 }}><Check s={24} />video.mp4 hazır</Badge>
      </>}
      <Sfx at={0} name="shimmer" vol={0.7} /><Sfx at={cmdAt} name="tap" vol={0.6} /><Sfx at={runAt} name="tap" vol={0.7} /><Sfx at={runAt + 4} name="rise" vol={0.5} /><Sfx at={doneAt} name="success" vol={0.8} />
    </AbsoluteFill>
  );
};

/* ============ DÜRÜST: Pixar mı? Henüz değil ============ */
export const Durust: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const stAt = sec(rel('durust', 'l14', 0.62)), frAt = sec(rel('durust', 'l15', 0.25)), yoAt = sec(rel('durust', 'l15', 0.75));
  const st = slam(f, stAt); const a0 = Math.min(1, pop(f, 2, 12));
  return (
    <AbsoluteFill>
      <Glass style={{ left: 240, top: 470, width: 600, height: 420, opacity: a0, transform: `scale(${Math.min(1.03, a0)})` }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center' }}>
          <svg width={150} height={150} viewBox="0 0 24 24" fill="none" stroke={C.copper2} strokeWidth={1.4}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5 9 2M12 5l2-3M17 5l2-3M3 9h18" /></svg></div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 280, textAlign: 'center', font: `italic 400 90px ${serif}`, color: '#fff' }}>Pixar kalitesi?</div>
      </Glass>
      {f >= stAt - 2 && <div style={{ position: 'absolute', left: 290, top: 520, padding: '14px 30px', borderRadius: 18, border: '6px solid #ef6b5b', color: '#ef6b5b', font: `900 64px ${tight}`, letterSpacing: '.04em', transform: `rotate(-10deg) scale(${st.s})`, opacity: st.o, background: 'rgba(6,7,12,.6)' }}>HENÜZ DEĞİL</div>}
      <Badge a={pop(f, frAt, 10)} style={{ left: 190, top: 960, font: `800 36px ${inter}`, transform: `rotate(-3deg) scale(${Math.min(1.06, pop(f, frAt, 10)) * (1 + 0.02 * Math.sin(t * 4))})` }}><Check s={30} />ücretsiz</Badge>
      <Badge a={pop(f, yoAt, 10)} style={{ left: 560, top: 980, font: `800 36px ${inter}`, transform: `rotate(3deg) scale(${Math.min(1.06, pop(f, yoAt, 10)) * (1 + 0.02 * Math.sin(t * 4 + 1))})` }}><Check s={30} />tamamen senin</Badge>
      <Sfx at={2} name="pop" vol={0.5} /><Sfx at={stAt} name="impact" vol={0.8} /><Sfx at={frAt} name="pop" vol={0.7} /><Sfx at={yoAt} name="pop" vol={0.7} />
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
        <span style={{ display: 'inline-block', padding: '20px 50px', borderRadius: 70, background: C.copper, color: C.dark, font: `900 96px/1 ${tight}`, letterSpacing: '.01em', boxShadow: '0 18px 50px rgba(232,135,92,.4)' }}>“ANİMASYON”</span>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', font: `italic 400 60px ${serif}`, color: C.copper2, opacity: prog(f, 14, 10) }}>skill + rehber DM’de</div>
      <Sfx at={4} name="impact" vol={0.7} />
    </AbsoluteFill>
  );
};
export { EASE };
