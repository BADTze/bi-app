import ReactECharts from "echarts-for-react";

export function CorrelationHeatmap({
  matrix,
  title,
}: {
  matrix: Record<string, Record<string, number>>;
  title: string;
}) {
  const variables = Object.keys(matrix);
  const values: [number, number, number][] = [];

  variables.forEach((row, i) => {
    variables.forEach((col, j) => {
      values.push([i, j, matrix[row][col]]);
    });
  });

  const option = {
    title: { text: `${title} Correlation Heatmap`, left: "center" },
    tooltip: { position: "top" },
    xAxis: { type: "category", data: variables },
    yAxis: { type: "category", data: variables },
    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "10%",
    },
    series: [
      {
        name: "Correlation",
        type: "heatmap",
        data: values,
        label: { show: true },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.5)",
          },
        },
      },
    ],
  };

  return <ReactECharts style={{ height: 400 }} option={option} />;
}
