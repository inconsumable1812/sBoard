import * as PIXI from 'pixi.js-legacy';

export function addRandomShape(container: PIXI.Container) {
  const graphics = new PIXI.Graphics();

  const x = Math.random() * 400;
  const y = Math.random() * 300;

  const width = 50 + Math.random() * 100;

  const height = 50 + Math.random() * 100;

  const color = Math.random() * 0xffffff;

  graphics.beginFill(color);

  graphics.drawRect(-width / 2, -height / 2, width, height);

  graphics.endFill();

  graphics.position.set(x, y);

  graphics.angle = Math.random() * 360;

  graphics.eventMode = 'static';
  graphics.cursor = 'pointer';

  graphics.on('click', () => {
    console.log('random shape click');
  });

  container.addChild(graphics);
}
