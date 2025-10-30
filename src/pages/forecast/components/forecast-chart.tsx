import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface ForecastRow {
  date: string;
  forecastValue: number | null;
  upperValue: number | null;
  lowerValue: number | null;
}

interface ActualRow {
  date: string;
  value: number;
}

interface ForecastChartProps {
  forecastData: ForecastRow[];
  actualData: ActualRow[];
}

// Helper untuk menggabungkan data
function mergeData(forecastData: ForecastRow[], actualData: ActualRow[]) {
  // Buat map dari data aktual berdasarkan tanggal
  const actualMap = new Map(actualData.map((d) => [d.date, d.value]));

  // Gabungkan kedua data. Kita menggunakan forecastData sebagai basis karena
  // mencakup semua tanggal (historical + forecast).
  const merged = forecastData.map((forecastItem) => {
    return {
      date: forecastItem.date,
      forecastValue: forecastItem.forecastValue,
      upperValue: forecastItem.upperValue,
      lowerValue: forecastItem.lowerValue,
      // Ambil nilai aktual jika ada, jika tidak, gunakan null
      actualValue: actualMap.get(forecastItem.date) ?? null,
    };
  });

  return merged;
}

export function ForecastChart({
  forecastData,
  actualData,
}: ForecastChartProps) {
  const mergedData = mergeData(forecastData, actualData);

  const series = [
    {
      name: "Actual",
      type: "line",
      data: mergedData.map((d) => ({ x: d.date, y: d.actualValue })),
    },
    {
      name: "Forecast",
      type: "line",
      data: mergedData.map((d) => ({ x: d.date, y: d.forecastValue })),
    },
    {
      name: "Forecast Upper",
      type: "line",
      data: mergedData.map((d) => ({ x: d.date, y: d.upperValue })),
    },
    {
      name: "Forecast Lower",
      type: "line",
      data: mergedData.map((d) => ({ x: d.date, y: d.lowerValue })),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 400,
      toolbar: { show: false },
    },
    colors: ["#ca4e4d", "#5585fe", "#f59d00", "#f59d00"], // Sesuaikan warna
    stroke: { curve: "smooth", width: [3, 3, 3, 3] },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: (val) => (val !== null ? val.toFixed(2) : ""),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => (val !== null ? val.toFixed(2) : ""),
      },
      shared: true,
      intersect: false,
    },
  };

  return <Chart options={options} series={series} type="line" height={400} />;
}
