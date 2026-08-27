export function NhsDemoBanner() {
  return (
    <div
      role="note"
      aria-label="Demo mode"
      className="border-l-4 border-warning-700 bg-warning-100 px-4 py-2"
    >
      <div className="mx-auto max-w-6xl text-sm font-medium text-warning-700">
        🔬 DEMO — this is not a real NHS service and uses no real patient data. Everything shown is
        fictional and for illustration only.
      </div>
    </div>
  );
}
