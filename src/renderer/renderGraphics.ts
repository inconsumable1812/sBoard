import type {CanvasKit, Canvas} from 'canvaskit-wasm';
import * as PIXI from 'pixi.js-legacy';

export function renderGraphics(
  graphics: PIXI.Graphics,
  canvas: Canvas,
  CanvasKit: CanvasKit
) {
  const geometry = graphics.geometry;

  const paint = new CanvasKit.Paint();

  paint.setStyle(CanvasKit.PaintStyle.Fill);

  const data = geometry.graphicsData;

  data.forEach(item => {
    const shape = item.shape;

    if (!shape) return;

    paint.setColor(
      CanvasKit.parseColorString(PIXI.utils.hex2string(item.fillStyle.color))
    );

    switch (shape.type) {
      case PIXI.SHAPES.RECT: {
        canvas.drawRect(
          CanvasKit.LTRBRect(
            shape.x,
            shape.y,
            shape.x + shape.width,
            shape.y + shape.height
          ),
          paint
        );
        break;
      }

      case PIXI.SHAPES.ELIP: {
        canvas.drawOval(
          CanvasKit.LTRBRect(
            shape.x - shape.width,
            shape.y - shape.height,
            shape.x + shape.width,
            shape.y + shape.height
          ),
          paint
        );
        break;
      }

      case PIXI.SHAPES.POLY: {
        // const path = new CanvasKit.Path();

        const points = shape.points;
        if (points.length === 4) {
          canvas.drawLine(points[0], points[1], points[2], points[3], paint);
        }
        break;
      }
    }
  });

  paint.delete();
}
