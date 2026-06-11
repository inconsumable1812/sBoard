import {useState} from 'react';
import {PixiStage} from './components/PixiStage';
import {SkiaPreview} from './components/SkiaPreview';
import {Toolbar} from './components/Toolbar';
import {createDemoScene} from './scene/createDemoScene';
import {addRandomShape} from './scene/randomShape';
import {useCanvasKit} from './hooks/useCanvasKit';
import {exportPdf} from './pdf/exportPdf';

export default function App() {
  const canvasKit = useCanvasKit();

  const [scene, setScene] = useState(() => createDemoScene());

  const [, forceUpdate] = useState(0);

  if (!scene) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Toolbar
        onAddShape={() => {
          addRandomShape(scene);

          forceUpdate(v => v + 1);
        }}
        onSwitchScene={() => {
          setScene(createDemoScene());
        }}
        onExportPdf={() => {
          exportPdf(scene);
          console.log('export pdf');
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: 24,
        }}
      >
        <div>
          <h3>Pixi</h3>

          <PixiStage container={scene} />
        </div>

        <div>
          <h3>Skia</h3>

          <SkiaPreview canvasKit={canvasKit} container={scene} />
        </div>
      </div>
    </div>
  );
}
