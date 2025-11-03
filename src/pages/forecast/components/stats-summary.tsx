import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  min: string | number;
  max: string | number;
  avg: string | number;
}

interface StatsSummaryProps {
  actualStats: Stats;
  forecastStats: Stats;
  diffPercent: number | null;
}

export function StatsSummary({
  actualStats,
  forecastStats,
  diffPercent,
}: StatsSummaryProps) {
  return (
    <Card className="flex-1 bg-gray-200 rounded-lg overflow-hidden gap-2 py-4">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="h-full px-4">
        <div className="bg-white p-2 rounded-lg h-full">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">Metric</th>
                <th className="py-1">Actual</th>
                <th className="py-1">Forecast</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1">Min</td>
                <td>{actualStats.min}</td>
                <td>{forecastStats.min}</td>
              </tr>
              <tr>
                <td className="py-1">Max</td>
                <td>{actualStats.max}</td>
                <td>{forecastStats.max}</td>
              </tr>
              <tr>
                <td className="py-1">Avg</td>
                <td>{actualStats.avg}</td>
                <td>{forecastStats.avg}</td>
              </tr>
            </tbody>
          </table>

          {diffPercent !== null && (
            <div className="mt-3 text-xs text-gray-600">
              Forecast rata-rata{" "}
              {diffPercent > 0 ? "lebih tinggi" : "lebih rendah"}{" "}
              {Math.abs(diffPercent).toFixed(2)}% dibanding Actual.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
