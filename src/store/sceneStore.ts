import {create} from 'zustand';

import * as PIXI from 'pixi.js-legacy';

interface SceneStore {
  scene: PIXI.Container | null;
  setScene: (scene: PIXI.Container) => void;
}

export const useSceneStore = create<SceneStore>(set => ({
  scene: null,

  setScene: scene =>
    set({
      scene,
    }),
}));
