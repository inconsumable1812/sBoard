## Кастомная сборка CanvasKit с PDF support

Стандартная сборка `canvaskit-wasm` из npm не включает PDF backend.
Для работы экспорта в PDF необходимо использовать кастомную сборку:

1. Склонировать репозиторий Skia
2. Собрать CanvasKit с флагом `is_pdf_too=true`:
   ```bash
   bin/canvaskit_wasm_debug.js \
     --build_canvaskit \
     --canvasKit_out=out/canvaskit \
     --extra_cflags='["-DSK_SUPPORT_PDF=1"]'
   ```
