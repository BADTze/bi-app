import { useEffect, useState } from "react";
import { LineTrendChart } from "@/components/line-charts";

interface EnergyData {
  month: string;
  year: string;
  values: Record<string, number>;
}

export function EnergyTrends() {
  const [data, setData] = useState<EnergyData[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/bi-apps/api/clean_data")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching clean_data:", err));
  }, []);

  const extractCategory = (key: string) =>
    data.map((d) => ({
      month: d.month,
      year: d.year,
      value: d.values[key],
    }));

  return (
    <div className="flex flex-col gap-2 w-full rounded-2xl bg-gray-200 border-2 p-3">
      <h2 className="text-xl font-semibold mb-2">Energy Trends</h2>

      <div className="grid gap-2">
        <div className="border rounded-lg bg-white">
          <LineTrendChart
            title="Diesel Consumption"
            data={extractCategory("dieselValue")}
            color="#1e3a8a"
            // unit="L"
          />
        </div>
        <div className="border rounded-lg bg-white">
          <LineTrendChart
            title="Electricity Usage"
            data={extractCategory("electricity")}
            color="#f59e0b"
            // unit="kWh"
          />
        </div>
        <div className="border rounded-lg bg-white">
          <LineTrendChart
            title="Natural Gas Usage"
            data={extractCategory("naturalGas")}
            color="#059669"
            // unit="m³"
          />
        </div>
        <div className="border rounded-lg bg-white">
          <LineTrendChart
            title="Index Energy"
            data={extractCategory("indexEnergy")}
            color="#ef4444"
            // unit="Index"
          />
        </div>
      </div>
    </div>
  );
}
