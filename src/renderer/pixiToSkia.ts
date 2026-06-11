import type {CanvasKit, Canvas} from 'canvaskit-wasm';
import * as PIXI from 'pixi.js-legacy';

import {renderGraphics} from './renderGraphics';
import {renderSprite} from './renderSprite';
import {applyPixiTransform, restoreTransform} from './transform';

export async function renderPixiNode(
  node: PIXI.DisplayObject,
  canvas: Canvas,
  CanvasKit: CanvasKit
) {
  applyPixiTransform(canvas, node);

  if (node instanceof PIXI.Graphics) {
    renderGraphics(node, canvas, CanvasKit);
  }

  if (node instanceof PIXI.Sprite) {
    await renderSprite(node, canvas, CanvasKit);
  }

  if (node instanceof PIXI.Container) {
    for (const child of node.children) {
      await renderPixiNode(child, canvas, CanvasKit);
    }
  }

  restoreTransform(canvas);
}

export async function renderPixiContainer(
  container: PIXI.Container,
  canvas: Canvas,
  CanvasKit: CanvasKit
) {
  await renderPixiNode(container, canvas, CanvasKit);
}
