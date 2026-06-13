import {Button} from '@/shared';

type Props = {
  onAddShape: () => void;
  onExportPdf: () => void;
  onClearScene: () => void;
};

export function Toolbar({onAddShape, onExportPdf, onClearScene}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
      }}
    >
      <Button onClick={onAddShape}>Add Shape</Button>
      <Button onClick={onClearScene}>Clear Scene</Button>
      <Button onClick={onExportPdf}>Export PDF</Button>
    </div>
  );
}
