import { useFutureInsight } from "@/hooks/insightEngine";

export function SummaryCard() {
  const { data, loading, error } = useFutureInsight();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !data) return <div className="p-4 text-red-500">{error ?? "No data"}</div>;

  const summary = data.summary;

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Summary — {summary.year}</h2>

      <div className="space-y-1">
        <p><strong>Avg Index Energy:</strong> {summary.avg_index_energy}</p>
        <p><strong>Avg Product (KL):</strong> {summary.avg_productKl}</p>
        <p><strong>Total Energy (GJ):</strong> {summary.total_energy_yearly}</p>

        <p className="font-semibold mt-2">Peak Index Energy:</p>
        <ul className="pl-4 list-disc">
          <li>Prophet: {summary.peak_index_energy.prophet}</li>
          <li>SARIMAX: {summary.peak_index_energy.sarimax}</li>
          <li>Linear: {summary.peak_index_energy.linear}</li>
        </ul>
      </div>
    </div>
  );
}
