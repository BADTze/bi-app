export function WarningBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="mb-2 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
      {message}
    </div>
  );
}
