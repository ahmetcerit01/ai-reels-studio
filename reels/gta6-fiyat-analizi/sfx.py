"""Özgün ses efekti kanalı (telifsiz, tamamen kodla sentezlenir) → out/sfx.wav (43 sn, 48 kHz)
Olay zamanları index.html'deki animasyonlarla eşleşir. Düzenlemek için EVENTS listesini değiştir."""
import numpy as np, wave, os
SR, DUR = 48000, 43.0
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
EV = []
add = lambda at, snd, g=1.0: EV.append((at, snd, g))
add(0.0, impact(), 1.0); add(0.12, impact(), .6); add(0.65, pop(), .8); add(1.15, pop(), .5); add(1.35, pop(), .5)
for s in [3.0, 9.0, 15.0, 24.0, 31.0, 39.0]: add(s - .2, whoosh(), .7)
for k in [.5, .75, .9, 1.05, 1.2, 1.55, 1.85, 2.05, 2.6]: add(3.0 + k, key(), .8)
add(5.6, impact(), .9)
add(9.6, riser(3.4), .8); add(13.0, impact(), 1.0)
for i in range(40): add(15.7 + i * 3.6 / 40, tick(2200 + (i % 4) * 120), .5)
add(19.6, ching(), 1.0)
for i in range(40): add(24.6 + i * 3.0 / 40, tick(1800 + (i % 4) * 120), .5)
add(27.6, ching(), 1.0)
for k in range(3): add(31.4 + k * .5, whoosh(.35), .45)
add(33.4, pop(), .6); add(33.7, pop(), .6)
add(39.1, impact(), .7); add(39.0, riser(.3), .2)
for k in range(4): add(39.7 + k * .35, pop(), .7)
mix = np.zeros(int(SR * DUR) + SR)
for at, snd, g in EV:
    i = int(at * SR); mix[i:i + len(snd)] += snd[:len(mix) - i] * g
mix = mix[:int(SR * DUR)]; mix = mix / (np.max(np.abs(mix)) + 1e-9) * .89
os.makedirs('out', exist_ok=True)
with wave.open('out/sfx.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('out/sfx.wav hazır,', len(EV), 'olay')
