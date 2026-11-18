import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C, FPS, sec, prog, pop, rel, inter, tight, serif, mono, copperText, EASE, EASE_IO } from './theme';
import { Glass, FlagTR, FlagNZ, Sfx, Spark } from './components';

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const Lock: React.FC<{ s?: number; c?: string; open?: boolean }> = ({ s = 30, c = '#fff', open }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round"><rect x="5" y="11" width="14" height="10" rx="2.5" /><path d={open ? 'M8 11V8a4 4 0 0 1 7.6-1.7' : 'M8 11V8a4 4 0 0 1 8 0v3'} /></svg>
);
const Play: React.FC<{ s?: number; c?: string }> = ({ s = 30, c = '#fff' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M7 4.5v15l12-7.5z" /></svg>;
const slam = (f: number, at: number) => { const p = pop(f, at, 10); return { s: 1 + (1 - Math.min(1, p)) * 1.2, o: clamp((f - at) / 4) }; };
const shake = (f: number, at: number, amp = 12) => (f >= at && f < at + 10 ? Math.sin((f - at) * 3.2) * amp * (1 - (f - at) / 10) : 0);

/* ======================= 1) KANCA ======================= */
export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const nasil = sec(rel('hook', 'l03'));
  const g = slam(f, 0), v = slam(f, 4);
  const card = pop(f, sec(0.7), 14);
  const chats = ['nasıl açtın bunu??', 'TR’de daha kilitli 😐', 'Yeni Zelanda hesabı mı?', 'oynanış harika'];
  const sx = shake(f, 0, 14) + shake(f, nasil, 16);
  const ov = prog(f, nasil, 6);
  return (
    <AbsoluteFill style={{ transform: `translateX(${sx}px)` }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', transform: `scale(${1 - ov * 0.08})`, opacity: 1 - ov * 0.55 }}>
        <div style={{ font: `900 250px/0.92 ${tight}`, letterSpacing: '-.05em', color: '#fff', transform: `scale(${g.s})`, opacity: g.o }}>GTA</div>
        <div style={{ font: `900 270px/0.9 ${tight}`, letterSpacing: '-.04em', transform: `scale(${v.s})`, opacity: v.o, filter: 'drop-shadow(0 0 40px rgba(232,135,92,.55))', ...copperText }}>VI</div>
      </div>
      {/* temsili yayın kartı (gerçek oynanış görüntüsü değildir) */}
      <Glass style={{ left: 110, top: 830, width: 860, height: 290, opacity: Math.min(1, card), transform: `translateY(${(1 - Math.min(1, card)) * 80}px) scale(${0.9 + 0.1 * Math.min(1.05, card)})` }}>
        <div style={{ position: 'absolute', left: 28, top: 26, display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ padding: '8px 16px', borderRadius: 12, background: C.live, color: '#fff', font: `800 24px ${inter}`, letterSpacing: '.08em', opacity: 0.6 + 0.4 * Math.abs(Math.sin(f / 8)) }}>● CANLI</span>
          <span style={{ font: `800 32px ${tight}`, color: '#fff' }}>Yayında: GTA VI</span>
        </div>
        <div style={{ position: 'absolute', right: 26, top: 28, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 14, background: 'rgba(0,0,0,.35)', font: `700 22px ${inter}`, color: C.dim }}><Lock s={22} c={C.copper2} />TR: 19 Kasım 00:00</div>
        <div style={{ position: 'absolute', left: 28, right: 28, top: 96 }}>
          {chats.map((c, i) => { const a = pop(f, sec(1.0 + i * 0.45), 10); return a > 0 ? (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10, opacity: Math.min(1, a), transform: `translateX(${(1 - Math.min(1, a)) * -30}px)` }}>
              <span style={{ width: 30, height: 30, borderRadius: 15, background: ['#e8875c', '#a996f2', '#6fd0a0', '#f2bd3e'][i] }} />
              <span style={{ font: `700 26px ${inter}`, color: 'rgba(245,239,233,.85)' }}>{c}</span></div>) : null; })}
        </div>
      </Glass>
      {/* NASIL OYNUYORLAR? */}
      {f >= nasil && (
        <AbsoluteFill style={{ background: `rgba(6,7,12,${0.55 * ov})` }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', transform: `scale(${slam(f, nasil).s}) rotate(-3deg)`, opacity: slam(f, nasil).o }}>
            <div style={{ font: `900 150px/0.95 ${tight}`, letterSpacing: '-.04em', color: '#fff' }}>NASIL</div>
            <div style={{ font: `900 108px/1 ${tight}`, letterSpacing: '-.04em', filter: 'drop-shadow(0 0 30px rgba(232,135,92,.6))', ...copperText }}>OYNUYORLAR?</div>
          </div>
        </AbsoluteFill>
      )}
      <Sfx at={0} name="impact" vol={1} /><Sfx at={4} name="impact" vol={0.6} />
      {chats.map((_, i) => <Sfx key={i} at={sec(1.0 + i * 0.45)} name="pop" vol={0.45} />)}
      <Sfx at={nasil} name="impact" vol={0.9} />
    </AbsoluteFill>
  );
};

/* ======================= 2) SAAT FARKI ======================= */
const fmt = (s: number) => { s = ((Math.floor(s) % 86400) + 86400) % 86400; return `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
export const Saat: React.FC = () => {
  const f = useCurrentFrame();
  const unlock = sec(rel('saat', 'l04', 0.85));          // "Yeni Zelanda!" → YZ'de 00:00
  const ten = sec(rel('saat', 'l05', 0.62));             // "tam 10 saat"
  const secs = interpolate(f, [0, unlock], [-4, 0], { extrapolateRight: 'clamp' }); // geri sayım saniyeleri
  const tr = 14 * 3600 + secs, nz = 0 + secs;            // TR 18 Kasım 14:00 = YZ 19 Kasım 00:00
  const opened = f >= unlock;
  const Card: React.FC<{ x: number; flag: React.ReactNode; name: string; time: string; date: string; open: boolean; delay: number }> = ({ x, flag, name, time, date, open, delay }) => {
    const a = pop(f, delay, 14);
    return (
      <Glass style={{ left: x, top: 470, width: 440, height: 470, opacity: Math.min(1, a), transform: `translateY(${(1 - Math.min(1, a)) * 80}px)`, borderColor: open ? 'rgba(232,135,92,.6)' : C.glassLine, boxShadow: open ? '0 0 60px rgba(232,135,92,.25)' : 'none' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 34, display: 'flex', justifyContent: 'center' }}>{flag}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', font: `800 36px ${tight}`, color: '#fff', letterSpacing: '.02em' }}>{name}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 206, textAlign: 'center', font: `700 74px ${mono}`, color: open ? C.copper2 : '#fff' }}>{time}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', font: `600 26px ${inter}`, color: C.dim }}>{date}</div>
        <div style={{ position: 'absolute', left: 60, right: 60, top: 366, height: 64, borderRadius: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          background: open ? C.copper : 'rgba(255,255,255,.07)', color: open ? C.dark : C.dim, font: `800 28px ${inter}`, transform: `scale(${open ? 1 + 0.08 * Math.max(0, 1 - (f - unlock) / 8) : 1})` }}>
          {open ? <><Play s={26} c={C.dark} />AÇILDI</> : <><Lock s={26} c={C.dim} />KİLİTLİ</>}
        </div>
      </Glass>
    );
  };
  const tp = pop(f, ten, 10);
  return (
    <AbsoluteFill>
      <Card x={70} flag={<FlagTR w={150} />} name="TÜRKİYE" time={fmt(tr)} date="18 Kasım" open={false} delay={2} />
      <Card x={570} flag={<FlagNZ w={160} />} name="YENİ ZELANDA" time={fmt(nz)} date={opened ? '19 Kasım' : '18 Kasım'} open={opened} delay={5} />
      {f >= ten && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 990, textAlign: 'center', transform: `scale(${1 + (1 - Math.min(1, tp)) * 1.2})`, opacity: clamp((f - ten) / 4) }}>
          <span style={{ font: `900 118px/1 ${tight}`, letterSpacing: '-.03em', filter: 'drop-shadow(0 0 30px rgba(232,135,92,.6))', ...copperText }}>10 SAAT </span>
          <span style={{ font: `italic 400 108px/1 ${serif}`, color: '#fff' }}>önce</span>
        </div>
      )}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 1150, textAlign: 'center', font: `500 22px/1.3 ${inter}`, color: 'rgba(245,239,233,.5)', opacity: prog(f, 14, 10) }}>
        Kilit her bölgede yerel saatle 19 Kasım 00:00’da açılıyor: Yeni Zelanda’da 00:00 = Türkiye’de 18 Kasım 14:00.
      </div>
      {Array.from({ length: 4 }).map((_, i) => <Sfx key={i} at={unlock - (4 - i) * Math.max(3, Math.floor(unlock / 5))} name="clock" vol={0.7} />)}
      <Sfx at={unlock} name="unlock" vol={1} /><Sfx at={ten} name="impact" vol={0.9} />
    </AbsoluteFill>
  );
};

/* ======================= 3) YÖNTEM ======================= */
export const Hesap: React.FC = () => {
  const f = useCurrentFrame();
  const r1 = sec(rel('hesap', 'l06')), r2 = sec(rel('hesap', 'l07', 0.35)), r3 = sec(rel('hesap', 'l09')), r4 = sec(rel('hesap', 'l10', 0.15));
  const panel = pop(f, 0, 14);
  const regions = ['Norveç', 'Nijerya', 'Panama', 'Yeni Zelanda'];
  const scroll = interpolate(f, [r2, r2 + 18], [0, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
  const Row: React.FC<{ y: number; at: number; n: number; title: string; children: React.ReactNode; done?: boolean }> = ({ y, at, n, title, children, done }) => {
    const a = pop(f, at, 12); if (a <= 0) return null;
    return (
      <div style={{ position: 'absolute', left: 30, right: 30, top: y, height: 132, borderRadius: 24, background: done ? 'rgba(232,135,92,.12)' : 'rgba(255,255,255,.05)', border: `2px solid ${done ? 'rgba(232,135,92,.5)' : 'rgba(255,255,255,.08)'}`,
        opacity: Math.min(1, a), transform: `translateX(${(1 - Math.min(1, a)) * 60}px)` }}>
        <div style={{ position: 'absolute', left: 22, top: 22, width: 46, height: 46, borderRadius: 23, background: done ? C.copper : 'rgba(255,255,255,.1)', color: done ? C.dark : '#fff', font: `800 24px ${inter}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
        <div style={{ position: 'absolute', left: 86, top: 18, font: `800 30px ${tight}`, color: '#fff' }}>{title}</div>
        <div style={{ position: 'absolute', left: 86, right: 22, top: 64 }}>{children}</div>
      </div>
    );
  };
  const buyPress = f >= r3 + 8 && f < r3 + 14;
  const playA = pop(f, r4, 12);
  return (
    <AbsoluteFill>
      <Glass style={{ left: 70, top: 440, width: 940, height: 720, opacity: Math.min(1, panel), transform: `scale(${0.92 + 0.08 * Math.min(1.03, panel)})` }}>
        <div style={{ position: 'absolute', left: 30, top: 24, font: `700 24px ${inter}`, color: C.dim, letterSpacing: '.12em' }}>KONSOL · HESAP</div>
        <Row y={70} at={r1} n={1} title="Mevcut hesap · Türkiye">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, font: `700 25px ${inter}`, color: C.copper2 }}><FlagTR w={46} /><Lock s={26} c={C.copper2} />Bölge sonradan değiştirilemez</div>
        </Row>
        <Row y={218} at={sec(rel('hesap', 'l07'))} n={2} title="Yeni hesap · Ülke/Bölge" done={f > r2 + 18}>
          <div style={{ position: 'relative', height: 50, overflow: 'hidden', borderRadius: 12, background: 'rgba(0,0,0,.35)', width: 520 }}>
            <div style={{ transform: `translateY(${-scroll * 50}px)` }}>{regions.map((r) => (
              <div key={r} style={{ height: 50, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', font: `700 26px ${inter}`, color: r === 'Yeni Zelanda' ? '#fff' : C.dim }}>{r === 'Yeni Zelanda' && <FlagNZ w={44} />}{r}</div>))}</div>
          </div>
        </Row>
        <Row y={366} at={r3} n={3} title="YZ mağazasından satın al" done={f > r3 + 14}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ padding: '8px 18px', borderRadius: 12, background: C.copper, color: C.dark, font: `800 24px ${inter}`, transform: `scale(${buyPress ? 0.92 : 1})` }}>GTA VI · Satın al</span>
            <span style={{ padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,.08)', color: C.dim, font: `700 22px ${inter}` }}>YZ hediye kartıyla</span>
          </div>
        </Row>
        {playA > 0 && (
          <div style={{ position: 'absolute', left: 30, right: 30, top: 520, height: 160, borderRadius: 28, background: 'linear-gradient(135deg,#f2a679,#d7764b)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22,
            transform: `scale(${Math.min(1.04, playA) * (1 + 0.02 * Math.sin(f / 4))})`, boxShadow: '0 0 80px rgba(232,135,92,.45)' }}>
            <Play s={64} c={C.dark} /><div><div style={{ font: `900 64px/1 ${tight}`, color: C.dark }}>OYNA</div><div style={{ font: `700 24px ${inter}`, color: 'rgba(22,13,8,.75)', marginTop: 6 }}>Türkiye’de hâlâ kilitliyken</div></div>
          </div>
        )}
      </Glass>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 1176, textAlign: 'center', font: `500 21px/1.3 ${inter}`, color: 'rgba(245,239,233,.5)', opacity: prog(f, r1, 10) }}>
        PlayStation Destek: Hesabın ülke/bölgesi oluşturulduktan sonra değiştirilemez.
      </div>
      <Sfx at={r1} name="error" vol={0.6} /><Sfx at={r2} name="tap" vol={0.9} /><Sfx at={r2 + 18} name="pop" vol={0.6} />
      <Sfx at={r3 + 8} name="tap" vol={0.9} /><Sfx at={r3 + 14} name="success" vol={0.7} /><Sfx at={r4} name="unlock" vol={1} />
    </AbsoluteFill>
  );
};

/* ======================= 4) DİKKAT ======================= */
export const Dikkat: React.FC = () => {
  const f = useCurrentFrame();
  const a1 = sec(rel('dikkat', 'l11')), x1 = sec(rel('dikkat', 'l11', 0.7)), a2 = sec(rel('dikkat', 'l12'));
  const Card: React.FC<{ y: number; at: number; icon: React.ReactNode; title: string; sub: string; tone: string }> = ({ y, at, icon, title, sub, tone }) => {
    const a = pop(f, at, 12); if (a <= 0) return null;
    return (
      <Glass style={{ left: 70, top: y, width: 940, height: 300, opacity: Math.min(1, a), transform: `translateY(${(1 - Math.min(1, a)) * 70}px)`, borderColor: tone }}>
        <div style={{ position: 'absolute', left: 36, top: 40, width: 120, height: 120, borderRadius: 34, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        <div style={{ position: 'absolute', left: 190, right: 36, top: 44, font: `800 42px/1.1 ${tight}`, color: '#fff' }}>{title}</div>
        <div style={{ position: 'absolute', left: 190, right: 36, top: 150, font: `600 28px/1.35 ${inter}`, color: C.dim }}>{sub}</div>
      </Glass>
    );
  };
  const hand = (f - a1) * 0.5;
  const clockIcon = (
    <svg width={86} height={86} viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="#fff" strokeWidth="3" />
      <line x1="24" y1="24" x2={24 + Math.sin(hand) * 13} y2={24 - Math.cos(hand) * 13} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="24" x2={24 + Math.sin(hand / 12) * 9} y2={24 - Math.cos(hand / 12) * 9} stroke={C.copper2} strokeWidth="3.4" strokeLinecap="round" /></svg>
  );
  const xA = pop(f, x1, 8);
  return (
    <AbsoluteFill>
      <Card y={450} at={a1} tone="rgba(239,75,75,.45)" icon={<div style={{ position: 'relative' }}>{clockIcon}{xA > 0 && <div style={{ position: 'absolute', inset: -14, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${2 - Math.min(1, xA)}) rotate(-8deg)`, opacity: Math.min(1, xA), font: `900 120px/1 ${tight}`, color: C.live }}>✕</div>}</div>}
        title="Konsol saatini ileri almak" sub="İşe yaramıyor: kilidin açılma anı PlayStation sunucusunun saatine bağlı." />
      <Card y={790} at={a2} tone="rgba(232,135,92,.55)" icon={<svg width={86} height={86} viewBox="0 0 24 24"><path d="M12 3 2.5 20h19z" fill="none" stroke={C.copper2} strokeWidth="2" strokeLinejoin="round" /><path d="M12 9.5v5" stroke={C.copper2} strokeWidth="2.2" strokeLinecap="round" /><circle cx="12" cy="17.3" r="1.3" fill={C.copper2} /></svg>}
        title="Yaşamadığın ülkede hesap açmak" sub="PlayStation kullanım koşullarına aykırı sayılabilir; hesabın kısıtlanma riski var." />
      <Sfx at={x1} name="error" vol={0.8} /><Sfx at={a2} name="pop" vol={0.7} />
    </AbsoluteFill>
  );
};

/* ======================= 5) FİNAL ======================= */
export const Final: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const q = pop(f, 2, 16);
  const bubbles: [string, number, number, number][] = [['Açardım', 190, 600, -0.1], ['Beklerim', 880, 640, 0.08], ['Riske girmem', 220, 960, 0.06], ['Çoktan açtım', 860, 1000, -0.07]];
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 455, textAlign: 'center', font: `800 44px ${tight}`, color: '#fff', opacity: prog(f, 4, 10) }}>GTA VI · <span style={{ color: C.copper2 }}>10 saat erken</span></div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', transform: `scale(${Math.min(1.05, q)}) rotate(${Math.sin(t * 2.4) * 5}deg)`, opacity: Math.min(1, q * 1.5) }}>
        <span style={{ font: `italic 400 600px/1.05 ${serif}`, filter: 'drop-shadow(0 0 60px rgba(232,135,92,.55))', ...copperText }}>?</span>
      </div>
      {bubbles.map(([s, x, y, r], k) => { const b = pop(f, sec(0.5 + k * 0.35), 12); if (b <= 0) return null; return (
        <div key={k} style={{ position: 'absolute', left: x, top: y + Math.sin(t * 3 + k) * 6, transform: `translate(-50%,-50%) rotate(${r}rad) scale(${Math.min(1.08, b)})`, padding: '18px 28px', borderRadius: 26, background: '#fff', color: '#16151a', font: `800 34px ${tight}`, whiteSpace: 'nowrap', boxShadow: '0 14px 30px rgba(0,0,0,.4)' }}>{s}</div>); })}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1150, display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', font: `700 24px ${inter}`, color: C.dim, opacity: prog(f, sec(1.6), 10) }}><Spark size={24} />Fikrini yorumlara yaz</div>
      <Sfx at={2} name="rise" vol={0.6} />{bubbles.map((_, k) => <Sfx key={k} at={sec(0.5 + k * 0.35)} name="pop" vol={0.6} />)}
    </AbsoluteFill>
  );
};
export { EASE_IO };
