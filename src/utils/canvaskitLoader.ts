import CanvasKitInit from 'canvaskit-wasm';
import wasmUrl from 'canvaskit-wasm/bin/canvaskit.wasm?url';

export async function loadCanvasKit() {
  return CanvasKitInit({
    locateFile: () => wasmUrl,
  });
}

export type CanvasKitInstance = Awaited<ReturnType<typeof loadCanvasKit>>;
