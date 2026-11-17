"""Özgün ses efekti kanalı (telifsiz, tamamen kodla sentezlenir) → out/sfx.wav (43 sn, 48 kHz)
Olay zamanları index.html'deki animasyonlarla eşleşir. Düzenlemek için EVENTS listesini değiştir."""
import numpy as np, wave, os
SR = 48000
rng = np.random.default_rng(3)
t_ = lambda d: np.arange(int(SR * d)) / SR
def lp(x, a):
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x): acc += a * (v - acc); y[i] = acc
    return y
def impact():
    t = t_(1.2); f = 55 + 120 * np.exp(-t * 12)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)
    hit = lp(rng.standard_normal(len(t)), .35) * np.exp(-t * 18) * .8
    return (boom + hit) * .9
def whoosh(d=.45):
    n = int(SR * d); x = rng.standard_normal(n); cut = np.concatenate([np.linspace(.02, .32, n // 2), np.linspace(.32, .03, n - n // 2)])
    y = np.empty(n); acc = 0.0
    for i in range(n): acc += cut[i] * (x[i] - acc); y[i] = acc
    return y * np.sin(np.linspace(0, np.pi, n)) ** 1.5 * 1.6
def tick(f=2400, d=.045):
    t = t_(d); return np.sin(2 * np.pi * f * t) * np.exp(-t * 140) * .5
def key():
    t = t_(.08); return (lp(rng.standard_normal(len(t)), .5) * np.exp(-t * 220) + np.sin(2 * np.pi * 900 * t) * np.exp(-t * 90)) * .55
def pop():
    t = t_(.14); f = 900 * np.exp(-t * 26) + 300; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10) * .6
def ching():
    t = t_(1.0); y = np.zeros(len(t))
    for fr, st in [(1568, 0), (2093, .06), (2637, .12)]:
        m = t >= st; tl = t[m] - st; y[m] += (np.sin(2 * np.pi * fr * tl) + .4 * np.sin(2 * np.pi * fr * 2.01 * tl)) * np.exp(-tl * 6)
    return y * .45 + impact()[:len(t)] * .5
def riser(d):
    t = t_(d); f = 180 + 700 * (t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .35 + lp(rng.standard_normal(len(t)), .12) * .6) * (t / d) ** 2 * .7
import json
T = json.load(open('out/timing.json')) if os.path.exists('out/timing.json') else {'SEC': [0, 3, 9, 15, 24, 31, 39, 43], 'K': {'calcRes': 2.6, 'calDone': 4.0, 'coffeeSlam': 4.6, 'burgerSlam': 3.6, 'badges': 2.4}}
SEC, K = T['SEC'], T['K']; DUR = SEC[-1]; kf = K['calcRes'] / 2.6
EV = []
add = lambda at, snd, g=1.0: EV.append((at, snd, g))
add(0.0, impact(), 1.0); add(0.12, impact(), .6); add(0.65, pop(), .8); add(1.15, pop(), .5); add(1.35, pop(), .5)
for s in SEC[1:7]: add(s - .2, whoosh(), .7)
for k in [.5, .75, .9, 1.05, 1.2, 1.55, 1.85, 2.05]: add(SEC[1] + k * kf, key(), .8)
add(SEC[1] + K['calcRes'], impact(), .9)
cd = SEC[2] + K['calDone']; add(max(SEC[2] + .1, cd - 2.4), riser(min(2.4, cd - SEC[2] - .1)), .8); add(cd, impact(), 1.0)
cs = K['coffeeSlam']; d3 = max(1, cs - .75)
for i in range(40): add(SEC[3] + .4 + i * d3 / 40, tick(2200 + (i % 4) * 120), .5)
add(SEC[3] + cs, ching(), 1.0)
bs = K['burgerSlam']; d4 = max(1, bs - .75)
for i in range(40): add(SEC[4] + .4 + i * d4 / 40, tick(1800 + (i % 4) * 120), .5)
add(SEC[4] + bs, ching(), 1.0)
for k in range(3): add(SEC[5] + .4 + k * .5, whoosh(.35), .45)
add(SEC[5] + K['badges'], pop(), .6); add(SEC[5] + K['badges'] + .3, pop(), .6)
add(SEC[6] + .1, impact(), .7)
for k in range(4): add(SEC[6] + .7 + k * .35, pop(), .7)
mix = np.zeros(int(SR * DUR) + SR)
for at, snd, g in EV:
    i = int(at * SR); mix[i:i + len(snd)] += snd[:len(mix) - i] * g
mix = mix[:int(SR * DUR)]; mix = mix / (np.max(np.abs(mix)) + 1e-9) * .89
os.makedirs('out', exist_ok=True)
with wave.open('out/sfx.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('out/sfx.wav hazır,', len(EV), 'olay,', round(DUR, 2), 'sn')
