import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DeviationsCardProps {
  forecastData: { date: string; forecastValue: number | null }[];
  actualData: { date: string; value: number | null }[];
  topN?: number;
}

const DeviationsCard: React.FC<DeviationsCardProps> = ({
  forecastData,
  actualData,
  topN = 3,
}) => {
  // hitung deviasi
  const deviations = forecastData
    .map((f) => {
      const actual = actualData.find((a) => a.date === f.date);
      if (!actual || f.forecastValue === null || actual.value === null)
        return null;

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
        <CardTitle>Top {topN} Deviations</CardTitle>
      </CardHeader>
      <CardContent>
        {deviations.length > 0 ? (
          <ul className="text-sm space-y-2">
            {deviations.map((d, i) => (
              <li key={i} className="space-y-1 mb-2">
                <span className="font-medium block">{d.date}</span>
                <span className="text-left block">
                  Forecast {d.forecast.toFixed(2)} vs Actual{" "}
                  {d.actual.toFixed(2)}{" "}
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
          <div className="text-gray-500 text-sm">No deviations found.</div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviationsCard;
