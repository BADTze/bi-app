import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFutureInsight } from "@/hooks/insightEngine";

export function PeakForecastEnergyIndex() {
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

  const peak = data.capacity_planning.peak_load;

  const renderSection = (title: string, items: any[]) => (
    <div className="">
      <h3 className={`font-semibold `}>{title}</h3>
      <div className="divide-y divide-gray-200 rounded-md border">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex justify-between px-2 py-2 hover:bg-gray-50 transition"
          >
            <span className="text-sm font-medium text-gray-600">
              {item.month.split(" ")[0]}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {item.index_energy}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="p-2 shadow-md gap-1">
      <CardHeader className="px-0.5">
        <CardTitle className="text-lg font-bold text-gray-900">
          Peak Forecast Energy Index
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-0.5">
        {renderSection("Prophet", peak.prophet)}
        {renderSection("SARIMAX", peak.sarimax)}
        {renderSection("Linear", peak.linear)}
      </CardContent>
    </Card>
  );
}
