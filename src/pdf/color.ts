import {rgb} from 'pdf-lib';

export function pixiColorToPdf(color: number) {
  return rgb(
    ((color >> 16) & 255) / 255,
    ((color >> 8) & 255) / 255,
    (color & 255) / 255
  );
}
