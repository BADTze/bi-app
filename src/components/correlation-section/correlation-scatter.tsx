import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as ecStat from "echarts-stat";

interface Props {
  pair: string[];
  title: string;
}

interface RawDataItem {
  year: string;
  month: string;
  values: Record<string, number>;
}

export function CorrelationScatter({ pair, title }: Props) {
  const [series, setSeries] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRawData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/bi-apps/api/raw_data");
        const data: RawDataItem[] = await res.json();

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

          setSeries(filtered);
        }
      } catch (err) {
        console.error("Error fetching raw_data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRawData();
  }, [pair]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // hitung regresi linear
  const regression = ecStat.regression("linear", series, 1);
  regression.points.sort((a, b) => a[0] - b[0]);

  const option = {
    title: { text: title, left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: { name: pair[0] },
    yAxis: { name: pair[1] },
    series: [
      {
        type: "scatter",
        data: series,
        symbolSize: 8,
      },
      {
        type: "line",
        data: regression.points,
        smooth: true,
        lineStyle: { color: "#d14a61", width: 2 },
        showSymbol: false,
        markPoint: {
          data: [
            { coord: regression.points[0], value: "Start" },
            { coord: regression.points[regression.points.length - 1], value: "End" },
          ],
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
