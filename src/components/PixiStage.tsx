import {useEffect, useRef} from 'react';
import * as PIXI from 'pixi.js-legacy';

type Props = {
  container: PIXI.Container;
};

export function PixiStage({container}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const app = new PIXI.Application({
      width: 600,
      height: 500,
      backgroundColor: 0x222222,
      forceCanvas: true,
    });

    appRef.current = app;

    rootRef.current.appendChild(app.view as HTMLCanvasElement);

    app.stage.addChild(container);

    return () => {
      app.destroy(true);
    };
  }, [container]);

  return (
    <div
      ref={rootRef}
      style={{
        border: '1px solid #444',
      }}
    />
  );
}
