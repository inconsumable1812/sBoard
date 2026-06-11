type Props = {
  onAddShape: () => void;
  onExportPdf: () => void;
  onSwitchScene: () => void;
};

export function Toolbar({onAddShape, onExportPdf, onSwitchScene}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        marginBottom: 20,
      }}
    >
      <button onClick={onAddShape}>Add Shape</button>

      <button onClick={onSwitchScene}>Switch Scene</button>

      <button onClick={onExportPdf}>Export PDF</button>
    </div>
  );
}
