import * as PIXI from 'pixi.js-legacy';
import type {PDFPage} from 'pdf-lib';
import {pixiColorToPdf} from './color';

const PAGE_HEIGHT = 600;

function getWorldTransformInfo(graphics: PIXI.Graphics) {
  const wt = graphics.worldTransform;

  const scaleX = Math.sqrt(wt.a * wt.a + wt.b * wt.b);

  const scaleY = Math.sqrt(wt.c * wt.c + wt.d * wt.d);

  const angle = Math.atan2(wt.b, wt.a) * (180 / Math.PI);

  return {
    x: wt.tx,
    y: wt.ty,
    scaleX,
    scaleY,
    angle,
  };
}

export function exportGraphicsPdf(graphics: PIXI.Graphics, page: PDFPage) {
  const geometry = graphics.geometry;

  const data = geometry.graphicsData;

  const {x, y, scaleX, scaleY} = getWorldTransformInfo(graphics);

  data.forEach(item => {
    const shape = item.shape;

    if (!shape) return;

    const color = pixiColorToPdf(item.fillStyle.color);

    switch (shape.type) {
      case PIXI.SHAPES.RECT: {
        page.drawRectangle({
          x: x + shape.x * scaleX,

          y: PAGE_HEIGHT - (y + (shape.y + shape.height) * scaleY),

          width: shape.width * scaleX,

          height: shape.height * scaleY,

          color,
        });

        break;
      }

      case PIXI.SHAPES.ELIP: {
        page.drawEllipse({
          x: x + shape.x * scaleX,

          y: PAGE_HEIGHT - (y + shape.y * scaleY),

          xScale: shape.width * scaleX,

          yScale: shape.height * scaleY,

          color,
        });

        break;
      }

      case PIXI.SHAPES.POLY: {
        const points = shape.points;

        if (points.length !== 4) return;

        page.drawLine({
          start: {
            x: x + points[0] * scaleX,

            y: PAGE_HEIGHT - (y + points[1] * scaleY),
          },

          end: {
            x: x + points[2] * scaleX,

            y: PAGE_HEIGHT - (y + points[3] * scaleY),
          },

          thickness: 2,

          color,
        });

        break;
      }
    }
  });
}
