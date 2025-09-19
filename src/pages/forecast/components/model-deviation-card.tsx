import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ModelDeviationCardProps {
  evaluation: { mae: number; rmse: number; mape: number } | null;
  forecastData: { date: string; forecastValue: number | null }[];
  actualData: { date: string; value: number | null }[];
  topN?: number;
}

const ModelDeviationCard: React.FC<ModelDeviationCardProps> = ({
  evaluation,
  forecastData,
  actualData,
  topN = 3,
}) => {
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
                  <span className="font-bold">{evaluation.mae.toFixed(2)}</span>
                </p>
                <p>
                  RMSE:{" "}
                  <span className="font-bold">{evaluation.rmse.toFixed(2)}</span>
                </p>
                <p>
                  MAPE:{" "}
                  <span className="font-bold">
                    {evaluation.mape}%
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-500">No evaluation available</p>
            )}
          </div>

          {/* Deviations */}
          <div className="text-sm">
            <h4 className="font-semibold mb-2">Top {topN} Deviations</h4>
            {deviations.length > 0 ? (
              <ul className="space-y-1">
                {deviations.map((d, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{d.date}:</span>
                    <span>
                      {d.forecast.toFixed(2)} vs {d.actual.toFixed(2)}{" "}
                      <span
                        className={`ml-1 px-2 py-0.5 rounded text-xs font-semibold ${
                          d.diff > 0
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {d.diff > 0 ? "+" : ""}
                        {d.diffPercent.toFixed(2)}%
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No deviations found</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelDeviationCard;
