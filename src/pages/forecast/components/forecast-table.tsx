import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ForecastRow {
  date: string;
  forecastValue: number | null;
  upperValue: number | null;
  lowerValue: number | null;
}

const ForecastTable: React.FC<{ forecastData: ForecastRow[] }> = ({ forecastData }) => (
  <Card className="flex-1 min-w-[300px]">
    <CardHeader>
      <CardTitle>Data Forecast</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>DATE</TableHead>
            <TableHead>Forecast Value</TableHead>
            <TableHead>Upper Value</TableHead>
            <TableHead>Lower Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forecastData.length > 0 ? (
            forecastData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.forecastValue?.toFixed(2) ?? "-"}</TableCell>
                <TableCell>{row.upperValue?.toFixed(2) ?? "-"}</TableCell>
                <TableCell>{row.lowerValue?.toFixed(2) ?? "-"}</TableCell>
              </TableRow>
            ))
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

export default ForecastTable;
