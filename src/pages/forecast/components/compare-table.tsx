import React from "react";
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

const CompareTable: React.FC<{ forecastData: ForecastRow[]; actualData: ActualRow[] }> = ({
  forecastData,
  actualData,
}) => {
  const allDates = Array.from(new Set([...forecastData.map(f => f.date), ...actualData.map(a => a.date)])).sort();

  return (
    <Card className="flex-1 min-w-[300px]">
      <CardHeader>
        <CardTitle>Actual vs Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DATE</TableHead>
              <TableHead>Forecast Value</TableHead>
              <TableHead>Actual Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allDates.length > 0 ? (
              allDates.map((date, i) => {
                const forecast = forecastData.find(f => f.date === date);
                const actual = actualData.find(a => a.date === date);
                return (
                  <TableRow key={i}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{forecast?.forecastValue?.toFixed(2) ?? "-"}</TableCell>
                    <TableCell>{actual?.value?.toFixed(2) ?? "-"}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CompareTable;
