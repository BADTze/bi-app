import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterBar from "@/components/filter-bar";
import { ForecastChart } from "@/pages/forecast/components/forecast-chart";
import { WarningBanner } from "@/pages/forecast/components/warning-banner";
import { ModelSummary } from "@/pages/forecast/components/model-summary";
import { StatsSummary } from "@/pages/forecast/components/stats-summary";
import { ForecastTable } from "@/pages/forecast/components/forecast-table";
import { CompareTable } from "@/pages/forecast/components/compare-table";
import { DeviationsCard } from "@/pages/forecast/components/deviation-card";

import { useForecast } from "@/hooks/forecastData";
import { useActualData } from "@/hooks/actualData";
import { useEvaluation } from "@/hooks/modelEvaluation";

export function ForecastPage() {
  const [model, setModel] = useState("prophet");
  const [category, setCategory] = useState("indexEnergy");
  const [year, setYear] = useState("2025");

  const [pendingModel, setPendingModel] = useState("prophet");
  const [pendingCategory, setPendingCategory] = useState("indexEnergy");
  const [pendingYear, setPendingYear] = useState("2025");

  const { forecastData, warning } = useForecast(model, category, year);
  const { actualData, availableYears } = useActualData(category, year);
  const { evaluation } = useEvaluation(model, category);

  // utility stats
  const getStats = (arr: number[]) => {
    const clean = arr.filter((v) => v > 0);
    if (!clean.length) return { min: 0, max: 0, avg: 0 };

    const sum = clean.reduce((a, b) => a + b, 0);
    const avg = sum / clean.length;

    return {
      min: Math.min(...clean),
      max: Math.max(...clean),
      avg: Number(avg.toFixed(2)),
    };
  };

  const actualStats = getStats(actualData.map((d) => d.value));
  const forecastStats = getStats(
    forecastData.map((d) => d.forecastValue ?? 0)
  );

  const diffPercent =
    actualStats.avg > 0
      ? ((forecastStats.avg - actualStats.avg) / actualStats.avg) * 100
      : null;

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-wrap gap-2">
        {/* Chart Section */}
        <div className="w-full border bg-gray-200 rounded-lg p-2 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Forecast vs Actual</h3>

            {/* Tabs Model */}
            <Tabs value={pendingModel} onValueChange={setPendingModel}>
              <TabsList className="rounded-md border-2 p-0.5 gap-1">
                <TabsTrigger value="prophet">Prophet</TabsTrigger>
                <TabsTrigger value="sarimax">Sarimax</TabsTrigger>
                <TabsTrigger value="linear">Linear</TabsTrigger>
              </TabsList>
            </Tabs>

            <FilterBar
              category={pendingCategory}
              setCategory={setPendingCategory}
              year={pendingYear}
              setYear={setPendingYear}
              years={availableYears}
              onSubmit={() => {
                setModel(pendingModel);
                setCategory(pendingCategory);
                setYear(pendingYear);
              }}
            />
          </div>

          {/* Warning */}
          <WarningBanner message={warning} />

          {/* Chart */}
          <div className="bg-white rounded-lg">
            <ForecastChart forecastData={forecastData} actualData={actualData} />
          </div>
        </div>

        {/* Summaries */}
        <div className="flex flex-wrap gap-3 w-full mt-2">
          <ModelSummary evaluation={evaluation} />
          <StatsSummary
            actualStats={actualStats}
            forecastStats={forecastStats}
            diffPercent={diffPercent}
          />
          <DeviationsCard
            forecastData={forecastData}
            actualData={actualData}
            topN={3}
          />
        </div>

        {/* Tables */}
        <div className="flex flex-wrap gap-4 w-full mt-2">
          <ForecastTable forecastData={forecastData} />
          <CompareTable forecastData={forecastData} actualData={actualData} />
        </div>
      </div>
    </div>
  );
}
