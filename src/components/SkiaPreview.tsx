import {memo, useEffect, useRef} from 'react';
import type {CanvasKit, Surface} from 'canvaskit-wasm';
import type * as PIXI from 'pixi.js-legacy';
import {renderPixiContainer} from '../renderer/pixiToSkia';

type Props = {
  canvasKit: CanvasKit | null;
  container: PIXI.Container;
  skiaVersion: number;
};

export const SkiaPreview = memo(
  ({canvasKit, container, skiaVersion}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const surfaceRef = useRef<Surface | null>(null);
    useEffect(() => {
      if (!canvasKit) return;
      if (!canvasRef.current) return;

      surfaceRef.current = canvasKit.MakeSWCanvasSurface(canvasRef.current);

      return () => {
        surfaceRef.current?.dispose();
      };
    }, [canvasKit]);

    console.log('SkiaPreview render');

    useEffect(() => {
      if (!canvasKit) return;

      const surface = surfaceRef.current;

      if (!surface) return;

      renderPixiContainer(container, surface.getCanvas(), canvasKit).then(
        () => {
          surface.flush();
        }
      );
    }, [container, canvasKit, skiaVersion]);

    return (
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        style={{
          border: '1px solid #444',
        }}
      />
    );
  }
);
