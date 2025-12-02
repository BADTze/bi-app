import ReactECharts from "echarts-for-react";
import { useForecastFG } from "@/hooks/forecastFG";

interface ForecastFGChartProps {
  year?: number;
}

export default function ForecastFGChart({ year }: ForecastFGChartProps) {
  const { data, loading, error } = useForecastFG({ year });

  if (loading) return <p>Loading forecast...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No forecast data available.</p>;

  const categories = data.map((d) => d.ds.slice(0, 7));

  const option = {
    title: {
      text: `Forecast Finish Good KL${year ? ` ${year}` : ""}`,
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 600,
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#22223b',
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: '#fff',
      borderColor: '#e0e7ef',
      textStyle: { color: '#22223b', fontFamily: 'Inter, Arial, sans-serif' },
      padding: 10,
      borderWidth: 1,
      extraCssText: 'box-shadow: 0 2px 8px rgba(0,0,0,0.06);',
      valueFormatter: (v: number) => v != null ? v.toFixed(2) : '',
    },
    legend: {
      top: 38,
      left: 'center',
      icon: 'circle',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 13,
        color: '#22223b',
        fontWeight: 500,
      },
      data: ["Forecast", "Upper", "Lower"],
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLine: { lineStyle: { color: '#e0e7ef' } },
      axisLabel: {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 12,
        color: '#22223b',
        margin: 10,
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#e0e7ef', type: 'dashed' } },
      axisLabel: {
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 12,
        color: '#22223b',
        margin: 10,
        formatter: (val: number) => val != null ? val.toFixed(2) : '',
      },
    },
    series: [
      {
        name: "Forecast",
        type: "line",
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#2563eb' },
              { offset: 1, color: '#60a5fa' },
            ],
          },
        },
        itemStyle: { color: '#2563eb' },
        data: data.map((d) => d.yhat),
        emphasis: { focus: 'series' },
      },
      {
        name: "Upper",
        type: "line",
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 1, type: "dashed", color: '#a1a1aa' },
        itemStyle: { color: '#a1a1aa' },
        data: data.map((d) => d.yhat_upper),
        emphasis: { focus: 'series' },
      },
      {
        name: "Lower",
        type: "line",
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 1, type: "dashed", color: '#a1a1aa' },
        itemStyle: { color: '#a1a1aa' },
        data: data.map((d) => d.yhat_lower),
        emphasis: { focus: 'series' },
      },
    ],
    grid: {
      left: 40,
      right: 20,
      top: 80,
      bottom: 40,
    },
    backgroundColor: '#fff',
  };

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-sm flex flex-col justify-center">
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
