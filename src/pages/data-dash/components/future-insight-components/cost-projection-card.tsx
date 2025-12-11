import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFutureInsight } from "@/hooks/insightEngine";

// Format currency dengan locale Indonesia
const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format angka dengan titik koma
const formatNumber = (value: number | undefined, decimals: number = 2): string => {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export function CostProjectionCard() {
  const { data, loading, error } = useFutureInsight();

  if (loading)
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  if (error || !data)
    return (
      <Card>
        <CardContent>Error loading data</CardContent>
      </Card>
    );

  const cost = data.cost_projection;

  return (
    <Card className="p-4 shadow-md gap-0">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-bold text-gray-900">
          Cost Projection
        </CardTitle>
        <p className="text-sm font-normal text-gray-500">(Annual Estimate)</p>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        {/* Total Energy */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total Electricity</p>
            <p className="text-lg font-bold">
              {formatNumber(cost.total_electricity_kwh, 0)} kWh
            </p>
          </div>
          <div>
            <p className="text-gray-600">Total Natural Gas</p>
            <p className="text-lg font-bold">
              {formatNumber(cost.total_natural_gas_mmbtu, 2)} MMBTU
            </p>
          </div>
        </div>

        {/* Average Prices */}
        <div className="grid grid-cols-2 gap-4 text-sm border-t pt-3">
          <div>
            <p className="text-gray-600">Avg Price (Electricity)</p>
            <p className="font-semibold">
              ${formatNumber(cost.avg_price_per_kwh, 4)}/kWh
            </p>
          </div>
          <div>
            <p className="text-gray-600">Avg Price (Natural Gas)</p>
            <p className="font-semibold">
              ${formatNumber(cost.avg_price_per_mmbtu, 4)}/MMBTU
            </p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2 text-sm border-t pt-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Electricity Cost:</span>
            <span className="font-bold">
              {formatCurrency(cost.electricity_cost_est)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Natural Gas Cost:</span>
            <span className="font-bold">
              {formatCurrency(cost.natural_gas_cost_est)}
            </span>
          </div>
        </div>

        {/* Total Cost */}
        <div className="border-t pt-3 bg-blue-50 p-2 rounded">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">
              Total Estimated Cost:
            </span>
            <span className="text-xl font-bold text-blue-600">
              {formatCurrency(cost.total_cost_est)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
