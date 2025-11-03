import { useEffect, useState } from "react";
import { LineTrendChart } from "@/components/line-charts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BillingData {
  date: string;         
  total_cost: number;   
  total_electricity: number;  
  price_per_kwh: number; 
}

export function BillingSection() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [data, setData] = useState<BillingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Available years for selection (current year and 2 years back)
  const availableYears = [currentYear - 2, currentYear - 1, currentYear];
  useEffect(() => {
    const fetchBilling = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/bi-apps/api/billing?year=${year}`
        );
        const json = await res.json();
        if (res.ok && Array.isArray(json)) {
          setData(json);
        } else {
          setData([]);
          setError(json.message || "No billing data found.");
        }
      } catch (err) {
        setError("Failed to fetch billing data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBilling();
  }, [year]);

  const totalCost = data.reduce((a, b) => a + b.total_cost, 0);
  const totalElectricity = data.reduce((a, b) => a + b.total_electricity, 0);
  const avgPrice = totalElectricity > 0 ? totalCost / totalElectricity : 0;

  // Format date dari dd-mm-yyyy ke mm-yyyy untuk chart
  const formatDateForChart = (date: string) => {
    const [_, month, year] = date.split("-"); // Mengabaikan day dengan _
    return {
      month,
      year,
      label: `${month}-${year}`
    };
  };

  // Prepare data for charts
  const electricityData = data.map((d) => ({
    ...formatDateForChart(d.date),
    value: d.total_electricity
  }));

  const priceData = data.map((d) => ({
    ...formatDateForChart(d.date),
    value: d.price_per_kwh
  }));

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-gray-200 rounded-2xl border-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Billing Overview ({year})</h2>
        <Select
          value={year.toString()}
          onValueChange={(value) => setYear(Number(value))}
        >
          <SelectTrigger className="w-[180px] bg-white shadow-sm">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-center text-gray-600">Loading data...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && data.length > 0 && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
            <div className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold">Total Cost</h3>
              <p className="text-lg font-bold text-blue-700">
                {totalCost.toLocaleString("id-ID")} IDR
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold">Total Electricity</h3>
              <p className="text-lg font-bold text-green-700">
                {totalElectricity.toLocaleString("id-ID")} kWh
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold">Average Price</h3>
              <p className="text-lg font-bold text-red-700">
                {avgPrice.toFixed(2)} IDR/kWh
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex flex-wrap gap-4 w-full">
            <div className="bg-white p-3 rounded-xl border shadow flex-1 min-w-[300px]">
              <h3 className="font-semibold mb-2">Total Electricity</h3>
              <div className="h-[280px]">
                <LineTrendChart
                  title="Total Electricity (kWh)"
                  data={electricityData}
                  color="#1e3a8a"
                  unit="kWh"
                />
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border shadow flex-1 min-w-[300px]">
              <h3 className="font-semibold mb-2">Price per kWh</h3>
              <div className="h-[280px]">
                <LineTrendChart
                  title="Price per kWh (IDR)"
                  data={priceData}
                  color="#ef4444"
                  unit="IDR/kWh"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-3 rounded-xl border shadow overflow-auto">
            <table className="min-w-full text-sm text-left border rounded-lg">
              <thead className="bg-gray-200 font-semibold">
                <tr>
                  <th className="p-2">Tanggal</th>
                  <th className="p-2">Total Listrik (kWh)</th>
                  <th className="p-2">Total Cost (IDR)</th>
                  <th className="p-2">Harga per kWh</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2">{row.date}</td>
                    <td className="p-2">
                      {row.total_electricity.toLocaleString("id-ID")}
                    </td>
                    <td className="p-2">
                      {row.total_cost.toLocaleString("id-ID")}
                    </td>
                    <td className="p-2">
                      {row.price_per_kwh.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
