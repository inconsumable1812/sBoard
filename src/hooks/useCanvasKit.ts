import {useEffect, useState} from 'react';
import {loadCanvasKit, type CanvasKitInstance} from '@/utils/canvaskitLoader';

export function useCanvasKit() {
  const [canvasKit, setCanvasKit] = useState<CanvasKitInstance | null>(null);

  useEffect(() => {
    let mounted = true;

    loadCanvasKit()
      .then(instance => {
        if (!mounted) return;

        setCanvasKit(instance);
      })
      .catch(err => {
        console.error(err);

        if (!mounted) return;
      });

    return () => {
      mounted = false;
    };
  }, []);

  return canvasKit;
}
