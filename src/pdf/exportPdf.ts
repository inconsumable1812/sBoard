import {PDFDocument} from 'pdf-lib';
import * as PIXI from 'pixi.js-legacy';

import {exportPdfNode} from './exportPdfNode';

export async function exportPdf(container: PIXI.Container) {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([800, 600]);

  await exportPdfNode(container, page);

  const bytes = await pdf.save();

  const blob = new Blob([bytes.buffer as ArrayBuffer], {
    type: 'application/pdf',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.download = 'scene.pdf';

  link.click();

  URL.revokeObjectURL(url);
}
