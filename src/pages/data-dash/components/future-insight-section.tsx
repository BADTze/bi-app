import { useFutureInsight } from "@/hooks/insightEngine";

export function FutureInsightSection({ model = "prophet" }: { model?: string }) {
  const { data, loading, error } = useFutureInsight(model);

  if (loading) return <p className="text-center text-gray-600">Loading insight...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!data) return <p className="text-center text-gray-600">No data available.</p>;

  const { summary, kpi_outlook, what_to_expect, what_to_prepare, capacity_planning, scenario_simulation } = data;

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-gray-200 rounded-2xl border-2">
      <h2 className="text-xl font-bold mb-2">Future Insight ({model})</h2>
      {/* Summary */}
      <div className="bg-white p-3 rounded-xl shadow">
        <h3 className="font-semibold mb-1">Summary</h3>
        <ul className="text-sm">
          <li>Year: <b>{summary.year}</b></li>
          <li>Avg Index Energy: <b>{summary.avg_index_energy.toLocaleString("id-ID")}</b></li>
          <li>Total Energy (Yearly): <b>{summary.total_energy_yearly.toLocaleString("id-ID")}</b></li>
          <li>Avg Product (KL): <b>{summary.avg_productKl.toLocaleString("id-ID")}</b></li>
        </ul>
      </div>
      {/* KPI Outlook */}
      <div className="bg-white p-3 rounded-xl shadow">
        <h3 className="font-semibold mb-1">KPI Outlook</h3>
        <ul className="text-sm">
          <li>Target: <b>{kpi_outlook.target.toLocaleString("id-ID")}</b></li>
          <li>Forecast: <b>{kpi_outlook.forecast.toLocaleString("id-ID")}</b></li>
          <li>Status: <b>{kpi_outlook.status}</b></li>
          <li>Gap: <b>{kpi_outlook.gap.toLocaleString("id-ID")}</b></li>
        </ul>
      </div>
      {/* What to Expect & Prepare */}
      <div className="bg-white p-3 rounded-xl shadow">
        <h3 className="font-semibold mb-1">What to Expect</h3>
        <p className="text-sm mb-2">{what_to_expect}</p>
        <h4 className="font-semibold">What to Prepare</h4>
        <ul className="list-disc list-inside text-sm">
          {what_to_prepare.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      {/* Capacity Planning */}
      <div className="bg-white p-3 rounded-xl shadow">
        <h3 className="font-semibold mb-1">Capacity Planning</h3>
        <ul className="text-sm">
          <li>Required Energy Next Year: <b>{capacity_planning.required_energy_next_year.toLocaleString("id-ID")}</b></li>
          <li>Required Buffer: <b>{capacity_planning.required_buffer.toLocaleString("id-ID")}</b></li>
          <li>Recommended Capacity: <b>{capacity_planning.recommended_capacity.toLocaleString("id-ID")}</b></li>
        </ul>
        <div className="mt-2">
          <h4 className="font-semibold">Peak Load Month</h4>
          <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">{JSON.stringify(capacity_planning.peak_load_month, null, 2)}</pre>
          <h4 className="font-semibold mt-2">Peak Load Index</h4>
          <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">{JSON.stringify(capacity_planning.peak_load_index, null, 2)}</pre>
        </div>
      </div>
      {/* Scenario Simulation */}
      <div className="bg-white p-3 rounded-xl shadow">
        <h3 className="font-semibold mb-1">Scenario Simulation</h3>
        <ul className="text-sm">
          <li>Product +10%: <b>{scenario_simulation.product_plus_10.toLocaleString("id-ID")}</b></li>
          <li>Product -5%: <b>{scenario_simulation.product_minus_5.toLocaleString("id-ID")}</b></li>
          <li>Achieve KPI Target: <b>{scenario_simulation.achieve_KPI_target.toLocaleString("id-ID")}</b></li>
        </ul>
      </div>
    </div>
  );
}
