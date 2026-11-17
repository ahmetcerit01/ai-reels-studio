"""Seslendirmeyi akıcı hale getirir ve VİDEOYU SESE GÖRE yeniden zamanlar.
Kullanım: python3 vo_yerlestir.py <cümle_wav_klasörü>   (l00.wav … l13.wav; sırası seslendirme.srt ile aynı)
Yaptıkları:
- Her cümlenin başındaki/sonundaki sessizliği kırpar, cümle içi duraklamaları 0,08 sn'ye indirir, tempoyu %8 artırır.
- Cümleleri arka arkaya dizer (cümle arası 0,06 sn, bölüm arası 0,14 sn) → boş bekleme yok.
- Bölüm sürelerini (SEC), sayı patlama anlarını (K) ve altyazıları index.html'e yazar; out/timing.json üretir.
- out/vo.wav (video süresi kadar) üretir.
"""
import sys, os, re, json, wave, subprocess, numpy as np
SR = 48000; SRC = sys.argv[1]
TEMPO = float(os.environ.get('TEMPO', '1.08'))
GAP_IN, GAP_SEC, LEAD, TAIL = 0.06, 0.14, 0.10, 0.12
SECTIONS = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11, 12], [13]]
MIN_DUR = [2.4, 4.0, 3.6, 4.4, 4.0, 5.5, 3.6]   # görsellerin okunabilmesi için en kısa bölüm süreleri
CTA_HOLD = 1.8                                 # son cümleden sonra soru ekranında kalma süresi

def load(i):
    af = (f'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,'
          f'silenceremove=stop_periods=-1:stop_duration=0.16:stop_threshold=-42dB:stop_silence=0.08,atempo={TEMPO:.3f}')
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'{SRC}/l{i:02d}.wav', '-af', af, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(out, np.int16).astype(np.float32) / 32768

clips = {i: load(i) for i in range(14)}
dur = {i: len(a) / SR for i, a in clips.items()}
start, SEC = {}, []
t = 0.0
for k, ids in enumerate(SECTIONS):
    s0 = t; SEC.append(round(s0, 3)); cur = s0 + (0.08 if k == 0 else LEAD)
    for j, i in enumerate(ids):
        start[i] = cur; cur += dur[i] + (GAP_IN if j < len(ids) - 1 else 0)
    end = cur + (CTA_HOLD if k == len(SECTIONS) - 1 else TAIL)
    end = max(end, s0 + MIN_DUR[k])
    t = end + (GAP_SEC if k < len(SECTIONS) - 1 else 0)
SEC.append(round(t, 3)); TOTAL = SEC[-1]
K = {
    'calcRes': round(start[3] - SEC[1] + 0.45 * dur[3], 3),      # "…sadece elli lira" anında = 50 TL/saat
    'calDone': round(start[5] - SEC[2] + 0.22, 3),               # "tam kırk gün"
    'coffeeSlam': round(start[7] - SEC[3] + 0.22, 3),            # "Tam sekiz bin lira!"
    'burgerSlam': round(start[9] - SEC[4] + 0.22, 3),            # "Tam on sekiz bin lira!"
    'badges': round(max(2.0, start[11] - SEC[5] - 0.2), 3),
}
timing = {'SEC': SEC, 'K': K, 'caps': [round(start[i], 3) for i in range(14)]}
os.makedirs('out', exist_ok=True); json.dump(timing, open('out/timing.json', 'w'), indent=1)

track = np.zeros(int(SR * TOTAL) + 1, np.float32)
for i, a in clips.items():
    j = int(start[i] * SR); track[j:j + len(a)] += a[:len(track) - j]
with wave.open('out/vo_ham.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(track, -1, 1) * 32767).astype(np.int16).tobytes())
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'out/vo_ham.wav', '-af', 'highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,loudnorm=I=-16:TP=-1.5:LRA=9', '-ar', str(SR), 'out/vo.wav'], check=True)
os.remove('out/vo_ham.wav')

html = open('index.html', encoding='utf-8').read()
html = re.sub(r'/\*TIMING\*/.*?/\*/TIMING\*/', '/*TIMING*/const TIMING = ' + json.dumps({'SEC': SEC, 'K': K}) + ';/*/TIMING*/', html, flags=re.S)
block = html[html.index('const CAPS'):html.index('const NOTES_REL')]
it = iter(range(14))
html = html.replace(block, re.sub(r"\[\s*([\d.]+),\s*'", lambda m: f"[{start[next(it)]:.2f}, '", block))
open('index.html', 'w', encoding='utf-8').write(html)
print('Toplam süre:', TOTAL, 'sn'); print('Bölümler:', SEC); print('Patlamalar:', K)
for i in range(14): print(f'  cümle {i:02d}: {start[i]:6.2f} sn  ({dur[i]:.2f} sn)')
