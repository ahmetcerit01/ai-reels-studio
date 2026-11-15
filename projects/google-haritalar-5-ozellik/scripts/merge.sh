#!/usr/bin/env bash
# Tek parça seslendirme kaydını (veya müziği) render edilmiş videoya ekler; videodaki ses efektlerini korur.
# Kullanım: bash scripts/merge.sh <video.mp4> <seslendirme.wav> [çıktı.mp4] [ses_efekti_seviyesi=0.6]
# Not: Sahne sahne seslendirme kullanıyorsan buna gerek yok — dosyaları public/vo/ içine koyup
#      'npm run fit && npm run render:all' çalıştırman yeterli (ses render'a dahil olur).
set -euo pipefail
V="${1:?video}"; A="${2:?seslendirme}"; O="${3:-out/final.mp4}"; FX="${4:-0.6}"
if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$V" | grep -q .; then
  ffmpeg -y -i "$V" -i "$A" -filter_complex "[0:a]volume=${FX}[fx];[1:a]loudnorm=I=-14:TP=-1.5:LRA=11[vo];[fx][vo]amix=inputs=2:duration=first:dropout_transition=0[a]" \
    -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "$O"
else
  ffmpeg -y -i "$V" -i "$A" -filter_complex "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "$O"
fi
echo "Hazır: $O"
