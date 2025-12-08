import { useFutureInsight } from "@/hooks/insightEngine";

export function ScenarioSimulationCard() {
  const { data, loading, error } = useFutureInsight();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !data) return <div className="p-4 text-red-500">{error ?? "No data"}</div>;

  const sc = data.scenario_simulation;

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Scenario Simulation</h2>

      <p>Product +10% Scenario: <strong>{sc.product_plus_10}</strong> GJ</p>
      <p>Product -5% Scenario: <strong>{sc.product_minus_5}</strong> GJ</p>
      <p>Energy to Achieve KPI Target: <strong>{sc.achieve_KPI_target}</strong> GJ</p>
    </div>
  );
}
