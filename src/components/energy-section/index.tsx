import { useEffect, useState } from "react";
import { EnergyTrends } from "@/components/energy-section/energy-trends";
import { EnergyTable } from "@/components/energy-section/energy-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface EnergyData {
  month: string;
  year: string;
  values: Record<string, number>;
}

export function EnergyOverviewSection() {
  const [data, setData] = useState<EnergyData[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:5000/bi-apps/api/clean_data?extend=true")
      .then((res) => res.json())
      .then((json) => {
        const rows = Array.isArray(json) ? json : json?.data ?? [];
        const typed: EnergyData[] = rows.map((r: EnergyData) => ({
          month: String(r.month).padStart(2, "0"),
          year: String(r.year),
          values: r.values ?? {},
        }));

        setData(typed);

        const years = Array.from(new Set(typed.map((d) => d.year))).sort();
        setAvailableYears(years);

        const currentYear = new Date().getFullYear().toString();
        setSelectedYear(
          years.includes(currentYear) ? currentYear : years.at(-1) ?? ""
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching clean_data:", err);
        setData([]);
        setAvailableYears([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />;
  }

  return (
    <div className="w-full h-full space-y-4 border-2 rounded-2xl gap-6 p-3 bg-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Energy Overview</h2>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px] h-[36px] rounded px-3 text-sm bg-white shadow-sm">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <EnergyTable selectedYear={selectedYear} data={data} />
        <EnergyTrends selectedYear={selectedYear} data={data} />
      </div>
    </div>
  );
}
