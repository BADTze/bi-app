import type { EnergyData } from ".";
import { LineTrendChart } from "@/components/line-charts";

interface EnergyTrendsProps {
  selectedYear: string;
  data: EnergyData[];
}

export function EnergyTrends({ selectedYear, data }: EnergyTrendsProps) {
  const extractCategory = (key: string) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");

    return data
      .filter((d) => {
        if (d.year === currentYear) {
          return d.year === selectedYear && d.month <= currentMonth;
        }
        return d.year === selectedYear;
      })
      .map((d) => {
        const value =
          typeof d.values?.[key] === "number" ? d.values[key] : null;
        return value !== null ? { month: d.month, year: d.year, value } : null;
      })
      .filter(Boolean) as { month: string; year: string; value: number }[];
  };

  return (
    <div className="flex flex-col gap-3 w-full rounded-2xl border-2 p-3 shadow-sm bg-white">
      <h2 className="text-xl font-semibold">Energy Trends</h2>
      <div className="grid gap-3">
        <div className="border rounded-lg bg-gray-50 p-2 h-52">
          <LineTrendChart
            title="Index Energy"
            data={extractCategory("indexEnergy")}
            color="#ef4444"
          />
        </div>
        <div className="border rounded-lg bg-gray-50 p-2 h-52">
          <LineTrendChart
            title="Electricity Usage"
            data={extractCategory("electricity")}
            color="#f59e0b"
          />
        </div>
        <div className="border rounded-lg bg-gray-50 p-2 h-52">
          <LineTrendChart
            title="Natural Gas Usage"
            data={extractCategory("naturalGas")}
            color="#059669"
          />
        </div>
      </div>
    </div>
  );
}
