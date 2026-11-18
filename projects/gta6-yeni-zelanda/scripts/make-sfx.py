"""Özgün ses efektleri üretir (tamamen kodla sentezlenir, dış kaynak yok).
Çıktı: public/sfx/*.wav  (48 kHz, 16-bit, mono)"""
import numpy as np, wave, os
SR = 48000
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def save(name, x, gain=0.9):
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    # kısa fade in/out (tık sesi olmasın)
    n = min(len(x)//10, 240); x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n)
    with wave.open(os.path.join(OUT, name), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR*d)) / SR
def lp(x, a):  # tek kutuplu alçak geçiren, a: 0..1
    y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x): acc += a * (v - acc); y[i] = acc
    return y
def env(n, att, dec):
    e = np.ones(n); a = int(SR*att); d = n - a
    e[:a] = np.linspace(0, 1, a) if a > 0 else 1
    e[a:] = np.exp(-np.linspace(0, dec, d)); return e

# whoosh: filtrelenmiş gürültü + kesim frekansı süpürmesi
d = 0.55; n = int(SR*d); noise = rng.standard_normal(n)
cut = np.concatenate([np.linspace(0.02, 0.35, n//2), np.linspace(0.35, 0.03, n - n//2)])
y = np.zeros(n); acc = 0.0
for i in range(n): acc += cut[i] * (noise[i] - acc); y[i] = acc
y *= np.sin(np.linspace(0, np.pi, n))**1.5
save('whoosh.wav', y, 0.7)

# pop: hızlı perde düşüşlü sinüs
tt = t(0.14); f = 900*np.exp(-tt*28) + 320
y = np.sin(2*np.pi*np.cumsum(f)/SR) * env(len(tt), 0.002, 9)
save('pop.wav', y, 0.8)

# tap/click: kısa tık + gövde
tt = t(0.07); y = (rng.standard_normal(len(tt))*np.exp(-tt*300)*0.6 + np.sin(2*np.pi*1800*tt)*np.exp(-tt*120))
save('tap.wav', lp(y, 0.5), 0.7)

# tick: altyazı/adım için çok hafif
tt = t(0.05); y = np.sin(2*np.pi*2600*tt)*np.exp(-tt*160)
save('tick.wav', y, 0.45)

# success: iki notalı yükselen çan
tt = t(0.5); y = np.zeros(len(tt))
for k, (fr, st) in enumerate([(880, 0.0), (1318.5, 0.09)]):
    m = tt >= st; tl = tt[m] - st
    y[m] += (np.sin(2*np.pi*fr*tl) + 0.3*np.sin(2*np.pi*fr*2*tl)) * np.exp(-tl*7)
save('success.wav', y, 0.6)

# shimmer: zaman yolculuğu için parlayan arpej + gürültü süpürmesi
tt = t(1.4); y = np.zeros(len(tt))
for k, fr in enumerate([523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98]):
    st = k*0.08; m = tt >= st; tl = tt[m] - st
    y[m] += np.sin(2*np.pi*fr*tl)*np.exp(-tl*3.2)*0.5
nz = lp(rng.standard_normal(len(tt)), 0.25) * np.sin(np.linspace(0, np.pi, len(tt)))**2 * 0.25
save('shimmer.wav', y + nz, 0.6)

# rise: kapanış öncesi yükselen ton
tt = t(0.9); f = 200 + 600*(tt/tt[-1])**2
y = (np.sin(2*np.pi*np.cumsum(f)/SR) * 0.5 + lp(rng.standard_normal(len(tt)), 0.1)*0.5) * (tt/tt[-1])**2
save('rise.wav', y, 0.55)
# impact: derin vuruş (başlık/sayı patlaması)
tt = t(1.1); f = 55 + 120*np.exp(-tt*12)
y = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*3.4) + lp(rng.standard_normal(len(tt)), 0.35)*np.exp(-tt*18)*0.8
save('impact.wav', y, 0.95)
# clock: saat tik-tak
tt = t(0.06); y = (np.sin(2*np.pi*3200*tt) + 0.5*np.sin(2*np.pi*5100*tt))*np.exp(-tt*170)
save('clock.wav', y, 0.5)
# error: hatalı yöntem için kısa iki ton
tt = t(0.32); y = np.where(tt < 0.14, np.sign(np.sin(2*np.pi*220*tt)), np.where(tt > 0.17, np.sign(np.sin(2*np.pi*165*tt)), 0)) * 0.35
save('error.wav', lp(y, 0.3), 0.6)
# unlock: kilit açılma + çan
tt = t(0.9); y = lp(rng.standard_normal(len(tt)), 0.6)*np.exp(-tt*80)*0.6
for fr, st in [(1046.5, 0.05), (1568, 0.13), (2093, 0.21)]:
    m = tt >= st; tl = tt[m]-st; y[m] += np.sin(2*np.pi*fr*tl)*np.exp(-tl*6)*0.5
save('unlock.wav', y, 0.7)
print('SFX hazır:', sorted(os.listdir(OUT)))
