import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface ScatterLinePlotProps {
  data: { [key: string]: number | string }[];
  xKey: string;
  yKey: string;
  title?: string;
  showLine?: boolean; // default true, untuk regression/trendline
}

const ScatterLinePlot: React.FC<ScatterLinePlotProps> = ({
  data,
  xKey,
  yKey,
  title,
  showLine = true,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    const scatterData = data
      .map((d) => [d[xKey] as number, d[yKey] as number])
      .filter(([x, y]) => x !== null && y !== null && !isNaN(x) && !isNaN(y));

    let lineSeries: any[] = [];
    if (showLine && scatterData.length > 1) {
      const xs = scatterData.map((d) => d[0]);
      const ys = scatterData.map((d) => d[1]);
      const n = xs.length;
      const meanX = xs.reduce((a, b) => a + b, 0) / n;
      const meanY = ys.reduce((a, b) => a + b, 0) / n;
      const b =
        xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0) /
        xs.reduce((sum, x) => sum + Math.pow(x - meanX, 2), 0);
      const a = meanY - b * meanX;

      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const linePoints = [
        [minX, a + b * minX],
        [maxX, a + b * maxX],
      ];

      lineSeries = [
        {
          type: "line",
          data: linePoints,
          symbol: "none",
          lineStyle: { color: "#FF5722", width: 2, type: "dashed" },
          tooltip: { show: false },
        },
      ];
    }

    chart.setOption({
      title: {
        text: title || `${xKey} vs ${yKey}`,
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) =>
          `${xKey}: ${params.value[0].toFixed(2)}<br/>${yKey}: ${params.value[1].toFixed(2)}`,
      },
      xAxis: { name: xKey, type: "value" },
      yAxis: { name: yKey, type: "value" },
      series: [
        {
          type: "scatter",
          symbolSize: 10,
          itemStyle: { color: "#2196F3" },
          data: scatterData,
        },
        ...lineSeries,
      ],
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, xKey, yKey, title, showLine]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
};

export default ScatterLinePlot;
