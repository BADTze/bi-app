import { useState } from "react";
import { LineTrendChart } from "@/components/line-charts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCostData } from "@/hooks/costData";

export function CostSection() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const availableYears = [currentYear - 2, currentYear - 1, currentYear];
  const { data, loading, error } = useCostData(year);

  // Helper for date label
  const formatDateForChart = (date: string) => {
    const [month, year] = date.split("-");
    return {
      month,
      year,
      label: `${month}-${year}`,
    };
  };

  // Electricity
  const electricityData = data?.electricity || [];
  const totalCostElectricity = electricityData.reduce(
    (a, b) => a + b.total_cost,
    0
  );
  const totalElectricity = electricityData.reduce(
    (a, b) => a + b.total_electricity,
    0
  );
  const avgPriceElectricity =
    totalElectricity > 0 ? totalCostElectricity / totalElectricity : 0;

  const electricityChartData = electricityData.map((d) => ({
    ...formatDateForChart(d.date),
    value: d.total_electricity,
  }));
  const priceChartData = electricityData.map((d) => ({
    ...formatDateForChart(d.date),
    value: d.price_per_kwh,
  }));

  // Natural Gas
  const gasData = data?.naturalGas || [];
  const totalCostGas = gasData.reduce((a, b) => a + b.total_cost, 0);
  const totalGas = gasData.reduce((a, b) => a + b.total_gas, 0);
  const avgPriceGas = totalGas > 0 ? totalCostGas / totalGas : 0;

  const gasChartData = gasData.map((d) => ({
    ...formatDateForChart(d.date),
    value: d.total_gas,
  }));
  const priceGasChartData = gasData.map((d) => ({
    ...formatDateForChart(d.date),
    value: d.price_per_mmbtu,
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

      {!loading &&
        !error &&
        (electricityData.length > 0 || gasData.length > 0) && (
          <>
            {/* Summary Cards (Combined) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
              {/* Total Cost */}
              <div className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col gap-2">
                <h3 className="font-semibold mb-1">Total Cost</h3>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Electricity</span>
                  <span className="text-lg font-bold text-blue-700">
                    {totalCostElectricity.toLocaleString("id-ID")} IDR
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Natural Gas
                  </span>
                  <span className="text-lg font-bold text-blue-700">
                    {totalCostGas.toLocaleString("id-ID")} IDR
                  </span>
                </div>
              </div>
              {/* Total Usage */}
              <div className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col gap-2">
                <h3 className="font-semibold mb-1">Total Usage</h3>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Electricity</span>
                  <span className="text-lg font-bold text-green-700">
                    {totalElectricity.toLocaleString("id-ID")} kWh
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Natural Gas
                  </span>
                  <span className="text-lg font-bold text-green-700">
                    {totalGas.toLocaleString("id-ID")} MMBTU
                  </span>
                </div>
              </div>
              {/* Average Price */}
              <div className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col gap-2">
                <h3 className="font-semibold mb-1">Average Price</h3>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500">Electricity</span>
                  <span className="text-lg font-bold text-red-700">
                    {avgPriceElectricity.toFixed(2)} IDR/kWh
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Natural Gas
                  </span>
                  <span className="text-lg font-bold text-red-700">
                    {avgPriceGas.toFixed(2)} IDR/MMBTU
                  </span>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="flex flex-wrap gap-4 w-full mt-2">
              <div className="bg-white p-3 rounded-xl border shadow flex-1 min-w-[300px]">
                <h3 className="font-semibold mb-2">Total Electricity</h3>
                <div className="h-[220px]">
                  <LineTrendChart
                    title="Total Electricity (kWh)"
                    data={electricityChartData}
                    color="#1e3a8a"
                    unit="kWh"
                  />
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border shadow flex-1 min-w-[300px]">
                <h3 className="font-semibold mb-2">Price per kWh</h3>
                <div className="h-[220px]">
                  <LineTrendChart
                    title="Price per kWh (IDR)"
                    data={priceChartData}
                    color="#ef4444"
                    unit="IDR/kWh"
                  />
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border shadow flex-1 min-w-[300px]">
                <h3 className="font-semibold mb-2">Total Gas</h3>
                <div className="h-[220px]">
                  <LineTrendChart
                    title="Total Gas (MMBTU)"
                    data={gasChartData}
                    color="#059669"
                    unit="MMBTU"
                  />
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border shadow flex-1 min-w-[300px]">
                <h3 className="font-semibold mb-2">Price per MMBTU</h3>
                <div className="h-[220px]">
                  <LineTrendChart
                    title="Price per MMBTU (IDR)"
                    data={priceGasChartData}
                    color="#f59e42"
                    unit="IDR/MMBTU"
                  />
                </div>
              </div>
            </div>

            {/* Tables Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {/* Table Electricity */}
              <div className="bg-white p-3 rounded-xl border shadow overflow-auto">
                <h3 className="font-semibold mb-2">
                  Electricity Billing Table
                </h3>
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
                    {electricityData.map((row, i) => (
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
              {/* Table Gas */}
              <div className="bg-white p-3 rounded-xl border shadow overflow-auto">
                <h3 className="font-semibold mb-2">
                  Natural Gas Billing Table
                </h3>
                <table className="min-w-full text-sm text-left border rounded-lg">
                  <thead className="bg-gray-200 font-semibold">
                    <tr>
                      <th className="p-2">Tanggal</th>
                      <th className="p-2">Total Gas (MMBTU)</th>
                      <th className="p-2">Total Cost (IDR)</th>
                      <th className="p-2">Harga per MMBTU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gasData.map((row, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="p-2">{row.date}</td>
                        <td className="p-2">
                          {row.total_gas.toLocaleString("id-ID")}
                        </td>
                        <td className="p-2">
                          {row.total_cost.toLocaleString("id-ID")}
                        </td>
                        <td className="p-2">
                          {row.price_per_mmbtu.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
