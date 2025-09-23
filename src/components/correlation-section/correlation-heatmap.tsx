import React from "react";
import Chart from "react-apexcharts";

interface CorrelationHeatmapProps {
  matrix: Record<string, Record<string, number>>;
}

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ matrix }) => {
  const categories = Object.keys(matrix);
  const series = categories.map((row) => ({
    name: row,
    data: categories.map((col) => matrix[row][col]),
  }));

  return (
    <div className="border rounded-lg shadow-md">
      <Chart
        type="heatmap"
        height={350}
        series={series}
        options={{
          chart: { toolbar: { show: false } },
          dataLabels: {
            enabled: true,
            formatter: (val: number) => val.toFixed(2),
          },
          xaxis: { categories },
          colors: ["#008FFB"],
        }}
      />
    </div>
  );
};

export default CorrelationHeatmap;
