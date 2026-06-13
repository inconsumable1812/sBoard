import * as PIXI from 'pixi.js-legacy';

export function createDemoScene() {
  const mainContainer = new PIXI.Container();

  const subContainer = new PIXI.Container();

  const g1 = new PIXI.Graphics();
  const g2 = new PIXI.Graphics();
  const g3 = new PIXI.Graphics();
  const g4 = new PIXI.Graphics();

  g1.beginFill(0xff0000);
  g1.drawEllipse(0, 0, 200, 100);
  g1.endFill();

  g1.position.set(200, 100);
  g1.angle = 30;

  g1.eventMode = 'static';
  g1.cursor = 'pointer';

  g1.on('pointerdown', () => {
    console.log('ellipse down');
  });
  g1.on('pointerup', () => {
    console.log('ellipse up');
  });

  g2.beginFill(0x0000ff);
  g2.drawRect(-50, -75, 100, 150);
  g2.endFill();

  g2.position.set(120, 60);

  g2.scale.set(1.5, 1.7);

  g2.eventMode = 'static';
  g2.cursor = 'pointer';

  g2.on('pointerdown', () => {
    console.log('rect down');
  });
  g2.on('pointerup', () => {
    console.log('rect up');
  });

  g3.lineStyle({
    width: 10,
    color: 0xffffff,
  });

  g3.moveTo(0, 0);
  g3.lineTo(150, 100);

  g4.lineStyle({
    width: 10,
    color: 0xffff00,
  });

  g4.moveTo(0, 70);
  g4.lineTo(150, -30);

  subContainer.position.set(75, 50);

  subContainer.addChild(g3);
  subContainer.addChild(g4);

  mainContainer.addChild(subContainer);
  mainContainer.addChild(g1);
  mainContainer.addChild(g2);

  return mainContainer;
}
