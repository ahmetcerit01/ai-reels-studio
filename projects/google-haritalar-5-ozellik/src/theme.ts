import { Easing } from 'remotion';
import { continueRender, delayRender } from 'remotion';
import '@fontsource/inter/latin-400.css'; import '@fontsource/inter/latin-ext-400.css';
import '@fontsource/inter/latin-500.css'; import '@fontsource/inter/latin-ext-500.css';
import '@fontsource/inter/latin-600.css'; import '@fontsource/inter/latin-ext-600.css';
import '@fontsource/inter/latin-700.css'; import '@fontsource/inter/latin-ext-700.css';
import '@fontsource/inter/latin-800.css'; import '@fontsource/inter/latin-ext-800.css';
import '@fontsource/inter-tight/latin-800.css'; import '@fontsource/inter-tight/latin-ext-800.css';
import '@fontsource/inter-tight/latin-900.css'; import '@fontsource/inter-tight/latin-ext-900.css';
import '@fontsource/instrument-serif/latin-400-italic.css'; import '@fontsource/instrument-serif/latin-ext-400-italic.css';
import '@fontsource/jetbrains-mono/latin-500.css'; import '@fontsource/jetbrains-mono/latin-ext-500.css';
import '@fontsource/jetbrains-mono/latin-700.css'; import '@fontsource/jetbrains-mono/latin-ext-700.css';
import timeline from './data/timeline.json';

export const inter = "'Inter', sans-serif";
export const interTight = "'Inter Tight', 'Inter', sans-serif";
export const serif = "'Instrument Serif', serif";
export const mono = "'JetBrains Mono', monospace";

// Fontlar yüklenmeden ilk kare çizilmesin (yerel dosyalar, internet gerekmez)
if (typeof document !== 'undefined') {
  const h = delayRender('Yerel fontlar yükleniyor');
  const specs = ['400 20px Inter', '600 20px Inter', '700 20px Inter', '800 20px Inter', '800 20px "Inter Tight"', '900 20px "Inter Tight"',
    'italic 400 20px "Instrument Serif"', '500 20px "JetBrains Mono"', '700 20px "JetBrains Mono"'];
  Promise.all(specs.map((f) => document.fonts.load(f, 'AaÇĞİÖŞÜçğıöşü'))).then(() => continueRender(h)).catch(() => continueRender(h));
}

export const C = {
  bg: '#f6f4ef',
  ink: '#16151a',
  sub: '#6b6872',
  faint: 'rgba(22,21,26,.22)',
  copper: '#c4703f',
  copper2: '#e39a6a',
  white: '#ffffff',
  dark: '#121116',
};

// Tüm kurgu boyunca tek bir easing dili: hızlı başlayıp yumuşak oturan "expo-out"
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);

export const LAYOUT = {
  pillY: 88,
  panel: { x: 56, y: 150, w: 968, h: 990, r: 56 },
  captionY: 1190,
  stepsY: 1392,
  phone: { w: 398, h: 862 },
};

export type Caption = { a: string; b?: string; at?: number };
export type Step = { at: number; icon: string; text: string };
export type Tap = { at: number; x: number; y: number; hold?: boolean };
export type Zoom = { at: number; s: number; x: number; y: number };
export type Scene = {
  id: string;
  kind: 'camera' | 'feature' | 'timetravel' | 'outro';
  title: string;
  index?: number;
  color?: string;
  accent?: string;
  duration: number;
  cameraFile?: string | null;
  recordingFile?: string | null;
  recordingStart?: number;
  voFile?: string | null;
  vo: string;
  captions: Caption[];
  steps?: Step[];
  taps?: Tap[];
  zooms?: Zoom[];
  phoneUntil?: number;
  imageOld?: string | null;
  imageNew?: string | null;
  yearOld?: string;
  yearNew?: string;
  location?: string;
  keyword?: string;
};

export const TL = timeline as unknown as {
  fps: number; width: number; height: number; sfxVolume: number; voVolume: number; scenes: Scene[];
};
export const FPS = TL.fps;
export const sec = (s: number) => Math.round(s * FPS);

export const sceneFrames = (s: Scene) => sec(s.duration);
export const sceneStarts = (scenes: Scene[]) => {
  let acc = 0;
  return scenes.map((s) => { const st = acc; acc += sceneFrames(s); return st; });
};
export const totalFrames = (scenes: Scene[]) => scenes.reduce((a, s) => a + sceneFrames(s), 0);
export const FEATURES = TL.scenes.filter((s) => s.kind === 'feature' || s.kind === 'timetravel');

// Altyazı vuruşlarının zamanları: "at" verilmişse onu kullanır, yoksa kelime sayısına göre dağıtır.
export const captionTimes = (s: Scene): { start: number; end: number }[] => {
  const caps = s.captions;
  const lead = 0.12, tail = 0.2;
  const span = Math.max(0.5, s.duration - lead - tail);
  const w = caps.map((c) => (c.a + ' ' + (c.b ?? '')).trim().split(/\s+/).length + 1);
  const W = w.reduce((a, b) => a + b, 0);
  let acc = lead;
  const auto = caps.map((_, i) => { const st = acc; acc += (w[i] / W) * span; return st; });
  const starts = caps.map((c, i) => (typeof c.at === 'number' ? c.at : auto[i]));
  return starts.map((st, i) => ({ start: st, end: i < starts.length - 1 ? starts[i + 1] : s.duration }));
};
