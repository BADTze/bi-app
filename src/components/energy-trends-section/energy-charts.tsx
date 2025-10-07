import ReactECharts from "echarts-for-react";

interface EnergyTrendChartProps {
  title: string;
  data: { month: string; year: string; value: number }[];
  color?: string;
  unit?: string;
}

export function EnergyTrendChart({ title, data, color, unit }: EnergyTrendChartProps) {
  const categories = data.map((d) => `${d.year}-${d.month}`);
  const values = data.map((d) => Number(d.value.toFixed(2)));

  const option = {
    title: { text: title, left: "center", textStyle: { fontSize: 14 } },
    tooltip: {
      trigger: "axis",
      valueFormatter: (v: number) => `${v.toFixed(2)} ${unit ?? ""}`,
    },
    xAxis: { type: "category", data: categories },
    yAxis: {
      type: "value",
      name: unit,
      axisLabel: { formatter: (val: number) => val.toLocaleString() },
    },
    series: [
      {
        name: title,
        type: "line",
        data: values,
        smooth: true,
        symbolSize: 6,
        lineStyle: { width: 2, color: color ?? "#3b82f6" },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 240 }} />;
}
