import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ForecastRow {
  date: string;
  forecastValue: number | null;
}
interface ActualRow {
  date: string;
  value: number;
}

export function CompareTable({ forecastData, actualData }: { forecastData: ForecastRow[]; actualData: ActualRow[] }) {
  const allDates = Array.from(new Set([...forecastData.map(f => f.date), ...actualData.map(a => a.date)])).sort();

  return (
    <Card className="flex-1 min-w-[300px] bg-gray-200 gap-3 py-3">
      <CardHeader className="px-3">
        <CardTitle>Actual vs Forecast</CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <Table className="bg-white rounded-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>DATE</TableHead>
              <TableHead>Forecast Value</TableHead>
              <TableHead>Actual Value</TableHead>
              <TableHead>Gap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allDates.length > 0 ? (
              allDates.map((date, i) => {
                const forecast = forecastData.find(f => f.date === date);
                const actual = actualData.find(a => a.date === date);
                let gap = "-";
                if (forecast?.forecastValue != null && actual?.value != null) {
                  gap = (forecast.forecastValue - actual.value).toFixed(2);
                }
                return (
                  <TableRow key={i}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{forecast?.forecastValue?.toFixed(2) ?? "-"}</TableCell>
                    <TableCell>{actual?.value?.toFixed(2) ?? "-"}</TableCell>
                    <TableCell>{gap}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
