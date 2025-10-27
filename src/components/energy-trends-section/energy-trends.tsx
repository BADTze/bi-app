import { useEffect, useState } from "react";
import { LineTrendChart } from "@/components/line-charts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EnergyData {
  month: string;
  year: string;
  values: Record<string, number>;
}

export function EnergyTrends() {
  const [data, setData] = useState<EnergyData[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // pakai extend=true untuk menampilkan sampai tahun berjalan,
    // kalau tidak mau placeholder 0 ganti jadi extend=false
    const url = "http://localhost:5000/bi-apps/api/clean_data?extend=true";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        // json bisa berupa array (default) atau object { category, data }
        let rows: any[] = [];

        if (Array.isArray(json)) {
          rows = json;
        } else if (json && Array.isArray((json as any).data)) {
          rows = (json as any).data;
        } else {
          console.warn("clean_data: unexpected payload", json);
          rows = [];
        }

        // pastikan tipe yang masuk ke state sesuai interface
        const typed: EnergyData[] = rows.map((r) => ({
          month: String(r.month).padStart(2, "0"),
          year: String(r.year),
          values: (r.values ?? {}) as Record<string, number>,
        }));

        setData(typed);

        // eksrak tahun unik -> selalu string[]
        const years = Array.from(
          new Set(typed.map((d) => String(d.year)))
        ).sort();

        setAvailableYears(years);

        // default pilih tahun berjalan kalau ada, else pilih terakhir di list
        const currentYear = new Date().getFullYear().toString();
        if (years.includes(currentYear)) setSelectedYear(currentYear);
        else if (years.length > 0) setSelectedYear(years[years.length - 1]);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching clean_data:", err);
        setData([]);
        setAvailableYears([]);
        setLoading(false);
      });
  }, []);

  // Ambil data per kategori, filter berdasarkan tahun terpilih
  // dan buang nilai yang 0 atau falsy supaya chart tidak dipotong
  const extractCategory = (key: string) =>
    data
      .filter((d) => d.year === selectedYear)
      .map((d) => {
        const raw = d.values?.[key];
        // treat 0 or null/undefined as missing -> exclude (frontend requested)
        const value =
          typeof raw === "number" && !Number.isNaN(raw) && raw !== 0
            ? Number(raw)
            : null;
        return { month: d.month, year: d.year, value };
      })
      .filter((d) => d.value !== null)
      .map((d) => ({ month: d.month, year: d.year, value: d.value as number }));

  // loading/simple fallback
  if (loading) {
    return (
      <div className="flex flex-col gap-2 w-full rounded-2xl bg-gray-200 border-2 p-3">
        <div className="animate-pulse h-6 bg-gray-300 w-1/3 rounded mb-2" />
        <div className="space-y-2">
          <div className="h-36 bg-white rounded" />
          <div className="h-36 bg-white rounded" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 w-full rounded-2xl bg-gray-200 border-2 p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Energy Trends</h2>

        {/* Filter Tahun */}
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

      {/* Chart Section */}
      <div className="grid gap-3">
        <div className="border rounded-lg bg-white p-2">
          <LineTrendChart
            title={`Diesel Consumption (${selectedYear})`}
            data={extractCategory("dieselValue")}
            color="#1e3a8a"
          />
        </div>

        <div className="border rounded-lg bg-white p-2">
          <LineTrendChart
            title={`Electricity Usage (${selectedYear})`}
            data={extractCategory("electricity")}
            color="#f59e0b"
          />
        </div>

        <div className="border rounded-lg bg-white p-2">
          <LineTrendChart
            title={`Natural Gas Usage (${selectedYear})`}
            data={extractCategory("naturalGas")}
            color="#059669"
          />
        </div>

        <div className="border rounded-lg bg-white p-2">
          <LineTrendChart
            title={`Index Energy (${selectedYear})`}
            data={extractCategory("indexEnergy")}
            color="#ef4444"
          />
        </div>
      </div>
    </div>
  );
}
