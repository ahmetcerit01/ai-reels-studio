#!/usr/bin/env bash
# Tek parça seslendirmeyi (ör. telefon kaydı) render edilmiş videoya ekler; ses efektleri konuşurken otomatik kısılır.
# Kullanım: bash scripts/sesi-ekle.sh seslendirme.wav [out/gta6_yeni_zelanda_reels_sesli.mp4]
# Not: En iyi senkron için cümle cümle kayıt + 'npm run fit' önerilir (video senin hızına göre yeniden zamanlanır).
set -euo pipefail
cd "$(dirname "$0")/.."
VO="${1:?seslendirme dosyası}"; OUT="${2:-out/gta6_yeni_zelanda_reels_sesli.mp4}"; V=out/gta6_yeni_zelanda_reels.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
ffmpeg -y -i "$V" -i "$VO" -filter_complex \
 "[1:a]aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-1.5:LRA=11,apad=whole_dur=$D,asplit=2[vo][key];\
  [0:a]aformat=channel_layouts=stereo,volume=0.6[fx];[fx][key]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[fxd];\
  [fxd][vo]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t "$D" -movflags +faststart "$OUT"
echo "Hazır: $OUT"
