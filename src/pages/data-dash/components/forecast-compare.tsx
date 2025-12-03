import ReactECharts from "echarts-for-react";
import { useForecastCompare } from "@/hooks/forecast_comp";

interface ForecastCompareChartProps {
  year: number;
}

export default function ForecastCompareChart({
  year,
}: ForecastCompareChartProps) {
  const { data, loading, error } = useForecastCompare(year);

  if (loading) return <p>Loading comparison...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No data available.</p>;

  const categories = data.map((d) => d.date);

  const option = {
    title: {
      text: `Forecast Comparison (${year})`,
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        fontFamily: "Inter, Arial, sans-serif",
        color: "#22223b",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#e0e7ef",
      textStyle: { color: "#22223b", fontFamily: "Inter, Arial, sans-serif" },
      padding: 10,
      borderWidth: 1,
      extraCssText: "box-shadow: 0 2px 8px rgba(0,0,0,0.06);",
    },
    legend: {
      top: 38,
      left: "center",
      icon: "circle",
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: 13,
        color: "#22223b",
        fontWeight: 500,
      },
      data: ["SARIMAX", "Prophet", "Linear"],
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLine: { lineStyle: { color: "#e0e7ef" } },
      axisLabel: {
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: 12,
        color: "#22223b",
        margin: 10,
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#e0e7ef", type: "dashed" } },
      axisLabel: {
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: 12,
        color: "#22223b",
        margin: 10,
      },
    },
    series: [
      {
        name: "SARIMAX",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 2,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#f59e42" },
              { offset: 1, color: "#fbbf24" },
            ],
          },
        },
        itemStyle: { color: "#f59e42" },
        data: data.map((d) => d.sarimax),
        emphasis: { focus: "series" },
      },
      {
        name: "Prophet",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 2,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#2563eb" },
              { offset: 1, color: "#60a5fa" },
            ],
          },
        },
        itemStyle: { color: "#2563eb" },
        data: data.map((d) => d.prophet),
        emphasis: { focus: "series" },
      },
      {
        name: "Linear",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 2,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#059669" },
              { offset: 1, color: "#34d399" },
            ],
          },
        },
        itemStyle: { color: "#059669" },
        data: data.map((d) => d.linear),
        emphasis: { focus: "series" },
      },
    ],
    grid: {
      left: 40,
      right: 20,
      top: 80,
      bottom: 40,
    },
    backgroundColor: "#fff",
  };

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-sm flex flex-col justify-center">
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
