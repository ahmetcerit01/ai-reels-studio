import { Easing, interpolate, continueRender, delayRender } from 'remotion';
import '@fontsource/inter/latin-500.css'; import '@fontsource/inter/latin-ext-500.css';
import '@fontsource/inter/latin-600.css'; import '@fontsource/inter/latin-ext-600.css';
import '@fontsource/inter/latin-700.css'; import '@fontsource/inter/latin-ext-700.css';
import '@fontsource/inter/latin-800.css'; import '@fontsource/inter/latin-ext-800.css';
import '@fontsource/inter-tight/latin-800.css'; import '@fontsource/inter-tight/latin-ext-800.css';
import '@fontsource/inter-tight/latin-900.css'; import '@fontsource/inter-tight/latin-ext-900.css';
import '@fontsource/instrument-serif/latin-400-italic.css'; import '@fontsource/instrument-serif/latin-ext-400-italic.css';
import '@fontsource/jetbrains-mono/latin-700.css'; import '@fontsource/jetbrains-mono/latin-ext-700.css';
import TLjson from './data/timeline.json';

export const inter = "'Inter', sans-serif";
export const tight = "'Inter Tight', 'Inter', sans-serif";
export const serif = "'Instrument Serif', serif";
export const mono = "'JetBrains Mono', monospace";

if (typeof document !== 'undefined') {
  const h = delayRender('Yerel fontlar');
  Promise.all(['600 20px Inter', '700 20px Inter', '800 20px Inter', '800 20px "Inter Tight"', '900 20px "Inter Tight"', 'italic 400 20px "Instrument Serif"', '700 20px "JetBrains Mono"']
    .map((f) => document.fonts.load(f, 'AaÇĞİÖŞÜçğıöşü0123456789'))).then(() => continueRender(h)).catch(() => continueRender(h));
}

// Her zamanki tema: koyu zemin + bakır vurgu
export const C = {
  bg: '#06070c', ink: '#f5efe9', dim: 'rgba(245,239,233,.55)', faint: 'rgba(245,239,233,.32)',
  copper: '#e8875c', copper2: '#f2a679', copperDeep: '#d7764b', dark: '#160d08',
  glass: 'rgba(255,255,255,.045)', glassLine: 'rgba(255,255,255,.10)', live: '#ef4b4b',
};
export const copperText = { background: 'linear-gradient(180deg,#f8c29c,#d7764b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as const;

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);
export const prog = (f: number, start: number, dur: number, e = EASE) =>
  interpolate(f, [start, start + Math.max(1, dur)], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });
export const pop = (f: number, start: number, dur = 12) => {
  const x = Math.max(0, Math.min(1, (f - start) / dur)); if (x <= 0) return 0;
  const c1 = 1.8, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

export type Line = { id: string; scene: string; vo: string; a: string; b: string; dur: number; voFile: string | null };
export type SceneDef = { id: string; eyebrow: string; title: string; em: string; min: number };
export const TL = TLjson as unknown as { fps: number; gapLine: number; lead: number; tail: number; ctaHold: number; sfxVolume: number; voVolume: number; scenes: SceneDef[]; lines: Line[] };
export const FPS = TL.fps;
export const sec = (s: number) => Math.round(s * FPS);

/* Zamanlama: cümleler arka arkaya akar, sahneler cümlelerden hesaplanır */
export type Timed = { line: Line; start: number; end: number };
export type TimedScene = { def: SceneDef; start: number; end: number; lines: Timed[] };
export const computeTiming = () => {
  const scenes: TimedScene[] = []; let t = 0;
  TL.scenes.forEach((def, k) => {
    const s0 = t; let cur = s0 + (k === 0 ? 0.05 : TL.lead); const lines: Timed[] = [];
    TL.lines.filter((l) => l.scene === def.id).forEach((line, j, arr) => {
      lines.push({ line, start: cur, end: cur + line.dur }); cur += line.dur + (j < arr.length - 1 ? TL.gapLine : 0);
    });
    const last = k === TL.scenes.length - 1;
    const end = Math.max(cur + (last ? TL.ctaHold : TL.tail), s0 + def.min);
    scenes.push({ def, start: s0, end, lines }); t = end;
  });
  return { scenes, total: t, lines: scenes.flatMap((s) => s.lines) };
};
export const TIMING = computeTiming();
export const TOTAL_FRAMES = Math.ceil(TIMING.total * FPS);
export const lineAt = (id: string) => TIMING.lines.find((l) => l.line.id === id)!;
// sahne içi göreli saniye (sahne başına göre)
export const rel = (sceneId: string, lineId: string, frac = 0) => {
  const s = TIMING.scenes.find((x) => x.def.id === sceneId)!; const l = lineAt(lineId);
  return l.start + frac * (l.end - l.start) - s.start;
};
