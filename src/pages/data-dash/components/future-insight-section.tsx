import ForecastCompareChart from "./forecast-compare";
import ForecastFGChart from "./forecast-fg";
import { CostProjectionCard } from "./future-insight-components/cost-projection-card";
import { KPIOutlook } from "./future-insight-components/kpi-outlook-card";
import { PeakForecastIndexCard } from "./future-insight-components/peak-index-card";
import { NaturalGasAnomalyCard } from "./future-insight-components/natural-gas-anomaly-card";
import { useFutureInsight } from "@/hooks/insightEngine";

export function FutureInsightSection() {
  const { data: insight } = useFutureInsight();
  
  return (
    <div className="grid grid-cols-2 gap-4 w-full p-4 bg-gray-200 rounded-2xl">
      {/* ----- LEFT COLUMN ----- */}
      <div className="flex flex-col gap-4">
        <ForecastCompareChart year={2026} defaultCategory="indexEnergy" />
        <ForecastFGChart year={2026} />
        {insight && <NaturalGasAnomalyCard capacityPlanning={insight.capacity_planning} />}
      </div>

      {/* ----- RIGHT COLUMN ----- */}
      <div className="gap-2">
        <div className="flex gap-4 max-h-56 mb-4">
          <div className="flex-shrink-0">
            <KPIOutlook />
          </div>
          <div className="flex-1">
            <PeakForecastIndexCard />
          </div>
        </div>
        <CostProjectionCard />
      </div>
    </div>
  );
}
