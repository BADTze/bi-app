import { useFutureInsight } from "@/hooks/insightEngine";

export function CapacityPlanningCard() {
  const { data, loading, error } = useFutureInsight();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !data) return <div className="p-4 text-red-500">{error ?? "No data"}</div>;

  const c = data.capacity_planning;

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Capacity Planning</h2>

      <p><strong>Electricity Needed (GJ):</strong> {c.required_electricity_gj}</p>
      <p><strong>Natural Gas Needed (GJ):</strong> {c.required_natural_gas_gj}</p>
      <p><strong>Total Energy Required (GJ):</strong> {c.total_energy_gj_next_year}</p>

      <h3 className="font-semibold mt-3">Peak Load</h3>
      <ul className="pl-4 list-disc">
        <li>Electricity: {c.peak_load.electricity.month} — {c.peak_load.electricity.value_gj} GJ</li>
        <li>Natural Gas: {c.peak_load.natural_gas.month} — {c.peak_load.natural_gas.value_gj} GJ</li>
      </ul>

      <h3 className="font-semibold mt-3">Recommended Capacity (+10%)</h3>
      <ul className="pl-4 list-disc">
        <li>Electricity: {c.recommended_capacity_electricity_gj} GJ</li>
        <li>Natural Gas: {c.recommended_capacity_natural_gas_gj} GJ</li>
      </ul>
    </div>
  );
}
