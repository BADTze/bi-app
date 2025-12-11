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
    <Card className="p-2 shadow-md max-h-60 max-w-60 gap-0">
      <CardHeader className="p-0 gap-0">
        <CardTitle className="text-base font-bold text-gray-800">
          KPI Index Energy Outlook
        </CardTitle>
        <p className="text-sm font-normal text-gray-500 mt-1">
          (Based on Forecast)
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="text-sm">Avg Forecast</div>
        <div className="text-center">
          <div className="text-5xl font-extrabold">
            {kpi.avg_forecast.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 text-lg text-gray-700">
          <div className="flex items-center space-x-1">
            <span className="font-medium">Target</span>
            <span className="font-bold">{kpi.target.toFixed(2)}</span>
          </div>
          <span className="font-bold">~</span>
          <div className="flex items-center space-x-1">
            <span className="font-medium">Gap</span>
            <span className="font-bold">{kpi.gap.toFixed(2)}</span>
          </div>
        </div>
        <div className="text-center mt-2">
          <div
            className={`text-xs mt-1 font-semibold ${
              kpi.status === "RED" ? "text-red-600" : "text-green-600"
            } flex items-center justify-center gap-1`}
          >
            {Math.abs(kpi.gap) > 0 ? (
              <>
                {kpi.status === "RED" ? (
                  <span className="inline-block">▲</span>
                ) : (
                  <span className="inline-block">▼</span>
                )}
                <span>
                  {((Math.abs(kpi.gap) / kpi.target) * 100).toFixed(1)}%{" "}
                  {kpi.status === "RED" ? "di atas" : "di bawah"} target
                </span>
              </>
            ) : (
              <span className="text-green-600">Tepat di target</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
