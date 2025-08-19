import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";
import FilterBar from "@/components/filter-bar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ForecastRow {
  date: string;
  forecastValue: number;
  upperValue: number;
  lowerValue: number;
}

interface ActualRow {
  date: string;
  value: number;
}

const ForecastPage: React.FC = () => {
  const [model, setModel] = useState("prophet");
  const [category, setCategory] = useState("indexEnergy");
  const [year, setYear] = useState("2025");
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  const [forecastData, setForecastData] = useState<ForecastRow[]>([]);
  const [actualData, setActualData] = useState<ActualRow[]>([]);

  // fetch forecast dari Flask API
  const fetchForecast = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/bi-apps/api/forecast?model=${model}&category=${category}&year=${year}`
      );
      const data = await res.json();

      const mapped: ForecastRow[] = data.forecast.map((item: any) => ({
        date: item.ds.slice(0, 7),
        forecastValue: item.yhat,
        upperValue: item.yhat_upper,
        lowerValue: item.yhat_lower,
      }));

      setForecastData(mapped);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  // fetch actual data
  const fetchRawData = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/bi-apps/api/raw_data`);
      const data = await res.json();

      if (Array.isArray(data)) {
        // ambil daftar tahun unik untuk dropdown
        const years = [...new Set(data.map((item: any) => item.year))];
        setAvailableYears(years);

        // filter sesuai tahun terpilih
        const filtered = data.filter((item: any) => item.year === year);

        const mapped: ActualRow[] = filtered.map((item: any) => ({
          date: `${item.year}-${item.month.padStart(2, "0")}`,
          value: item.values[category],
        }));

        setActualData(mapped);
      }
    } catch (err) {
      console.error("Error fetching actual data:", err);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchRawData();
  }, [model, category, year]);

  // chart data gabungan
  const chartData: Data[] = [
    {
      x: forecastData.map((d) => d.date),
      y: forecastData.map((d) => d.forecastValue),
      name: "Forecast",
      type: "scatter",
      mode: "lines+markers",
      line: { color: "#3b82f6" },
    },
    {
      x: forecastData.map((d) => d.date),
      y: forecastData.map((d) => d.upperValue),
      name: "Forecast Upper",
      type: "scatter",
      mode: "lines",
      line: { color: "rgba(0,0,255,0.2)", dash: "dot" },
      showlegend: true,
    },
    {
      x: forecastData.map((d) => d.date),
      y: forecastData.map((d) => d.lowerValue),
      name: "Forecast Lower",
      type: "scatter",
      mode: "lines",
      line: { color: "rgba(0,0,255,0.2)", dash: "dot" },
      showlegend: true,
    },
    {
      x: actualData.map((d) => d.date),
      y: actualData.map((d) =>
        typeof d.value === "number" ? Number(d.value.toFixed(2)) : null
      ),
      name: "Actual",
      type: "scatter",
      mode: "lines+markers",
      line: { color: "#f97316" },
    },
  ];

  const chartLayout: Partial<Layout> = {
    xaxis: { title: { text: "Month" } },
    yaxis: { title: { text: "Value" } },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    legend: { orientation: "h", y: -0.2 },
  };

  return (
    <div className="flex p-4">
      <div className="flex w-full flex-wrap gap-2">
        {/* Header */}
        <div className="w-full mb-2 h-15 content-center border-2 rounded-lg p-2">
          <h2 className="uppercase font-bold">Forecast Pages</h2>
        </div>

        {/* Chart Card */}
        <div className="w-full bg-gray-200 border-2 rounded-lg p-2 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Forecast vs Actual (GJ/Kl)</h3>

            {/* Model Tabs */}
            <Tabs value={model} onValueChange={setModel}>
              <TabsList className="rounded-md border-2 p-0.5 shadow-sm gap-1">
                <TabsTrigger value="prophet">Model 1</TabsTrigger>
                <TabsTrigger value="sarimax">Model 2</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filter Bar */}
            <FilterBar
              category={category}
              setCategory={setCategory}
              year={year}
              setYear={setYear}
              years={availableYears}
              onSubmit={() => {
                fetchForecast();
                fetchRawData();
              }}
            />
          </div>

          {/* Chart */}
          <Plot
            data={chartData}
            layout={chartLayout}
            style={{ width: "100%" }}
          />
        </div>

        {/* Model Summary */}
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

        {/* Data Tables */}
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
                  {forecastData.length > 0 ? (
                    forecastData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {row.date}
                        </TableCell>
                        <TableCell>{row.forecastValue.toFixed(2)}</TableCell>
                        <TableCell>{row.upperValue.toFixed(2)}</TableCell>
                        <TableCell>{row.lowerValue.toFixed(2)}</TableCell>
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
                  {forecastData.map((f, i) => {
                    const actual = actualData.find((a) => a.date === f.date);
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{f.date}</TableCell>
                        <TableCell>{f.forecastValue.toFixed(2)}</TableCell>
                        <TableCell>
                          {actual && typeof actual.value === "number"
                            ? actual.value.toFixed(2)
                            : "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
