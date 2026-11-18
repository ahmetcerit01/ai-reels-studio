import React from 'react';
import { AbsoluteFill, Audio, Composition, Sequence, Still, staticFile, useCurrentFrame } from 'remotion';
import { C, FPS, TL, TIMING, TOTAL_FRAMES, sec, prog, EASE_IO, inter, tight, serif, copperText, rel } from './theme';
import { Background, Header, Captions, Pill, Sfx, Spark, FlagTR, FlagNZ } from './components';
import { Hook, Saat, Hesap, Dikkat, Final } from './scenes';

const VIEWS: Record<string, React.FC> = { hook: Hook, saat: Saat, hesap: Hesap, dikkat: Dikkat, final: Final };

const SceneWrap: React.FC<{ id: string; dur: number; children: React.ReactNode; first: boolean; last?: boolean }> = ({ dur, children, first, last }) => {
  const f = useCurrentFrame();
  const inP = first ? 1 : prog(f, 0, 9), out = last ? 0 : prog(f, dur - 6, 6, EASE_IO);
  return <AbsoluteFill style={{ opacity: Math.min(inP, 1 - out), transform: `translateY(${(1 - inP) * 40 - out * 30}px) scale(${1 + out * 0.04})` }}>{children}</AbsoluteFill>;
};

const Glow: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const peaks = [0, rel('hook', 'l03'), TIMING.scenes[1].start + rel('saat', 'l05', 0.62), TIMING.scenes[2].start + rel('hesap', 'l10', 0.15), TIMING.scenes[4].start];
  const g = Math.max(...peaks.map((p) => Math.max(0, 1 - Math.abs(t - p) / 0.9)));
  return <Background glow={g} />;
};

export const Reels: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Glow />
    {TIMING.scenes.map((s, i) => {
      const V = VIEWS[s.def.id]; const from = sec(s.start), dur = sec(s.end) - from;
      return (
        <Sequence key={s.def.id} from={from} durationInFrames={dur} name={s.def.id}>
          <SceneWrap id={s.def.id} dur={dur} first={i === 0} last={i === TIMING.scenes.length - 1}>
            <HeaderLive def={s.def} dur={i === TIMING.scenes.length - 1 ? dur + 999 : dur} />
            <V />
          </SceneWrap>
          {i > 0 && <Sfx at={0} name="whoosh" vol={0.8} />}
        </Sequence>
      );
    })}
    <Captions />
    <Pill from={sec(TIMING.scenes[1].start) + 4} ctaFrom={sec(TIMING.scenes[4].start)} />
    {TIMING.lines.filter((l) => l.line.voFile).map((l) => (
      <Sequence key={l.line.id} from={sec(l.start)} durationInFrames={sec(l.line.dur + 0.5)} layout="none"><Audio src={staticFile(l.line.voFile!)} volume={TL.voVolume} /></Sequence>
    ))}
  </AbsoluteFill>
);
// Header'ı sahne içi kare ile canlandırmak için küçük sarmalayıcı
const HeaderLive: React.FC<{ def: { eyebrow: string; title: string; em: string }; dur: number }> = ({ def, dur }) => {
  const f = useCurrentFrame();
  return <div style={{ position: 'absolute', inset: 0 }}><HeaderInner def={def} f={f} dur={dur} /></div>;
};
const HeaderInner: React.FC<{ def: { eyebrow: string; title: string; em: string }; f: number; dur: number }> = ({ def, f, dur }) => <Header eyebrow={def.eyebrow} title={def.title} em={def.em} frame={f} dur={dur} />;

/* ---------- Kapak: turuncu ışık solda, sol hizalı ---------- */
export const Kapak: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Background glow={0.6} />
    <div style={{ position: 'absolute', left: -380, top: 260, width: 1100, height: 1100, borderRadius: 550, background: 'radial-gradient(closest-side, rgba(232,135,92,.55), rgba(232,135,92,0))' }} />
    <div style={{ position: 'absolute', left: 80, top: 300, right: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: C.copper, font: `700 34px/1 ${inter}`, letterSpacing: '.22em' }}><Spark size={34} />ERKEN ERİŞİM</div>
      <div style={{ marginTop: 40, font: `900 236px/0.86 ${tight}`, letterSpacing: '-.05em', color: '#fff' }}>GTA VI</div>
      <div style={{ marginTop: 10, font: `900 200px/0.9 ${tight}`, letterSpacing: '-.04em', filter: 'drop-shadow(0 0 50px rgba(232,135,92,.55))', ...copperText }}>ÇIKTI!</div>
      <div style={{ marginTop: 70, font: `900 78px/1.02 ${tight}`, letterSpacing: '-.03em', color: '#fff' }}>TÜRK YAYINCILAR</div>
      <div style={{ font: `italic 400 104px/1.05 ${serif}`, color: C.copper2 }}>nasıl oynuyor?</div>
      <div style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 18, padding: '18px 28px', borderRadius: 30, background: 'rgba(255,255,255,.06)', border: '2px solid rgba(255,255,255,.12)' }}>
        <FlagNZ w={88} /><span style={{ font: `800 40px ${tight}`, color: '#fff' }}>→</span><FlagTR w={66} /><span style={{ font: `800 40px ${tight}`, color: C.copper2 }}>10 saat önce</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition id="Reels" component={Reels} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    <Still id="Kapak" component={Kapak} width={1080} height={1920} />
  </>
);
