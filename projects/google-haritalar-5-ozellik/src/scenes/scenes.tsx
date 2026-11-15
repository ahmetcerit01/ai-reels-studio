import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { C, EASE, EASE_IO, LAYOUT, inter, interTight, serif, mono, sec, Scene } from '../theme';
import { Captions, StepCards, Phone, ResultChip, Sfx, BigIndex, PlaceholderTag, SampleBadge, prog, pop, Icon } from '../components/ui';
import { ParkIllu, MeasureIllu, OfflineIllu, ShareIllu, StreetIllu } from '../components/illustrations';

const { panel } = LAYOUT;
const PCX = panel.x + panel.w / 2;
const PCY = panel.y + (panel.h - 70) / 2;

const RESULTS: Record<string, { icon: string; title: string; sub: string; at: number; x?: number; y?: number }> = {
  park: { icon: 'parking', title: 'Park yeri kaydedildi', sub: 'Dönüşte haritada P işareti', at: 3.85 },
  mesafe: { icon: 'ruler', title: 'Kuş uçuşu 2,4 km', sub: '“+” ile ara nokta ekle', at: 3.95 },
  cevrimdisi: { icon: 'download', title: 'Bölge indirildi', sub: 'İnternetsiz yol tarifi ve arama', at: 4.05 },
  paylas: { icon: 'people', title: 'Canlı paylaşılıyor', sub: 'Konum ve varış saati', at: 3.85, x: 30, y: 420 },
};

const Illu: React.FC<{ id: string; frame: number; accent: string }> = ({ id, frame, accent }) => {
  if (id === 'park') return <ParkIllu frame={frame} accent={accent} />;
  if (id === 'mesafe') return <MeasureIllu frame={frame} accent={accent} />;
  if (id === 'cevrimdisi') return <OfflineIllu frame={frame} accent={accent} />;
  if (id === 'paylas') return <ShareIllu frame={frame} accent={accent} />;
  return null;
};

/* ---------------- Özellik sahnesi ---------------- */
export const FeatureScene: React.FC<{ scene: Scene; first?: boolean }> = ({ scene, first }) => {
  const frame = useCurrentFrame();
  const accent = scene.accent ?? C.copper;
  const total = scene.duration;
  const exit = prog(frame, sec(total) - 7, 7, EASE_IO);
  const res = RESULTS[scene.id];
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - exit, transform: `translateY(${exit * -40}px)` }}>
        <BigIndex n={scene.index ?? 1} frame={frame} accent={accent} />
        <div style={{ position: 'absolute', left: panel.x, top: panel.y, width: panel.w, height: panel.h - 80, overflow: 'hidden', borderRadius: panel.r }}>
          <div style={{ position: 'absolute', left: -panel.x, top: -panel.y, width: 1080, height: 1920 }}>
            <Phone scene={scene} frame={frame} cx={PCX} cy={PCY + 30}>
              <Illu id={scene.id} frame={frame} accent={accent} />
            </Phone>
          </div>
        </div>
        <SampleBadge show={!scene.recordingFile} />
        {res && <ResultChip frame={frame} at={res.at} accent={accent} icon={res.icon} title={res.title} sub={res.sub} x={panel.x + (res.x ?? 470)} y={panel.y + (res.y ?? 640)} />}
      </div>
      <Captions scene={scene} frame={frame} />
      <StepCards steps={scene.steps ?? []} frame={frame} accent={accent} total={total} />
      {!first && <Sfx at={0} name="whoosh" vol={0.8} />}
      {(scene.steps ?? []).map((s, i) => <Sfx key={`s${i}`} at={sec(s.at) - 6} name="pop" vol={0.5} />)}
      {(scene.taps ?? []).map((t, i) => <Sfx key={`t${i}`} at={sec(t.at)} name="tap" vol={0.9} />)}
      {res && <Sfx at={sec(res.at)} name="success" vol={0.7} />}
    </AbsoluteFill>
  );
};

/* ---------------- Zamanda yolculuk ---------------- */
export const TimeTravelScene: React.FC<{ scene: Scene; first?: boolean }> = ({ scene, first }) => {
  const frame = useCurrentFrame();
  const accent = scene.accent ?? C.copper;
  const pu = scene.phoneUntil ?? 2.6;
  const sw = prog(frame, sec(pu) - 4, 14, EASE_IO);           // telefon -> karşılaştırma geçişi
  const cmpIn = pop(frame, sec(pu), 20);
  const cw = 880, ch = 830, cx = PCX - cw / 2, cy = panel.y + 34;
  // ayırıcı: önce tamamen yeni, sonra eskiyi soldan açar, sonra ortalanır, en sonda tekrar süpürür
  const tt = frame - sec(pu);
  const dv = interpolate(tt, [0, 12, 40, 70, 95, 120], [0, 0, 0.78, 0.3, 0.55, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
  const yearsArr = Array.from({ length: 9 }, (_, i) => 2008 + i * 2);
  const yo = +(scene.yearOld ?? 2014), yn = +(scene.yearNew ?? 2024);
  const knobYear = interpolate(tt, [6, 40], [yn, yo], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE });
  const flash = Math.max(0, 1 - Math.abs(tt - 8) / 8);
  const Media: React.FC<{ era: 0 | 1 }> = ({ era }) => {
    const f = era === 0 ? scene.imageOld : scene.imageNew;
    return f ? <Img src={staticFile(f)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: era === 0 ? 'none' : 'none' }} />
      : <StreetIllu era={era} w={cw} h={ch} />;
  };
  const exit = prog(frame, sec(scene.duration) - 7, 7, EASE_IO);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - exit }}>
        <BigIndex n={5} frame={frame} accent={accent} />
        {sw < 1 && (
          <div style={{ position: 'absolute', left: panel.x, top: panel.y, width: panel.w, height: panel.h - 80, overflow: 'hidden', borderRadius: panel.r }}>
            <div style={{ position: 'absolute', left: -panel.x, top: -panel.y, width: 1080, height: 1920 }}>
              <Phone scene={scene} frame={frame} cx={PCX} cy={PCY + 30} extraScale={1 + sw * 0.6} opacity={1 - sw}>
                <StreetIllu era={1} w={LAYOUT.phone.w} h={LAYOUT.phone.h} />
                <div style={{ position: 'absolute', left: 18, top: 110, padding: '14px 18px', borderRadius: 18, background: 'rgba(255,255,255,.95)', font: `700 17px ${inter}`, color: '#2a2930',
                  boxShadow: '0 8px 20px rgba(0,0,0,.15)', opacity: prog(frame, sec(1.2), 10) }}>
                  <div style={{ font: `600 13px ${inter}`, color: '#77757d' }}>Street View · {yn}</div>
                  <div style={{ marginTop: 6, color: accent }}>Daha fazla tarih</div>
                </div>
              </Phone>
            </div>
          </div>
        )}
        {sw < 1 && <div style={{ opacity: 1 - sw }}><SampleBadge show={!scene.recordingFile} /></div>}
        {cmpIn > 0 && (
          <div style={{ position: 'absolute', left: cx, top: cy, width: cw, height: ch, borderRadius: 40, overflow: 'hidden', boxShadow: '0 40px 100px rgba(60,40,0,.25)',
            transform: `scale(${0.8 + 0.2 * Math.min(1.04, cmpIn)})`, opacity: Math.min(1, cmpIn * 1.5) }}>
            <Media era={1} />
            <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${(1 - dv) * 100}% 0 0)` }}><Media era={0} /></div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: dv * cw - 3, width: 6, background: '#fff', boxShadow: '0 0 20px rgba(0,0,0,.35)' }}>
              <div style={{ position: 'absolute', top: ch / 2 - 34, left: -31, width: 68, height: 68, borderRadius: 34, background: '#fff', boxShadow: '0 6px 20px rgba(0,0,0,.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', font: `800 26px ${inter}`, color: C.ink }}>⇆</div>
            </div>
            {/* yıl rozetleri */}
            <div style={{ position: 'absolute', left: 28, bottom: 28, padding: '10px 20px', borderRadius: 18, background: 'rgba(22,21,26,.85)', color: '#f3d9a4', font: `800 44px ${interTight}`, opacity: dv > 0.12 ? 1 : 0 }}>{scene.yearOld}</div>
            <div style={{ position: 'absolute', right: 28, bottom: 28, padding: '10px 20px', borderRadius: 18, background: '#fff', color: C.ink, font: `800 44px ${interTight}` }}>{scene.yearNew}</div>
            {/* yıl kaydırıcı */}
            <div style={{ position: 'absolute', left: 28, right: 28, top: 28, height: 78, borderRadius: 24, background: 'rgba(255,255,255,.92)', padding: '0 26px', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, height: 40 }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 18, height: 4, borderRadius: 2, background: '#e2ddd0' }} />
                {yearsArr.map((y) => (
                  <div key={y} style={{ position: 'absolute', left: `${((y - 2008) / 16) * 100}%`, top: 0, transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <div style={{ width: 4, height: 12, margin: '13px auto 0', background: '#c9c2b0', borderRadius: 2 }} />
                    <div style={{ font: `600 13px ${mono}`, color: '#8a8475', marginTop: 4 }}>{y}</div>
                  </div>
                ))}
                <div style={{ position: 'absolute', left: `${((knobYear - 2008) / 16) * 100}%`, top: 6, width: 28, height: 28, marginLeft: -14, borderRadius: 14, background: accent, border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,.25)' }} />
              </div>
            </div>
            {scene.location && (
              <div style={{ position: 'absolute', left: 28, top: 122, padding: '8px 14px', borderRadius: 14, background: 'rgba(22,21,26,.7)', color: '#fff', font: `600 18px ${inter}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="pin" color="#fff" size={20} />{scene.location}
              </div>
            )}
            {!(scene.imageOld && scene.imageNew) && <PlaceholderTag text="ÖRNEK ÇİZİM · gerçek Street View görüntülerini ekle" top={ch - 150} />}
            <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: flash * 0.7 }} />
          </div>
        )}
      </div>
      <Captions scene={scene} frame={frame} />
      <StepCards steps={scene.steps ?? []} frame={frame} accent={accent} total={scene.duration} />
      {!first && <Sfx at={0} name="whoosh" vol={0.8} />}
      {(scene.steps ?? []).map((s, i) => <Sfx key={`s${i}`} at={sec(s.at) - 6} name="pop" vol={0.5} />)}
      {(scene.taps ?? []).map((t, i) => <Sfx key={`t${i}`} at={sec(t.at)} name="tap" vol={0.9} />)}
      <Sfx at={sec(pu) - 4} name="shimmer" vol={1} />
    </AbsoluteFill>
  );
};

/* ---------------- Kamera yer tutucusu ---------------- */
const CameraLayer: React.FC<{ file?: string | null; label: string; frame: number }> = ({ file, label, frame }) => {
  if (file) return <OffthreadVideo src={staticFile(file)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />;
  const breathe = 1 + Math.sin(frame / 18) * 0.01;
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 35%, #3b3430 0%, #1c1918 60%, #0f0d0d 100%)' }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, transform: `scale(${breathe})` }}>
        <defs><filter id="bl"><feGaussianBlur stdDeviation="18" /></filter></defs>
        <g filter="url(#bl)" opacity={0.55}>
          <circle cx={540} cy={760} r={190} fill="#7a6a5e" />
          <path d="M150 1920 C 180 1300, 360 1120, 540 1120 S 900 1300, 930 1920 Z" fill="#5b4f47" />
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 70, right: 70, top: 380, bottom: 760, borderRadius: 40, border: '4px dashed rgba(255,255,255,.28)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', color: 'rgba(255,255,255,.75)', font: `700 30px ${mono}`, letterSpacing: '.06em' }}>KAMERA KAYDI</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center', color: 'rgba(255,255,255,.5)', font: `500 24px ${mono}` }}>{label}</div>
    </AbsoluteFill>
  );
};

export const IntroScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const top = prog(frame, 0, 14);
  const icons = ['parking', 'ruler', 'download', 'share', 'clock'];
  const colors = ['#3b7ddd', '#e2703a', '#2f9e62', '#7c5ce0', '#c98a12'];
  const exit = prog(frame, sec(scene.duration) - 6, 6, EASE_IO);
  return (
    <AbsoluteFill style={{ opacity: 1 - exit * 0.0 }}>
      <CameraLayer file={scene.cameraFile} label="public/camera/giris.mp4 · 0–4 sn" frame={frame} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.55) 100%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center', opacity: top, transform: `translateY(${(1 - top) * -20}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px', borderRadius: 40, background: 'rgba(255,255,255,.95)', font: `800 26px ${inter}`, color: C.ink, letterSpacing: '.04em' }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: C.copper }} />GOOGLE HARİTALAR · 5 GİZLİ ÖZELLİK
        </div>
      </div>
      <Captions scene={scene} frame={frame} y={1180} dark size={74} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1450, display: 'flex', justifyContent: 'center', gap: 22 }}>
        {icons.map((ic, i) => {
          const a = pop(frame, sec(1.9) + i * 4, 14);
          return (
            <div key={ic} style={{ width: 96, height: 96, borderRadius: 30, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              transform: `scale(${a}) translateY(${(1 - Math.min(1, a)) * 30}px)`, boxShadow: '0 14px 30px rgba(0,0,0,.3)' }}>
              <Icon name={ic} color={colors[i]} size={50} />
              <div style={{ position: 'absolute', top: -10, right: -10, width: 36, height: 36, borderRadius: 18, background: colors[i], color: '#fff', font: `800 19px ${inter}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
            </div>
          );
        })}
      </div>
      {icons.map((_, i) => <Sfx key={i} at={sec(1.9) + i * 4} name="tick" vol={0.8} />)}
    </AbsoluteFill>
  );
};

export const OutroScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const card = prog(frame, 2, 18);
  const kw = prog(frame, 10, 22);
  const pills = ['Kaydet', 'Takip et', '5 özelliğin listesi DM’de'];
  return (
    <AbsoluteFill>
      <CameraLayer file={scene.cameraFile} label="public/camera/kapanis.mp4 · CTA" frame={frame} />
      <div style={{ position: 'absolute', left: 50, right: 50, top: 1130, height: 520, borderRadius: 48, background: 'rgba(18,17,22,.82)', border: '1px solid rgba(255,255,255,.1)',
        transform: `translateY(${(1 - card) * 500}px)`, textAlign: 'center', paddingTop: 54, backdropFilter: 'blur(20px)' }}>
        <div style={{ font: `700 28px ${inter}`, color: 'rgba(255,255,255,.75)', letterSpacing: '.32em' }}>YORUMLARA YAZ</div>
        <div style={{ font: `400 200px/1 ${serif}`, marginTop: 18, letterSpacing: '-0.02em', background: 'linear-gradient(180deg,#f6cf8e,#c4703f)', WebkitBackgroundClip: 'text', color: 'transparent',
          opacity: kw, transform: `scale(${0.9 + 0.1 * kw})`, filter: `blur(${(1 - kw) * 10}px)` }}>{scene.keyword ?? 'HARİTA'}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 34 }}>
          {pills.map((p, i) => {
            const a = pop(frame, 30 + i * 5, 14);
            return <div key={p} style={{ padding: '14px 24px', borderRadius: 30, background: i === 2 ? C.copper : 'rgba(255,255,255,.1)', color: '#fff', font: `700 24px ${inter}`, transform: `scale(${a})` }}>{p}</div>;
          })}
        </div>
      </div>
      <Sfx at={0} name="rise" vol={0.8} />
      <Sfx at={12} name="shimmer" vol={0.6} />
    </AbsoluteFill>
  );
};
