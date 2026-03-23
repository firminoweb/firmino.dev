export function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="bg-blob-1 animate-pulse-slow" />
      <div className="bg-blob-2 animate-pulse-med" />
      <div className="bg-blob-3 animate-pulse-long" />
      <div className="bg-grid animate-grid-drift" />
    </div>
  );
}
