// Stilize açıklama çizimleri. Google Haritalar arayüzünü TAKLİT ETMEZ; ekran kaydı eklenene kadar
// adımları görsel olarak anlatan özgün, pastel illüstrasyonlardır (telefon içinde "ÖRNEK ANİMASYON" etiketiyle).
import React from 'react';
import { LAYOUT, inter, mono, sec } from '../theme';
import { prog, pop } from './ui';

const W = LAYOUT.phone.w, H = LAYOUT.phone.h;

const rng = (seed: number) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

export const MapBase: React.FC<{ frame: number; panX?: number; panY?: number; seed?: number; dim?: number }> = ({ frame, panX = 0, panY = 0, seed = 4, dim = 0 }) => {
  const r = rng(seed);
  const blocks: React.ReactNode[] = [];
  for (let gy = -2; gy < 14; gy++) for (let gx = -2; gx < 7; gx++) {
    const x = gx * 92 + (gy % 2) * 30 + r() * 10, y = gy * 82 + r() * 8;
    blocks.push(<rect key={`${gx}-${gy}`} x={x} y={y} width={70 + r() * 10} height={60 + r() * 8} rx={10} fill={r() > 0.85 ? '#d6ecd2' : r() > 0.5 ? '#ece9e1' : '#f4f2ec'} />);
  }
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
      <rect width={W} height={H} fill="#f7f6f1" />
      <g transform={`translate(${panX} ${panY})`}>
        {blocks}
        <path d="M-200 640 C 60 560, 220 760, 620 600 L 620 1200 L -200 1200 Z" fill="#cfe5f2" />
        <path d="M-100 210 L 600 300" stroke="#fff" strokeWidth={22} />
        <path d="M-100 210 L 600 300" stroke="#f3d38a" strokeWidth={10} />
        <path d="M120 -100 L 260 1000" stroke="#fff" strokeWidth={18} />
        <path d="M-100 470 L 600 420" stroke="#fff" strokeWidth={14} />
        <path d="M330 -100 L 300 1000" stroke="#fff" strokeWidth={12} />
      </g>
      {dim > 0 && <rect width={W} height={H} fill={`rgba(20,20,30,${dim})`} />}
    </svg>
  );
};

const Sheet: React.FC<{ y: number; rows: { label: string; hi?: boolean; icon?: string }[]; accent: string }> = ({ y, rows, accent }) => (
  <div style={{ position: 'absolute', left: 0, right: 0, top: y, height: H, borderRadius: '30px 30px 0 0', background: '#fff', boxShadow: '0 -10px 40px rgba(20,20,30,.15)' }}>
    <div style={{ width: 54, height: 6, borderRadius: 3, background: '#ddd', margin: '12px auto 18px' }} />
    <div style={{ margin: '0 24px 16px', height: 18, width: 180, borderRadius: 9, background: '#e9e7e2' }} />
    <div style={{ margin: '0 24px 22px', height: 12, width: 120, borderRadius: 6, background: '#efede8' }} />
    {rows.map((r, i) => (
      <div key={i} style={{ margin: '0 18px 10px', height: 58, borderRadius: 18, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px',
        background: r.hi ? `${accent}22` : '#f6f5f2', border: r.hi ? `2px solid ${accent}` : '2px solid transparent', font: `700 18px ${inter}`, color: '#2a2930' }}>
        <div style={{ width: 30, height: 30, borderRadius: 10, background: r.hi ? accent : '#e2e0da', color: '#fff', font: `800 16px ${inter}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.icon ?? ''}</div>
        {r.label}
      </div>
    ))}
  </div>
);

const BlueDot: React.FC<{ x: number; y: number; frame: number }> = ({ x, y, frame }) => {
  const p = (frame % 40) / 40;
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <div style={{ position: 'absolute', left: -44, top: -44, width: 88, height: 88, borderRadius: 44, background: 'rgba(59,125,221,.18)', transform: `scale(${0.5 + p})`, opacity: 1 - p }} />
      <div style={{ position: 'absolute', left: -15, top: -15, width: 30, height: 30, borderRadius: 15, background: '#3b7ddd', border: '5px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,.25)' }} />
    </div>
  );
};

/* 1 — Park */
export const ParkIllu: React.FC<{ frame: number; accent: string }> = ({ frame, accent }) => {
  const sheetIn = prog(frame, sec(1.45), 14) - prog(frame, sec(2.65), 12);
  const drop = pop(frame, sec(2.75), 16);
  const label = prog(frame, sec(3.1), 12);
  const px = W / 2, py = H * 0.52;
  return (
    <>
      <MapBase frame={frame} panY={-frame * 0.15} />
      <BlueDot x={px} y={py} frame={frame} />
      {drop > 0 && (
        <div style={{ position: 'absolute', left: px - 30, top: py - 92 - (1 - Math.min(1, drop)) * 120, width: 60, height: 74, transform: `scale(${Math.min(1.1, drop)})`, transformOrigin: '50% 100%' }}>
          <svg width={60} height={74} viewBox="0 0 60 74"><path d="M30 72 C 30 72 4 44 4 28 A 26 26 0 0 1 56 28 C 56 44 30 72 30 72Z" fill="#2f5fb3" /><text x="30" y="38" textAnchor="middle" fontFamily={inter} fontWeight={800} fontSize={28} fill="#fff">P</text></svg>
        </div>
      )}
      {label > 0 && (
        <div style={{ position: 'absolute', left: px + 30, top: py - 100, padding: '8px 14px', borderRadius: 14, background: '#fff', font: `700 17px ${inter}`, color: '#2a2930', boxShadow: '0 6px 18px rgba(0,0,0,.12)', opacity: label, transform: `translateX(${(1 - label) * -10}px)` }}>Park yeri · 2 dk önce</div>
      )}
      {sheetIn > 0.01 && <Sheet y={H - 300 * sheetIn} accent={accent} rows={[{ label: 'Park yeri olarak kaydet', hi: true, icon: 'P' }, { label: 'Konumunu paylaş', icon: '' }]} />}
    </>
  );
};

/* 2 — Mesafe */
export const MeasureIllu: React.FC<{ frame: number; accent: string }> = ({ frame, accent }) => {
  const pin = pop(frame, sec(1.3), 14);
  const sheet = prog(frame, sec(1.75), 12) - prog(frame, sec(2.5), 10);
  const measure = prog(frame, sec(2.6), 50, (x) => x);
  const pan = measure * 150;
  const ax = W * 0.3, ay = H * 0.36;
  const bx = W / 2 + 40, by = H * 0.5 + 40;
  const km = (measure * 2.4).toFixed(1).replace('.', ',');
  return (
    <>
      <MapBase frame={frame} panX={-pan} panY={-pan * 0.6} />
      {pin > 0 && (
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          {measure > 0 && <line x1={ax - pan} y1={ay - pan * 0.6} x2={bx} y2={by} stroke="#1f1f24" strokeWidth={4} strokeDasharray="10 8" />}
          {measure > 0 && <circle cx={bx} cy={by} r={13} fill="#fff" stroke="#1f1f24" strokeWidth={4} />}
          <g transform={`translate(${ax - pan} ${ay - pan * 0.6}) scale(${Math.min(1.1, pin)})`}>
            <path d="M0 0 C 0 0 -18 -22 -18 -34 A 18 18 0 0 1 18 -34 C 18 -22 0 0 0 0Z" fill="#e2453a" />
            <circle cx={0} cy={-34} r={6} fill="#8f1f18" />
          </g>
        </svg>
      )}
      {sheet > 0.01 && <Sheet y={H - 280 * sheet} accent={accent} rows={[{ label: 'Mesafeyi ölç', hi: true, icon: '↔' }, { label: 'Kaydet', icon: '' }]} />}
      {measure > 0 && (
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 26, height: 96, borderRadius: 24, background: '#fff', boxShadow: '0 -6px 30px rgba(0,0,0,.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <div>
            <div style={{ font: `500 15px ${inter}`, color: '#77757d' }}>Toplam mesafe</div>
            <div style={{ font: `800 36px ${inter}`, color: '#1f1f24', letterSpacing: '-0.02em' }}>{km} km</div>
          </div>
          <div style={{ width: 52, height: 52, borderRadius: 26, background: `${accent}22`, color: accent, font: `800 30px ${inter}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
        </div>
      )}
    </>
  );
};

/* 3 — Çevrimdışı */
export const OfflineIllu: React.FC<{ frame: number; accent: string }> = ({ frame, accent }) => {
  const menu = prog(frame, sec(1.35), 12) - prog(frame, sec(2.35), 10);
  const sel = prog(frame, sec(2.4), 16);
  const dl = prog(frame, sec(3.5), 30, (x) => x);
  const done = dl >= 1;
  const fw = 300 - 30 * sel * 0, fh = 360, fx = (W - fw) / 2, fy = 220;
  return (
    <>
      <MapBase frame={frame} seed={9} panY={-frame * 0.1} />
      <div style={{ position: 'absolute', right: 22, top: 66, width: 50, height: 50, borderRadius: 25, background: 'linear-gradient(135deg,#7bc39a,#2f9e62)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,.2)' }} />
      {menu > 0.01 && (
        <div style={{ position: 'absolute', left: 22, right: 22, top: 130, borderRadius: 26, background: '#fff', padding: 18, boxShadow: '0 20px 50px rgba(0,0,0,.18)', opacity: menu, transform: `translateY(${(1 - menu) * -20}px) scale(${0.96 + 0.04 * menu})` }}>
          {['Profil', 'Konum geçmişi', 'Çevrimdışı haritalar', 'Ayarlar'].map((l, i) => (
            <div key={l} style={{ height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', padding: '0 16px', marginBottom: 6, font: `700 18px ${inter}`, color: '#2a2930',
              background: i === 2 ? `${accent}22` : 'transparent', border: i === 2 ? `2px solid ${accent}` : '2px solid transparent' }}>{l}</div>
          ))}
        </div>
      )}
      {sel > 0 && (
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0, opacity: sel }}>
          <defs><mask id="m"><rect width={W} height={H} fill="#fff" /><rect x={fx} y={fy} width={fw} height={fh} rx={18} fill="#000" /></mask></defs>
          <rect width={W} height={H} fill="rgba(20,30,40,.45)" mask="url(#m)" />
          <rect x={fx} y={fy} width={fw} height={fh} rx={18} fill="none" stroke={accent} strokeWidth={5} />
        </svg>
      )}
      {sel > 0 && (
        <div style={{ position: 'absolute', left: 30, right: 30, bottom: 40, height: 78, borderRadius: 39, background: done ? '#2f9e62' : accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, font: `800 24px ${inter}`, opacity: sel }}>
          {dl > 0 ? (
            <>
              <svg width={36} height={36} viewBox="0 0 36 36"><circle cx={18} cy={18} r={14} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={5} />
                <circle cx={18} cy={18} r={14} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray={`${88 * dl} 88`} transform="rotate(-90 18 18)" strokeLinecap="round" /></svg>
              {done ? 'İndirildi ✓' : `İndiriliyor %${Math.round(dl * 100)}`}
            </>
          ) : 'İndir'}
        </div>
      )}
    </>
  );
};

/* 4 — Paylaş */
export const ShareIllu: React.FC<{ frame: number; accent: string }> = ({ frame, accent }) => {
  const sheet = prog(frame, sec(1.6), 14);
  const contacts = prog(frame, sec(2.5), 14);
  const sent = pop(frame, sec(3.45), 16);
  const t = frame / 30;
  const route = 'M199 860 C 199 700, 140 620, 160 520 S 260 380, 230 240 S 180 80, 220 -40';
  return (
    <>
      <MapBase frame={frame} seed={13} panY={(t * 40) % 82} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <path d={route} stroke="#fff" strokeWidth={22} fill="none" strokeLinecap="round" />
        <path d={route} stroke="#4a8af0" strokeWidth={13} fill="none" strokeLinecap="round" />
        <g transform="translate(176 600)"><path d="M0 -26 L 18 20 L 0 10 L -18 20 Z" fill="#fff" stroke="#2f6fdc" strokeWidth={5} strokeLinejoin="round" /></g>
      </svg>
      <div style={{ position: 'absolute', left: 16, right: 16, top: 64, height: 96, borderRadius: 24, background: '#1f7a55', color: '#fff', display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px' }}>
        <div style={{ font: `800 40px ${inter}` }}>↱</div>
        <div><div style={{ font: `800 26px ${inter}` }}>200 m</div><div style={{ font: `500 17px ${inter}`, opacity: 0.85 }}>sonra sağa dön</div></div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120 + 210 * sheet, borderRadius: '30px 30px 0 0', background: '#fff', boxShadow: '0 -10px 40px rgba(0,0,0,.15)', padding: '18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ font: `800 32px ${inter}`, color: '#1f7a55' }}>18 dk</div><div style={{ font: `600 18px ${inter}`, color: '#77757d' }}>6,2 km · Varış 14:32</div>
        </div>
        {sheet > 0.05 && (
          <div style={{ marginTop: 18, height: 58, borderRadius: 18, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', background: `${accent}22`, border: `2px solid ${accent}`, font: `700 18px ${inter}`, color: '#2a2930', opacity: sheet }}>
            <div style={{ width: 30, height: 30, borderRadius: 10, background: accent }} />Yolculuk ilerlemesini paylaş
          </div>
        )}
        {contacts > 0.05 && (
          <div style={{ display: 'flex', gap: 18, marginTop: 20, opacity: contacts, transform: `translateY(${(1 - contacts) * 14}px)` }}>
            {['#f2a65a', '#7c5ce0', '#3fb27f', '#e2553b'].map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 58, height: 58, borderRadius: 29, background: c, border: i === 0 && sent > 0 ? `4px solid ${accent}` : '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,.12)' }} />
                <div style={{ marginTop: 6, width: 50, height: 8, borderRadius: 4, background: '#e6e4df', marginLeft: 4 }} />
              </div>
            ))}
          </div>
        )}
      </div>
      {false && (
        <div style={{ position: 'absolute', left: 60, right: 60, top: 300, padding: '14px 18px', borderRadius: 20, background: '#16151a', color: '#fff', font: `700 18px ${inter}`, textAlign: 'center', transform: `scale(${Math.min(1.08, sent)})` }}>Canlı konum paylaşılıyor</div>
      )}
    </>
  );
};

/* 5 — Sokak (zaman yolculuğu yer tutucusu): era 0 = eski, 1 = yeni */
export const StreetIllu: React.FC<{ era: 0 | 1; w: number; h: number }> = ({ era, w, h }) => {
  const old = era === 0;
  const sky = old ? ['#d9c7a3', '#efe2c4'] : ['#8fc6f0', '#dff0fb'];
  const r = rng(old ? 3 : 3);
  const bld = [] as React.ReactNode[];
  let x = -20;
  let k = 0;
  while (x < w) {
    const bw = 110 + r() * 90, bh = h * (0.35 + r() * 0.3); k++;
    const modern = !old && k % 3 === 1;
    const col = old ? ['#a98e6a', '#bca27c', '#8f765a'][k % 3] : modern ? '#9fb7c9' : ['#e9d3b6', '#d98d6a', '#f1e7d6'][k % 3];
    bld.push(<g key={k}>
      <rect x={x} y={h * 0.78 - bh} width={bw} height={bh} fill={col} />
      {Array.from({ length: Math.floor(bh / 46) }).map((_, j) => Array.from({ length: Math.floor(bw / 34) }).map((__, i) => (
        <rect key={`${i}-${j}`} x={x + 12 + i * 34} y={h * 0.78 - bh + 16 + j * 46} width={modern ? 30 : 18} height={modern ? 40 : 26} fill={old ? '#6e5a44' : modern ? '#d9edf8' : '#5d6b78'} opacity={old ? 0.7 : 0.85} />
      )))}
    </g>);
    x += bw + 6;
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', inset: 0 }}>
      <defs><linearGradient id={`sky${era}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sky[0]} /><stop offset="1" stopColor={sky[1]} /></linearGradient></defs>
      <rect width={w} height={h} fill={`url(#sky${era})`} />
      {old && <g stroke="#7a6142" strokeWidth={6}><line x1={w * 0.72} y1={h * 0.12} x2={w * 0.72} y2={h * 0.6} /><line x1={w * 0.55} y1={h * 0.14} x2={w * 0.9} y2={h * 0.14} /></g>}
      {bld}
      <rect y={h * 0.78} width={w} height={h * 0.22} fill={old ? '#8a7558' : '#9a9da3'} />
      <path d={`M0 ${h * 0.9} L ${w} ${h * 0.86}`} stroke={old ? '#c9b48d' : '#f4f4f4'} strokeWidth={6} strokeDasharray="40 30" />
      {!old && [0.2, 0.62].map((p, i) => <circle key={i} cx={w * p} cy={h * 0.62} r={46} fill="#5fae6a" />)}
      {old && <rect width={w} height={h} fill="rgba(120,90,40,.18)" />}
    </svg>
  );
};

export const MiniLabel: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ font: `600 13px ${mono}` }}>{text}</div>
);
