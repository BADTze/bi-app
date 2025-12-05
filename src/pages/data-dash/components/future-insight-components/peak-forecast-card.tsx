import { Card } from "@/components/ui/card";
import { useFutureInsight } from "@/hooks/insightEngine";

export function PeakForecast() {
  const { data, loading, error } = useFutureInsight();

  if (loading) return <div className="text-gray-700">Loading...</div>;
  if (error || !data)
    return <div className="text-red-500">Error loading data</div>;

  const peak = data.capacity_planning.peak_load;

  const renderSection = (title: string, items: any[]) => (
    <div className="space-y-0.5">
      <div className="text-base font-semibold text-gray-900">{title}</div>
      <div className="border-t border-gray-300">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex justify-between py-2 px-5 border-b border-gray-300"
          >
            <span className="text-sm font-medium text-gray-700">
              {item.month.split(" ")[0]}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {item.index_energy}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="py-0">
      <div className="p-2 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Peak Forecast 
        </h2>
        {renderSection("Prophet", peak.prophet)}
        {renderSection("SARIMAX", peak.sarimax)}
        {renderSection("Linear Regression", peak.linear)}
      </div>
    </Card>
  );
}
