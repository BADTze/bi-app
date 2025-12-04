import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFutureInsight } from "@/hooks/insightEngine";

export function KPIOutlook() {
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

  const kpi = data.kpi_outlook;

  return (
    <Card className="p-2 shadow-md gap-2 max-h-56">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold text-gray-900">
          KPI OUTLOOK
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="text-lg">Avg Forecast</div>
        {/* Avg Forecast */}
        <div className="text-center">
          <div className="text-5xl font-extrabold ">
            {kpi.avg_forecast.toFixed(2)}
          </div>
        </div>

        {/* Target + Gap */}
        <div className="flex justify-center items-center space-x-4 text-lg text-gray-700">
          <div className="flex items-center space-x-1">
            <span className="font-medium">Target</span>
            <span className="font-bold ">{kpi.target.toFixed(2)}</span>
          </div>
          <span className="font-bold">~</span>
          <div className="flex items-center space-x-1">
            <span className="font-medium">Gap</span>
            <span className="font-bold ">{kpi.gap.toFixed(2)}</span>
          </div>
        </div>

        {/* Status */}
        {/* <div className="text-center mt-2">
          <span className="text-sm text-gray-500">Status</span>
          <div
            className={`mt-1 inline-block px-4 py-1 rounded-full text-sm font-semibold ${
              kpi.status === "RED"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {kpi.status}
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}
