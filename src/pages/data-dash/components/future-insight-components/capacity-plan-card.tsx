import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFutureInsight } from "@/hooks/insightEngine";

export function CapacityPlanningCard() {
  const { data, loading, error } = useFutureInsight();

  if (loading)
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );

  if (error || !data)
    return (
      <Card>
        <CardContent>Error loading data</CardContent>
      </Card>
    );

  const cap = data.capacity_planning;
  const sc = data.scenario_simulation;

  const number = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0 });

  return (
    <Card className="p-2 gap-2 shadow-md rounded-xl">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">
          Capacity Planning & Scenario Simulation
        </CardTitle>
        <p className="text-sm text-gray-500">
          Based on forecasted energy index & product KL
        </p>
      </CardHeader>

      <CardContent className="space-y-6 px-0">
        {/* CAPACITY SECTION */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Capacity Planning (Next Year)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border bg-gray-50">
              <div className="text-sm text-gray-500">Required Energy</div>
              <div className="text-xl font-bold text-gray-900">
                {number(cap.required_energy_next_year)}
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <div className="text-sm text-gray-500">Buffer 10%</div>
              <div className="text-xl font-bold text-blue-600">
                {number(cap.required_buffer)}
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50">
              <div className="text-sm text-gray-500">Recommended Capacity</div>
              <div className="text-xl font-bold text-green-600">
                {number(cap.recommended_capacity)}
              </div>
            </div>
          </div>
        </div>

        {/* SCENARIO SECTION */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Scenario Simulation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border bg-white shadow-sm">
              <div className="text-sm text-gray-500">Product +10%</div>
              <div className="text-xl font-bold text-blue-700">
                {number(sc.product_plus_10)}
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-white shadow-sm">
              <div className="text-sm text-gray-500">Product -5%</div>
              <div className="text-xl font-bold text-orange-600">
                {number(sc.product_minus_5)}
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-white shadow-sm">
              <div className="text-sm text-gray-500">Achieve KPI Target</div>
              <div className="text-xl font-bold text-green-700">
                {number(sc.achieve_KPI_target)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
