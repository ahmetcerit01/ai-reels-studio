import React from 'react';
import { AbsoluteFill, Audio, Composition, Img, Sequence, Still, staticFile, useCurrentFrame } from 'remotion';
import { C, FPS, TL, TIMING, TOTAL_FRAMES, sec, prog, EASE_IO, inter, tight, serif, copperText, rel } from './theme';
import { Background, Header, Captions, Pill, Sfx, Spark } from './components';
import { Hook, S1, S2, S3, S4, S5, S6, Final } from './scenes';

const VIEWS: Record<string, React.FC> = { hook: Hook, s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, final: Final };

const SceneWrap: React.FC<{ dur: number; children: React.ReactNode; first: boolean; last: boolean }> = ({ dur, children, first, last }) => {
  const f = useCurrentFrame();
  const inP = first ? 1 : prog(f, 0, 9), out = last ? 0 : prog(f, dur - 6, 6, EASE_IO);
  return <AbsoluteFill style={{ opacity: Math.min(inP, 1 - out), transform: `translateY(${(1 - inP) * 40 - out * 30}px) scale(${1 + out * 0.04})` }}>{children}</AbsoluteFill>;
};
const LiveHeader: React.FC<{ def: { eyebrow: string; title: string; em: string; step?: number }; dur: number }> = ({ def, dur }) => {
  const f = useCurrentFrame();
  return <Header eyebrow={def.eyebrow} title={def.title} em={def.em} frame={f} dur={dur} step={def.step ?? 0} />;
};
const Glow: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const peaks = [0, rel('hook', 'l02', 0.55), ...TIMING.scenes.slice(1).map((s) => s.start + 0.2)];
  return <Background glow={Math.max(...peaks.map((p) => Math.max(0, 1 - Math.abs(t - p) / 0.8)))} />;
};

export const Reels: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Glow />
    {TIMING.scenes.map((s, i) => {
      const V = VIEWS[s.def.id]; const from = sec(s.start), dur = sec(s.end) - from; const last = i === TIMING.scenes.length - 1;
      return (
        <Sequence key={s.def.id} from={from} durationInFrames={dur} name={s.def.id}>
          <SceneWrap dur={dur} first={i === 0} last={last}>
            <LiveHeader def={s.def as never} dur={last ? dur + 999 : dur} />
            <V />
          </SceneWrap>
          {i > 0 && <Sfx at={0} name="whoosh" vol={0.7} />}
        </Sequence>
      );
    })}
    <Captions />
    <Pill from={sec(TIMING.scenes[1].start) + 4} ctaFrom={sec(TIMING.scenes[TIMING.scenes.length - 1].start)} words={['REELS']} minW={150} />
    {TIMING.lines.filter((l) => l.line.voFile).map((l) => (
      <Sequence key={l.line.id} from={sec(l.start)} durationInFrames={sec(l.line.dur + 0.5)} layout="none"><Audio src={staticFile(l.line.voFile!)} volume={TL.voVolume} /></Sequence>
    ))}
  </AbsoluteFill>
);

/* ---------- Kapak ---------- */
export const Kapak: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Background glow={0.7} />
    {['img/r1.jpg', 'img/r3.jpg', 'img/r2.jpg'].map((src, i) => (
      <div key={i} style={{ position: 'absolute', left: 540 - 150 + (i - 1) * 230, top: 1000 + Math.abs(i - 1) * 40, width: 300, height: 560, borderRadius: 36, overflow: 'hidden', border: '6px solid #16151a', boxShadow: '0 30px 60px rgba(0,0,0,.6)', transform: `rotate(${(i - 1) * 9}deg) scale(${i === 1 ? 1.08 : 0.95})`, zIndex: i === 1 ? 2 : 1 }}>
        <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ))}
    <div style={{ position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, color: C.copper, font: `700 34px/1 ${inter}`, letterSpacing: '.24em' }}><Spark size={34} />CLAUDE İLE</div>
      <div style={{ marginTop: 34, font: `900 124px/0.95 ${tight}`, letterSpacing: '-.04em', color: '#fff' }}>ANİMASYONLU</div>
      <div style={{ font: `italic 400 190px/1 ${serif}`, ...copperText }}>reels</div>
      <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 16, padding: '16px 34px', borderRadius: 50, background: C.copper, color: C.dark, font: `900 64px ${tight}` }}>6 ADIMDA</div>
    </div>
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition id="Reels" component={Reels} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1080} height={1920} />
    <Still id="Kapak" component={Kapak} width={1080} height={1920} />
  </>
);
