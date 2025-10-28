import type { EnergyData } from ".";

interface EnergyTableProps {
  selectedYear: string;
  data: EnergyData[];
}

export function EnergyTable({ selectedYear, data }: EnergyTableProps) {
  const filtered = data.filter((row) => row.year === selectedYear);

  return (
    <div className="bg-gray-50 border-2 rounded-2xl p-4">
      {/* <h3 className="text-base font-semibold mb-3">Energy Usage - {selectedYear}</h3> */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-white border-b">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Date</th>
              <th className="px-3 py-2 text-right font-medium">Diesel</th>
              <th className="px-3 py-2 text-right font-medium">Electricity</th>
              <th className="px-3 py-2 text-right font-medium">Natural Gas</th>
              <th className="px-3 py-2 text-right font-medium">Index Energy</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className={`border-b ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="px-3 py-1">
                  {new Date(`${row.year}-${row.month}-01`).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="px-3 py-1 text-right">{row.values.dieselValue?.toFixed(2) ?? "-"}</td>
                <td className="px-3 py-1 text-right">{row.values.electricity?.toFixed(2) ?? "-"}</td>
                <td className="px-3 py-1 text-right">{row.values.naturalGas?.toFixed(2) ?? "-"}</td>
                <td className="px-3 py-1 text-right font-semibold text-blue-700">
                  {row.values.indexEnergy?.toFixed(2) ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
