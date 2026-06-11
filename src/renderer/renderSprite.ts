import type {CanvasKit, Image, Canvas} from 'canvaskit-wasm';
import * as PIXI from 'pixi.js-legacy';

const imageCache = new Map<string, Image>();

export async function renderSprite(
  sprite: PIXI.Sprite,
  canvas: Canvas,
  CanvasKit: CanvasKit
) {
  const texture = sprite.texture;
  const resource = texture.baseTexture.resource;
  if (!resource) return;

  const src = resource.src;
  if (!src) return;

  let image: Image | null = imageCache.get(src) ?? null;
  if (!image) {
    const response = await fetch(src);
    const buffer = await response.arrayBuffer();

    image = CanvasKit.MakeImageFromEncoded(new Uint8Array(buffer));

    if (!image) return;

    imageCache.set(src, image);
  }
  const paint = new CanvasKit.Paint();

  canvas.drawImageRect(
    image,
    CanvasKit.XYWHRect(0, 0, image.width(), image.height()),
    CanvasKit.XYWHRect(0, 0, sprite.width, sprite.height),
    paint
  );
}
