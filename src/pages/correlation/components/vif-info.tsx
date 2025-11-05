import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface VifItem {
  feature: string;
  VIF: number;
}

export function VifInfo() {
  const [vifData, setVifData] = useState<VifItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVif = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/bi-apps/api/var_correlation"
        );
        const data = await res.json();
        if (data?.vif) {
          setVifData(data.vif);
        }
      } catch (err) {
        console.error("Error fetching VIF:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVif();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-600">Loading VIF data...</div>;
  }

  if (!vifData.length) {
    return <div className="text-sm text-gray-600">No VIF data available</div>;
  }

  // Buat bar chart horizontal
  const option = {
    title: {
      text: "Variance Inflation Factor (VIF)",
      left: "center",
      textStyle: { fontSize: 14 },
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) =>
        `${params.name}: <b>${params.value.toFixed(2)}</b>`,
    },
    grid: { left: 80, right: 20, top: 40, bottom: 40 },
    xAxis: {
      type: "value",
      name: "VIF",
      axisLabel: { formatter: (val: number) => val.toFixed(2) },
    },
    yAxis: {
      type: "category",
      data: vifData.map((d) => d.feature),
    },
    series: [
      {
        type: "bar",
        data: vifData.map((d) => d.VIF),
        itemStyle: {
          color: (params: any) => (params.value > 10 ? "#ef4444" : "#3b82f6"), // merah jika multikolinearitas tinggi
        },
        label: {
          show: true,
          position: "right",
          formatter: (val: any) => val.value.toFixed(2),
        },
      },
    ],
  };

  return (
    <div className="border rounded-xl bg-white p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-4">VIF Analysis</h3>
      <ReactECharts option={option} style={{ height: 300 }} />
      <p className="text-xs text-gray-500 mt-2">
        VIF &gt; 5 biasanya menandakan adanya multikolinearitas tinggi antar
        variable independent.
      </p>
    </div>
  );
}
