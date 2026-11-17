"""Seslendirme cümlelerini videoya yerleştirir ve altyazıları sese göre yeniden zamanlar.
Kullanım: python3 vo_yerlestir.py <cümle_wav_klasörü>   (klasörde l00.wav … l13.wav olmalı; sırası seslendirme.srt ile aynı)
Çıktılar: out/vo.wav (43 sn) + index.html içindeki CAPS zamanları güncellenir (yedek: index.backup.html)
Kurallar:
- Her cümle kendi altyazı anında başlar; önceki cümle uzarsa araya 0,12 sn boşluk bırakıp kayar.
- Vurgulu cümleler ekrandaki patlama anına sabitlenir (ANCHORS).
- Bir bölüme sığmayan cümleler perdeyi bozmadan (atempo) en fazla %25 hızlandırılır.
"""
import sys, os, re, json, wave, shutil, subprocess, numpy as np
SR = 48000; TOTAL = 43.0
SRC = sys.argv[1]
SECTIONS = [(0, 3, [0, 1]), (3, 9, [2, 3]), (9, 15, [4, 5]), (15, 24, [6, 7]), (24, 31, [8, 9]), (31, 39, [10, 11, 12]), (39, 43, [13])]
ANCHORS = {3: 5.35, 7: 19.45, 9: 27.45}        # "50 lira", "8.000 lira!", "18.000 lira!" patlamaları
html = open('index.html', encoding='utf-8').read()
caps_block = html[html.index('const CAPS'):html.index('const NOTES')]
DEFAULT = [float(x) for x in re.findall(r"\[\s*([\d.]+),\s*'", caps_block)]
assert len(DEFAULT) == 14, DEFAULT

def load(i, tempo=1.0):
    p = f'{SRC}/l{i:02d}.wav'
    cmd = ['ffmpeg', '-v', 'error', '-i', p, '-af', f'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,atempo={tempo:.3f}', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.int16).astype(np.float32) / 32768

starts, clips, tempos = {}, {}, {}
for s0, s1, ids in SECTIONS:
    for tempo in np.arange(1.0, 1.26, 0.03):
        cur = s0 + 0.08; ok = True; st = {}; cl = {}
        for k, i in enumerate(ids):
            a = load(i, tempo); want = ANCHORS.get(i, DEFAULT[i])
            t = max(want if i in ANCHORS else max(want, s0 + 0.08), cur)
            if i in ANCHORS and cur > ANCHORS[i] + 0.05: ok = False
            st[i], cl[i] = t, a; cur = t + len(a) / SR + 0.12
        limit = s1 - 0.1 if s1 < TOTAL else TOTAL - 0.4
        if ok and cur - 0.12 <= limit: break
    starts.update(st); clips.update(cl); tempos.update({i: round(float(tempo), 2) for i in ids})
    if not (ok and cur - 0.12 <= limit): print(f'UYARI: bölüm {s0}-{s1} %25 hızlandırmayla bile tam sığmadı ({cur - 0.12:.2f} > {limit})')

track = np.zeros(int(SR * TOTAL), np.float32)
for i, a in clips.items():
    j = int(starts[i] * SR); track[j:j + len(a)] += a[:len(track) - j]
with wave.open('out/vo_ham.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(track, -1, 1) * 32767).astype(np.int16).tobytes())
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'out/vo_ham.wav', '-af', 'highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,loudnorm=I=-16:TP=-1.5:LRA=9', '-ar', str(SR), 'out/vo.wav'], check=True)
os.remove('out/vo_ham.wav')

# altyazı zamanlarını sese eşitle
shutil.copy('index.html', 'index.backup.html')
it = iter(range(14))
new_block = re.sub(r"\[\s*([\d.]+),\s*'", lambda m: f"[{starts[next(it)]:.2f}, '", caps_block)
open('index.html', 'w', encoding='utf-8').write(html.replace(caps_block, new_block))
plan = [{'cumle': i, 'baslangic': round(starts[i], 2), 'sure': round(len(clips[i]) / SR, 2), 'hiz': tempos[i]} for i in sorted(starts)]
json.dump(plan, open('out/vo_plan.json', 'w'), indent=1)
for p in plan: print(p)
print('out/vo.wav hazır; index.html altyazı zamanları güncellendi')
