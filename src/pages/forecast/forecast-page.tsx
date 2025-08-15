import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/filter-bar";

const ForecastPage: React.FC = () => {
  const chartData: Data[] = [
    {
      x: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"],
      y: [120, 130, 125, 140, 150, 145],
      type: "scatter",
      mode: "lines+markers",
      name: "Forecast",
      line: { color: "#3b82f6" },
    },
    {
      x: ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"],
      y: [118, 132, 128, 138, 148, 147],
      type: "scatter",
      mode: "lines+markers",
      name: "Actual",
      line: { color: "#f97316" },
    },
  ];

  const chartLayout: Partial<Layout> = {
    xaxis: { title: { text: "Month" } },
    yaxis: { title: { text: "Value" } },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
  };

  const forecastDataDummy = [
    {
      date: "2024-07",
      forecastValue: 155,
      upperValue: 160,
      lowerValue: 150,
    },
    {
      date: "2024-08",
      forecastValue: 165,
      upperValue: 172,
      lowerValue: 158,
    },
    {
      date: "2024-09",
      forecastValue: 170,
      upperValue: 178,
      lowerValue: 162,
    },
    {
      date: "2024-10",
      forecastValue: 175,
      upperValue: 185,
      lowerValue: 165,
    },
    {
      date: "2024-11",
      forecastValue: 180,
      upperValue: 190,
      lowerValue: 170,
    },
    {
      date: "2024-12",
      forecastValue: 195,
      upperValue: 205,
      lowerValue: 185,
    },
  ];

  const comparisonDataDummy = [
    {
      date: "2024-01",
      forecastValue: 120,
      actualValue: 118,
    },
    {
      date: "2024-02",
      forecastValue: 130,
      actualValue: 132,
    },
    {
      date: "2024-03",
      forecastValue: 125,
      actualValue: 128,
    },
    {
      date: "2024-04",
      forecastValue: 140,
      actualValue: 138,
    },
    {
      date: "2024-05",
      forecastValue: 150,
      actualValue: 148,
    },
    {
      date: "2024-06",
      forecastValue: 145,
      actualValue: 147,
    },
  ];

  const forecastData = forecastDataDummy;
  const comparisonData = comparisonDataDummy;

  return (
    <div className="flex p-4">
      <div className="flex w-full flex-wrap gap-2">
        <div className="w-full mb-2 h-15 content-center border-2 rounded-lg p-2">
          <h2 className="uppercase font-bold">Forecast Pages</h2>
        </div>

        <div className="w-full border-2 rounded-lg p-2 shadow-md">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Forecast vs Actual (GJ/Kl)</h3>
            <div className="inline-flex rounded-md border-2 p-0.5 shadow-sm gap-1" >
              <Button variant="mine">Model 1</Button>
              <Button variant="mine">Model 2</Button>
            </div>
            <div><FilterBar/></div>
          </div>
          <Plot
            data={chartData}
            layout={chartLayout}
            style={{ width: "100%" }}
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full mt-2">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Model Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              This section contains evaluation metrics for the forecasting
              model.
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Summary Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              This section contains evaluation metrics for the forecasting
              model.
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Summary Actual</CardTitle>
            </CardHeader>
            <CardContent>
              This section contains evaluation metrics for the forecasting
              model.
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4 w-full mt-2">
          {/* Forecast Data Table */}
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
                  {forecastData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{data.date}</TableCell>
                      <TableCell>{data.forecastValue}</TableCell>
                      <TableCell>{data.upperValue}</TableCell>
                      <TableCell>{data.lowerValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Compare Data Table */}
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
                  {comparisonData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{data.date}</TableCell>
                      <TableCell>{data.forecastValue}</TableCell>
                      <TableCell>{data.actualValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;
