import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ModelDeviationCardProps {
  evaluation: { mae: number; rmse: number; mape: number } | null;
  forecastData: { date: string; forecastValue: number | null }[];
  actualData: { date: string; value: number | null }[];
  topN?: number;
}

export function ModelDeviationCard({
  evaluation,
  forecastData,
  actualData,
  topN = 3,
}: ModelDeviationCardProps) {
  const deviations = forecastData
    .map((f) => {
      const actual = actualData.find((a) => a.date === f.date);
      if (!actual || f.forecastValue === null || actual.value === null) return null;

      const diff = f.forecastValue - actual.value;
      const diffPercent = actual.value !== 0 ? (diff / actual.value) * 100 : 0;

      return {
        date: f.date,
        forecast: f.forecastValue,
        actual: actual.value,
        diff,
        diffPercent,
      };
    })
    .filter((d): d is NonNullable<typeof d> => d !== null)
    .sort((a, b) => Math.abs(b.diffPercent) - Math.abs(a.diffPercent))
    .slice(0, topN)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Model Performance & Deviations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Model Summary */}
          <div className="space-y-2 text-sm">
            {evaluation ? (
              <>
                <p>
                  MAE:{" "}
                  {evaluation.mae}
                </p>
                <p>
                  RMSE:{" "}
                  {evaluation.rmse}
                </p>
                <p>
                  MAPE:{" "}
                  {evaluation.mape}
                </p>
              </>
            ) : (
              <p>No evaluation data available</p>
            )}
          </div>

          {/* Deviations */}
          <div className="space-y-2 text-sm">
            {deviations.length > 0 ? (
              deviations.map((d, i) => (
                <div key={i}>
                  <p>
                    <strong>{d.date}</strong>
                  </p>
                  <p>
                    Forecast: {d.forecast.toFixed(2)} vs Actual: {d.actual.toFixed(2)}
                  </p>
                  <p>Deviation: {d.diffPercent.toFixed(2)}%</p>
                </div>
              ))
            ) : (
              <p>No deviations available</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
