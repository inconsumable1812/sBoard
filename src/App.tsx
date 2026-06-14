import {useState} from 'react';
import {PixiStage} from './components/PixiStage';
import {SkiaPreview} from './components/SkiaPreview';
import {Toolbar} from './components/Toolbar';
import {createDemoScene} from './scene/createDemoScene';
import {addRandomShape} from './scene/randomShape';
import {useCanvasKit} from './hooks/useCanvasKit';
import {exportPdf} from './pdf/exportPdf';
import styles from './App.module.scss';

export default function App() {
  const canvasKit = useCanvasKit();
  const [scene, setScene] = useState(() => createDemoScene());
  const [skiaVersion, setSkiaVersion] = useState(0);

  if (!scene) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <Toolbar
        onAddShape={() => {
          addRandomShape(scene);
          setSkiaVersion(prev => prev + 1);
        }}
        onClearScene={() => {
          setScene(createDemoScene());
          setSkiaVersion(0);
        }}
        onExportPdf={() => {
          exportPdf(scene);
        }}
      />

      <div className={styles.canvasContainer}>
        <div>
          <h3>Pixi</h3>
          <PixiStage container={scene} />
        </div>

        <div>
          <h3>Skia</h3>
          <SkiaPreview
            canvasKit={canvasKit}
            container={scene}
            skiaVersion={skiaVersion}
          />
        </div>
      </div>
    </div>
  );
}
