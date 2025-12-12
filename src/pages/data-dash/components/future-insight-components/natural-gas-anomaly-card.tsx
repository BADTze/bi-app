import { CapacityPlanning } from "@/utils/type";
import { AlertCircle, AlertTriangle } from "lucide-react";

interface NaturalGasAnomalyCardProps {
  capacityPlanning: CapacityPlanning;
}

export function NaturalGasAnomalyCard({ capacityPlanning }: NaturalGasAnomalyCardProps) {
  const anomalies = capacityPlanning.natural_gas_anomalies || [];

  if (anomalies.length === 0) {
    return (
      <div className="border rounded-lg p-4 bg-green-50 border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-green-900">Natural Gas Status</h3>
        </div>
        <p className="text-sm text-green-700">
          All forecasted natural gas values are within operational bounds (7054-9170 MMBTU)
        </p>
      </div>
    );
  }

  const belowMin = anomalies.filter((a) => a.type === "below_minimum");
  const aboveMax = anomalies.filter((a) => a.type === "above_maximum");

  return (
    <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
        <h3 className="font-semibold text-amber-900">Natural Gas Anomalies</h3>
      </div>

      <div className="space-y-2 text-sm">
        {belowMin.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded p-2">
            <p className="font-medium text-red-700 mb-1">Below Minimum (7054 MMBTU):</p>
            <ul className="list-disc list-inside text-red-600 space-y-1">
              {belowMin.map((a, i) => (
                <li key={i}>
                  {a.month}: {a.value} MMBTU
                </li>
              ))}
            </ul>
          </div>
        )}

        {aboveMax.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded p-2">
            <p className="font-medium text-orange-700 mb-1">Exceeds Maximum (9170 MMBTU):</p>
            <ul className="list-disc list-inside text-orange-600 space-y-1">
              {aboveMax.map((a, i) => (
                <li key={i}>
                  {a.month}: {a.value} MMBTU
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-amber-200 text-xs text-amber-700">
        <p>⚠️ Please review forecasted values and adjust operational plans accordingly.</p>
      </div>
    </div>
  );
}
