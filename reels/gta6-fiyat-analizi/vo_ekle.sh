#!/usr/bin/env bash
# Kullanım: bash vo_ekle.sh <seslendirme.wav|mp3|m4a> [çıktı.mp4]
set -euo pipefail
cd "$(dirname "$0")"
VO="${1:?seslendirme dosyası}"; OUT="${2:-out/gta6_fiyat_analizi_vo.mp4}"
ffmpeg -y -i out/video_sessiz.mp4 -i out/sfx.wav -i "$VO" -filter_complex \
 "[2:a]aformat=channel_layouts=stereo,loudnorm=I=-16:TP=-1.5:LRA=11,apad=whole_dur=43,asplit=2[vo][key];\
  [1:a]aformat=channel_layouts=stereo,volume=0.55[fx];\
  [fx][key]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=300[fxd];\
  [fxd][vo]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -t 43 -movflags +faststart "$OUT"
echo "Hazır: $OUT"
