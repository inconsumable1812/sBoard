import * as PIXI from 'pixi.js-legacy';
import type {PDFPage} from 'pdf-lib';
import {degrees} from 'pdf-lib';

import {pixiColorToPdf} from './color';

const PAGE_HEIGHT = 600;

function getWorldInfo(graphics: PIXI.Graphics) {
  const wt = graphics.worldTransform;

  const scaleX = Math.sqrt(wt.a * wt.a + wt.b * wt.b);

  const scaleY = Math.sqrt(wt.c * wt.c + wt.d * wt.d);

  const rotation = Math.atan2(wt.b, wt.a) * (180 / Math.PI);

  return {
    x: wt.tx,
    y: wt.ty,
    scaleX,
    scaleY,
    rotation,
  };
}

export function exportGraphicsPdf(graphics: PIXI.Graphics, page: PDFPage) {
  const {x, y, scaleX, scaleY, rotation} = getWorldInfo(graphics);

  const data = graphics.geometry.graphicsData;

  data.forEach(item => {
    const shape = item.shape;

    if (!shape) return;

    const rawColor = item.fillStyle?.color ?? item.lineStyle?.color ?? 0xffffff;

    const color = pixiColorToPdf(rawColor);

    switch (shape.type) {
      case PIXI.SHAPES.RECT: {
        const width = shape.width * scaleX;
        const height = shape.height * scaleY;

        const centerX = x + (shape.x + shape.width / 2) * scaleX;

        const centerY =
          PAGE_HEIGHT - (y + (shape.y + shape.height / 2) * scaleY);

        page.drawRectangle({
          x: centerX - width / 2,

          y: centerY - height / 2,

          width,

          height,

          color,

          rotate: degrees(-rotation),
        });

        break;
      }

      case PIXI.SHAPES.ELIP: {
        page.drawEllipse({
          x: x + shape.x * scaleX,

          y: PAGE_HEIGHT - y - shape.y * scaleY,

          xScale: shape.width * scaleX,

          yScale: shape.height * scaleY,

          color,

          rotate: degrees(-rotation),
        });

        break;
      }

      case PIXI.SHAPES.POLY: {
        const points = shape.points;

        if (points.length !== 4) {
          return;
        }

        const wt = graphics.worldTransform;

        const x1 = wt.a * points[0] + wt.c * points[1] + wt.tx;

        const y1 = wt.b * points[0] + wt.d * points[1] + wt.ty;

        const x2 = wt.a * points[2] + wt.c * points[3] + wt.tx;

        const y2 = wt.b * points[2] + wt.d * points[3] + wt.ty;

        page.drawLine({
          start: {
            x: x1,
            y: PAGE_HEIGHT - y1,
          },

          end: {
            x: x2,
            y: PAGE_HEIGHT - y2,
          },

          thickness: item.lineStyle?.width ?? 2,

          color,
        });

        break;
      }
    }
  });
}
