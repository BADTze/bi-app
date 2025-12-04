import ForecastCompareChart from "./forecast-compare";
import ForecastFGChart from "./forecast-fg";
import { CapacityPlanningCard } from "./future-insight-components/capacity-plan-card";
import { KPIOutlook } from "./future-insight-components/kpi-outlook-card";
import { PeakForecastEnergyIndex } from "./future-insight-components/peak-forecast-card";

export function FutureInsightSection() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full p-4 bg-gray-200">
      {/* ----- LEFT COLUMN ----- */}
      <div className="col-span-2 flex flex-col gap-4">
        <ForecastCompareChart year={2026} />
        <ForecastFGChart year={2026} />
      </div>

      {/* ----- RIGHT COLUMN ----- */}
      <div className="col-span-1 grid grid-rows-2 gap-4">
        {/* ROW 1 - Peak + KPI */}
        <div className="grid grid-cols-2 gap-4">
          <PeakForecastEnergyIndex />
          <KPIOutlook />
        </div>

        {/* ROW 2 - Capacity Planning */}
        <CapacityPlanningCard />
      </div>
    </div>
  );
}
