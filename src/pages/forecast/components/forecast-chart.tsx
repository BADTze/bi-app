import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface ForecastChartProps {
  forecastData: {
    date: string;
    forecastValue: number | null;
    upperValue: number | null;
    lowerValue: number | null;
  }[];
  actualData: { date: string; value: number }[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({
  forecastData,
  actualData,
}) => {
  const series = [
    {
      name: "Forecast",
      type: "line",
      data: forecastData.map((d) => ({ x: d.date, y: d.forecastValue })),
    },
    {
      name: "Forecast Upper",
      type: "line",
      data: forecastData.map((d) => ({ x: d.date, y: d.upperValue })),
    },
    {
      name: "Forecast Lower",
      type: "line",
      data: forecastData.map((d) => ({ x: d.date, y: d.lowerValue })),
    },
    {
      name: "Actual",
      type: "line",
      data: actualData.map((d) => ({ x: d.date, y: d.value })),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 400,
      toolbar: { show: false },
    },
    colors: ["#5585fe", "#f59d00", "#f59d00", "#ca4e4d"],
    stroke: { curve: "smooth", width: [3, 3, 3, 3] },
    xaxis: {
      type: "category",
      title: { text: "Month" },
    },
    yaxis: {
      title: { text: "Value" },
      labels: {
        formatter: (val) => val.toFixed(2),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => (val !== null ? val.toFixed(2) : "N/A"),
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val: number) => val.toFixed(2),
    },
    legend: { position: "bottom" },
  };

  return <Chart options={options} series={series} type="line" height={400} />;
};

export default ForecastChart;
