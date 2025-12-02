import ReactECharts from "echarts-for-react";
import { useForecast } from "@/hooks/forecastData";

interface ForecastCompareChartProps {
  year: string;
}

export default function ForecastCompareChart({ year }: ForecastCompareChartProps) {
  const category = "indexEnergy";

  const sarimax = useForecast("sarimax", category, year);
  const prophet = useForecast("prophet", category, year);
  const linear = useForecast("linear", category, year);

  const mapData = (rows: any[]) =>
    rows.map((r) => {
      const [yr, mo] = r.date.split("-");
      return {
        label: `${yr}-${mo}`,
        value: r.forecastValue ?? 0,
      };
    });

  const sarimaxData = mapData(sarimax.forecastData);
  const prophetData = mapData(prophet.forecastData);
  const linearData = mapData(linear.forecastData);

  const categories = sarimaxData.map((d) => d.label);

  const option = {
    title: {
      text: `Forecast Comparison (${year})`,
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
      data: ["SARIMAX", "Prophet", "Linear"],
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
      },
    },
    series: [
      {
        name: "SARIMAX",
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
              { offset: 0, color: '#f59e42' },
              { offset: 1, color: '#fbbf24' },
            ],
          },
        },
        itemStyle: { color: '#f59e42' },
        data: sarimaxData.map((d) => d.value),
        emphasis: { focus: 'series' },
      },
      {
        name: "Prophet",
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
        data: prophetData.map((d) => d.value),
        emphasis: { focus: 'series' },
      },
      {
        name: "Linear",
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
              { offset: 0, color: '#059669' },
              { offset: 1, color: '#34d399' },
            ],
          },
        },
        itemStyle: { color: '#059669' },
        data: linearData.map((d) => d.value),
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
      {(sarimax.warning || prophet.warning || linear.warning) && (
        <p className="text-red-500 text-sm mt-2">
          {sarimax.warning || prophet.warning || linear.warning}
        </p>
      )}
    </div>
  );
}
