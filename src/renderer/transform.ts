import type {Canvas} from 'canvaskit-wasm';
import type {DisplayObject} from 'pixi.js-legacy';

export function applyPixiTransform(canvas: Canvas, node: DisplayObject) {
  canvas.save();

  canvas.translate(node.position.x, node.position.y);

  canvas.rotate((node.rotation * 180) / Math.PI, 0, 0);

  canvas.scale(node.scale.x, node.scale.y);
}

export function restoreTransform(canvas: Canvas) {
  canvas.restore();
}
