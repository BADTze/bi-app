import ReactECharts from "echarts-for-react";

interface HeatmapChartProps {
  matrix: Record<string, Record<string, number>>;
  title?: string;
  min?: number;
  max?: number;
  colorRange?: string[];
}

export function HeatmapChart({
  matrix,
  title,
  min = -1,
  max = 1,
  colorRange,
}: HeatmapChartProps) {
  const vars = Object.keys(matrix);
  const values: [number, number, number][] = [];

  vars.forEach((row, i) => {
    vars.forEach((col, j) => {
      values.push([j, i, Number(matrix[row][col].toFixed(2))]);
    });
  });

  const option = {
    title: title
      ? { text: title, left: "center", top: 0, textStyle: { fontSize: 14 } }
      : undefined,
    tooltip: {
      position: "top",
      formatter: (params: any) =>
        `${vars[params.value[1]]} vs ${vars[params.value[0]]}: ${
          params.value[2]
        }`,
    },
    grid: { top: 20, left: 10, bottom: 10, right: 20, containLabel: true },
    xAxis: { type: "category", data: vars, splitArea: { show: true } },
    yAxis: { type: "category", data: vars, splitArea: { show: true } },
    visualMap: {
      min,
      max,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "0%",
      inRange: colorRange ? { color: colorRange } : undefined,
      show: false,
    },
    series: [
      {
        name: "Heatmap",
        type: "heatmap",
        data: values,
        label: { show: true },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ width: "100%", height: "100%"}}
    />
  );
}
