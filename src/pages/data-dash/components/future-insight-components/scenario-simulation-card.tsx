import { useFutureInsight } from "@/hooks/insightEngine";

export function CostProjectionCard() {
  const { data, loading, error } = useFutureInsight();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !data) return <div className="p-4 text-red-500">{error ?? "No data"}</div>;

  const cost = data.cost_projection;

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Cost Projection</h2>

      <p><strong>Avg Price/GJ (Electricity):</strong> {cost.avg_price_per_gj_electricity}</p>
      <p><strong>Avg Price/GJ (Natural Gas):</strong> {cost.avg_price_per_gj_natural_gas}</p>

      <h3 className="font-semibold mt-3">Projected Cost</h3>
      <ul className="pl-4 list-disc">
        <li>Electricity Cost: {cost.electricity_cost_est}</li>
        <li>Natural Gas Cost: {cost.natural_gas_cost_est}</li>
      </ul>

      <p className="mt-3 font-bold">Total Estimated Cost: {cost.total_cost_est}</p>
    </div>
  );
}
