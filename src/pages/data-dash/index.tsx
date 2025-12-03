import ForecastCompareChart from "./components/forecast-compare";
import ForecastFGChart from "./components/forecast-fg";

export function DataDash() {
  return (
    <div className="p-4 space-y-6">
      <ForecastCompareChart year={2026} />
      <ForecastFGChart year={2026} />
    </div>
  );
}
