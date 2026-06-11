import * as PIXI from 'pixi.js-legacy';
import type {PDFPage} from 'pdf-lib';
import {exportGraphicsPdf} from './exportGraphicsPdf';

export async function exportPdfNode(node: PIXI.DisplayObject, page: PDFPage) {
  if (node instanceof PIXI.Graphics) {
    exportGraphicsPdf(node, page);
  }

  if (node instanceof PIXI.Container) {
    for (const child of node.children) {
      await exportPdfNode(child, page);
    }
  }
}
