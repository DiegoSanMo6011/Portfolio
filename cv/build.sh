#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CV_DIR="$ROOT_DIR/cv"
OUT_DIR="$ROOT_DIR/public/assets/docs"

mkdir -p "$OUT_DIR"

pdflatex -interaction=nonstopmode -output-directory "$OUT_DIR" "$CV_DIR/diego_sanchez_cv.tex" >/dev/null
mv -f "$OUT_DIR/diego_sanchez_cv.pdf" "$OUT_DIR/Diego-Gerardo-Sanchez-Moreno-CV.pdf"

pdflatex -interaction=nonstopmode -output-directory "$OUT_DIR" "$CV_DIR/diego_sanchez_cv_robotics.tex" >/dev/null
mv -f "$OUT_DIR/diego_sanchez_cv_robotics.pdf" "$OUT_DIR/Diego-Gerardo-Sanchez-Moreno-CV-Robotics.pdf"

pdflatex -interaction=nonstopmode -output-directory "$OUT_DIR" "$CV_DIR/diego_sanchez_cv_software.tex" >/dev/null
mv -f "$OUT_DIR/diego_sanchez_cv_software.pdf" "$OUT_DIR/Diego-Gerardo-Sanchez-Moreno-CV-Software.pdf"
