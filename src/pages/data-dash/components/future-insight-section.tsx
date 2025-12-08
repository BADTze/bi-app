import ForecastCompareChart from "./forecast-compare";
import ForecastFGChart from "./forecast-fg";
import { CapacityPlanningCard } from "./future-insight-components/capacity-planning-card";
import { ScenarioSimulationCard } from "./future-insight-components/cost-projection-card";
import { KPIOutlook } from "./future-insight-components/kpi-outlook-card";
import { CostProjectionCard } from "./future-insight-components/scenario-simulation-card";
import { SummaryCard } from "./future-insight-components/summary-card";

export function FutureInsightSection() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full p-4 bg-gray-200 rounded-2xl">
      {/* ----- LEFT COLUMN ----- */}
      <div className="flex flex-col gap-4">
        <ForecastCompareChart year={2026} defaultCategory="indexEnergy" />
        <ForecastFGChart year={2026} />
      </div>

      {/* ----- RIGHT COLUMN ----- */}
      <div className="col-span-1 grid grid-rows-2 gap-4">
        <KPIOutlook />
        <SummaryCard />
        <CapacityPlanningCard />
        <CostProjectionCard />
        <ScenarioSimulationCard />
      </div>
    </div>
  );
}
