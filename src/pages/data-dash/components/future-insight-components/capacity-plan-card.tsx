import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-2">
        Capacity Planning Next Year{" "}
        <span className="text-sm">(Based on Forecast)</span>
      </h2>
      <div className="text-lg">
        Required Energy: {cap.required_energy_next_year.toLocaleString()}
      </div>
      <div className="text-lg">
        Buffer Plan 10%: {cap.required_buffer.toLocaleString()}
      </div>
      <div className="text-lg">
        Recommended Capacity: {cap.recommended_capacity.toLocaleString()}
      </div>
    </Card>
  );
}
