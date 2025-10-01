import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as ecStat from "echarts-stat";
import { RegressionInfo } from "@/components/correlation-section/regression-info";

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
  const [regression, setRegression] = useState<any>(null);
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

          if (filtered.length > 2) {
            const reg = ecStat.regression("linear", filtered,1);
            reg.points.sort((a, b) => a[0] - b[0]);
            setRegression(reg);
          }
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

  const option = {
    title: { text: title, left: "center" },
    tooltip: {
      trigger: "item",
      formatter: (params: any) =>
        `${pair[0]}: ${params.value[0]}<br/>${pair[1]}: ${params.value[1]}`,
    },
    grid: { top: 60, bottom: 60, left: 80, right: 40 },
    xAxis: { name: pair[0] },
    yAxis: { name: pair[1] },
    series: [
      {
        name: "Data",
        type: "scatter",
        data: series,
        symbolSize: 8,
        itemStyle: { color: "#5470C6" },
      },
      regression && {
        name: "Regression Line",
        type: "line",
        data: regression.points,
        smooth: true,
        showSymbol: false,
        lineStyle: { color: "#d14a61", width: 2 },
      },
    ].filter(Boolean),
  };

  return (
    <div className="flex flex-col items-center">
      <ReactECharts option={option} style={{ height: 420, width: "100%" }} />
      {regression && (
        <RegressionInfo
          gradient={regression.parameter.gradient}
          intercept={regression.parameter.intercept}
          r={regression.parameter.r}
        />
      )}
    </div>
  );
}
