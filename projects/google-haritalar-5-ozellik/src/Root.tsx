import React from 'react';
import { Composition } from 'remotion';
import { FullVideo, FeatureVideo } from './Video';
import { TL, FEATURES, totalFrames, sceneFrames } from './theme';

export const Root: React.FC = () => (
  <>
    <Composition id="Full" component={FullVideo} durationInFrames={totalFrames(TL.scenes)} fps={TL.fps} width={TL.width} height={TL.height} />
    {FEATURES.map((s) => (
      <Composition key={s.id} id={`Ozellik-${s.index}-${s.id}`} component={FeatureVideo} defaultProps={{ id: s.id }}
        durationInFrames={sceneFrames(s)} fps={TL.fps} width={TL.width} height={TL.height} />
    ))}
  </>
);
