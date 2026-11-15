import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolateColors } from 'remotion';
import { C, LAYOUT, Scene, TL, sceneStarts, sceneFrames, sec } from './theme';
import { SectionPill, ProgressDots, prog } from './components/ui';
import { FeatureScene, TimeTravelScene, IntroScene, OutroScene } from './scenes/scenes';

const isPanel = (s?: Scene) => !!s && (s.kind === 'feature' || s.kind === 'timetravel');

/* Arka plan + pastel panel + üst etiket + ilerleme. Panel rengi sahneler arasında yumuşakça değişir. */
const Shell: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  const frame = useCurrentFrame();
  const starts = sceneStarts(scenes);
  let i = 0;
  for (let k = 0; k < scenes.length; k++) if (frame >= starts[k]) i = k;
  const s = scenes[i], prev = scenes[i - 1];
  const local = frame - starts[i];
  const p = Math.min(1, local / 12);
  const color = isPanel(prev) && isPanel(s) ? interpolateColors(p, [0, 1], [prev!.color!, s.color!]) : s.color ?? '#eee';
  let vis = isPanel(s) ? 1 : 0;
  if (isPanel(s) && !isPanel(prev) && prev) vis = prog(local, 0, 16);
  if (!isPanel(s) && isPanel(prev)) vis = 1 - prog(local, 0, 12);
  const shown = isPanel(s) ? s : prev;
  const within = Math.min(1, local / sceneFrames(s));
  const t = frame / 30;
  const accent = shown?.accent ?? C.copper;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {/* yavaş kayan pastel lekeler */}
      <div style={{ position: 'absolute', left: 700 + Math.sin(t * 0.5) * 60, top: 1250 + Math.cos(t * 0.4) * 40, width: 700, height: 700, borderRadius: 350, background: `${accent}14`, filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', left: -260 + Math.cos(t * 0.45) * 50, top: 1500 + Math.sin(t * 0.35) * 40, width: 640, height: 640, borderRadius: 320, background: `${color}aa`, filter: 'blur(70px)' }} />
      {shown && vis > 0 && (
        <>
          <div style={{ position: 'absolute', left: LAYOUT.panel.x, top: LAYOUT.panel.y, width: LAYOUT.panel.w, height: LAYOUT.panel.h, borderRadius: LAYOUT.panel.r,
            background: color, transform: `translateY(${(1 - vis) * 1300}px)`, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.03)' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: LAYOUT.panel.r, backgroundImage: 'radial-gradient(rgba(0,0,0,.06) 1.4px, transparent 1.4px)', backgroundSize: '28px 28px', opacity: 0.6 }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - vis) * 1300}px)` }}>
            <ProgressDots active={shown.index ?? 1} frame={isPanel(s) ? local : 99} accent={accent} within={isPanel(s) ? within : 1} />
          </div>
          {isPanel(s) && <SectionPill scene={s} frame={local} />}
        </>
      )}
    </AbsoluteFill>
  );
};

// Kameradan panele geçerken sahne içeriği panelle birlikte aşağıdan gelir
const RiseWithPanel: React.FC<{ on: boolean; children: React.ReactNode }> = ({ on, children }) => {
  const f = useCurrentFrame();
  if (!on) return <>{children}</>;
  const v = prog(f, 0, 16);
  return <AbsoluteFill style={{ transform: `translateY(${(1 - v) * 1300}px)` }}>{children}</AbsoluteFill>;
};

const SceneView: React.FC<{ scene: Scene; first?: boolean }> = ({ scene, first }) => {
  if (scene.kind === 'feature') return <FeatureScene scene={scene} first={first} />;
  if (scene.kind === 'timetravel') return <TimeTravelScene scene={scene} first={first} />;
  if (scene.kind === 'camera') return <IntroScene scene={scene} />;
  return <OutroScene scene={scene} />;
};

export const Timeline: React.FC<{ scenes: Scene[]; standalone?: boolean }> = ({ scenes, standalone }) => {
  const starts = sceneStarts(scenes);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Shell scenes={scenes} />
      {scenes.map((s, i) => (
        <Sequence key={s.id} from={starts[i]} durationInFrames={sceneFrames(s)} name={`${String(i).padStart(2, '0')} ${s.title}`}>
          <RiseWithPanel on={isPanel(s) && !!scenes[i - 1] && !isPanel(scenes[i - 1])}>
            <SceneView scene={s} first={standalone || i === 0} />
          </RiseWithPanel>
          {s.voFile && <Audio src={staticFile(s.voFile)} volume={TL.voVolume} />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const FullVideo: React.FC = () => <Timeline scenes={TL.scenes} />;
export const FeatureVideo: React.FC<{ id: string }> = ({ id }) => {
  const s = TL.scenes.find((x) => x.id === id)!;
  return <Timeline scenes={[s]} standalone />;
};
export { sec };
