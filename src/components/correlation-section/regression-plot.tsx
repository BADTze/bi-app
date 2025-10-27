import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface Props {
  pair: string[];
  label: string;
}

interface CleanDataItem {
  year: string;
  month: string;
  values: Record<string, number>;
}

export function RegressionPlot({ pair, label }: Props) {
  const [scatterData, setScatterData] = useState<[number, number][]>([]);
  const [lineData, setLineData] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/bi-apps/api/clean_data?extend=false");
        const data: CleanDataItem[] = await res.json();

        if (Array.isArray(data) && pair.length === 2) {
          const [xVar, yVar] = pair;
          const filtered: [number, number][] = data
            .map((d) => {
              const x = d.values[xVar];
              const y = d.values[yVar];
              if (typeof x === "number" && typeof y === "number") {
                return [x, y];
              }
              return null;
            })
            .filter((d): d is [number, number] => d !== null);

          setScatterData(filtered);

          // hitung regresi linear sederhana
          const n = filtered.length;
          if (n > 1) {
            const xs = filtered.map(([x]) => x);
            const ys = filtered.map(([, y]) => y);
            
            // Normalisasi data untuk menghindari masalah numerik
            const meanX = xs.reduce((a, b) => a + b, 0) / n;
            const meanY = ys.reduce((a, b) => a + b, 0) / n;
            const stdX = Math.sqrt(xs.reduce((a, x) => a + (x - meanX) ** 2, 0) / n);
            const stdY = Math.sqrt(ys.reduce((a, y) => a + (y - meanY) ** 2, 0) / n);
            
            // Hitung korelasi
            const covariance = filtered.reduce((acc, [x, y]) => 
              acc + (x - meanX) * (y - meanY), 0) / n;
            const correlation = covariance / (stdX * stdY);
            
            // Hitung slope dan intercept
            const slope = correlation * (stdY / stdX);
            const intercept = meanY - slope * meanX;
            
            // Tentukan arah garis berdasarkan korelasi
            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);
            
            // Buat titik-titik garis regresi
            const linePoints: [number, number][] = [];
            const steps = 100;
            for (let i = 0; i <= steps; i++) {
              const x = minX + (maxX - minX) * (i / steps);
              const y = slope * x + intercept;
              linePoints.push([x, y]);
            }
            
            setLineData(linePoints);
          }
        }
      } catch (err) {
        console.error("Error fetching clean_data:", err);
      }
    };

    fetchData();
  }, [pair]);

  const formatNumber = (val: number) =>
    val.toLocaleString("en-US", { maximumFractionDigits: 2 });

  // hitung axis range dengan padding
  const xs = scatterData.map(([x]) => x);
  const ys = scatterData.map(([, y]) => y);
  const minX = xs.length ? Math.min(...xs) : 0;
  const maxX = xs.length ? Math.max(...xs) : 1;
  const minY = ys.length ? Math.min(...ys) : 0;
  const maxY = ys.length ? Math.max(...ys) : 1;

  const paddingX = (maxX - minX) * 0.1;
  const paddingY = (maxY - minY) * 0.1;

  const option = {
    title: {
      text: `${pair[0]} vs ${pair[1]} ${label}`,
      left: "center",
      textStyle: { fontSize: 12 },
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const [x, y] = params.value;
        return `
          <b>${pair[0]}</b>: ${x.toFixed(2)}<br/>
          <b>${pair[1]}</b>: ${y.toFixed(2)}
        `;
      },
    },
    grid: {
      top: 10,
      bottom: 5,
      right: 10,
      left: 5,
      containLabel: true,
    },

    xAxis: {
      type: "value",
      name: pair[0],
      min: minX - paddingX,
      max: maxX + paddingX,
      axisLabel: {
        formatter: (val: number) => formatNumber(val),
      },
    },
    yAxis: {
      type: "value",
      name: pair[1],
      min: minY - paddingY,
      max: maxY + paddingY,
      axisLabel: {
        formatter: (val: number) => formatNumber(val),
      },
    },
    series: [
      {
        type: "scatter",
        data: scatterData,
        symbolSize: 8,
        itemStyle: { color: "rgba(60,120,255,0.6)" },
      },
      {
        type: "line",
        data: lineData,
        lineStyle: { 
          color: "#ff4d4f",
          width: 2,
          type: "solid"
        },
        symbol: "none",
        smooth: true,
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
  );
}
