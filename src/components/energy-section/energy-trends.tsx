import type { EnergyData } from ".";
import { LineTrendChart } from "../line-charts";

interface EnergyTrendsProps {
  selectedYear: string;
  data: EnergyData[];
}

export function EnergyTrends({ selectedYear, data }: EnergyTrendsProps) {
  const extractCategory = (key: string) =>
    data
      .filter((d) => d.year === selectedYear)
      .map((d) => {
        const value =
          typeof d.values?.[key] === "number" ? d.values[key] : null;
        return value !== null ? { month: d.month, year: d.year, value } : null;
      })
      .filter(Boolean) as { month: string; year: string; value: number }[];

  return (
    <div className="flex flex-col gap-3 w-full rounded-2xl border-2 p-3 shadow-sm bg-white">
      <h2 className="text-xl font-semibold">Energy Trends</h2>
      <div className="grid gap-2">
        <div className="border rounded-lg bg-gray-50 p-2">
          <LineTrendChart
            title="Diesel Consumption"
            data={extractCategory("dieselValue")}
            color="#1e3a8a"
          />
        </div>
        <div className="border rounded-lg bg-gray-50 p-2">
          <LineTrendChart
            title="Electricity Usage"
            data={extractCategory("electricity")}
            color="#f59e0b"
          />
        </div>
        <div className="border rounded-lg bg-gray-50 p-2">
          <LineTrendChart
            title="Natural Gas Usage"
            data={extractCategory("naturalGas")}
            color="#059669"
          />
        </div>
        <div className="border rounded-lg bg-gray-50 p-2">
          <LineTrendChart
            title="Index Energy"
            data={extractCategory("indexEnergy")}
            color="#ef4444"
          />
        </div>
      </div>
    </div>
  );
}
