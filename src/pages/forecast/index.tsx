import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterBar from "@/components/filter-bar";
import { ForecastChart } from "@/pages/forecast/components/forecast-chart";
import { WarningBanner } from "@/pages/forecast/components/warning-banner";
import { ModelSummary } from "@/pages/forecast/components/model-summary";
import { StatsSummary } from "@/pages/forecast/components/stats-summary";
import { ForecastTable } from "@/pages/forecast/components/forecast-table";
import { CompareTable } from "@/pages/forecast/components/compare-table";
import { DeviationsCard } from "@/pages/forecast/components/deviation-card";

interface ForecastRow {
  date: string;
  forecastValue: number | null;
  upperValue: number | null;
  lowerValue: number | null;
}

interface ActualRow {
  date: string;
  value: number;
}

export function ForecastPage() {
  const [model, setModel] = useState("prophet");
  const [category, setCategory] = useState("indexEnergy");
  const [year, setYear] = useState("2025");

  const [pendingModel, setPendingModel] = useState("prophet");
  const [pendingCategory, setPendingCategory] = useState("indexEnergy");
  const [pendingYear, setPendingYear] = useState("2025");

  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [forecastData, setForecastData] = useState<ForecastRow[]>([]);
  const [actualData, setActualData] = useState<ActualRow[]>([]);
  const [forecastWarning, setForecastWarning] = useState("");
  const [evaluation, setEvaluation] = useState<{
    mae: number;
    rmse: number;
    mape: number;
  } | null>(null);

  // fetch forecast dari API Flask
  const fetchForecast = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/bi-apps/api/forecast?model=${model}&category=${category}&year=${year}`
      );
      const data = await res.json();

      if (!data.forecast || data.forecast.length < 6) {
        setForecastWarning(
          "⚠️ Model tidak bisa membaca Forecast. Terlalu sedikit data observasi untuk memperkirakan parameter musiman."
        );
        setForecastData([]);
        return;
      } else {
        setForecastWarning("");
      }

      const mapped: ForecastRow[] = data.forecast.map((item: any) => ({
        date: item.ds.slice(0, 7),
        forecastValue: item.yhat !== null ? Number(item.yhat) : null,
        upperValue: item.yhat_upper !== null ? Number(item.yhat_upper) : null,
        lowerValue: item.yhat_lower !== null ? Number(item.yhat_lower) : null,
      }));
      setForecastData(mapped);
    } catch (err) {
      console.error("Error fetching forecast:", err);
      setForecastWarning(
        "⚠️ Model tidak bisa membaca Forecast. Terlalu sedikit data observasi untuk memperkirakan parameter musiman."
      );
      setForecastData([]);
    }
  };

  // fetch actual data
  const fetchRawData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/bi-apps/api/clean_data?extend=true`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        const years = [
          ...new Set(data.map((item: any) => String(item.year))),
        ].sort();
        setAvailableYears(years);

        const filtered = data.filter((item: any) => String(item.year) === year);

        const mapped: ActualRow[] = filtered
          .map((item: any) => ({
            date: `${item.year}-${item.month.padStart(2, "0")}`,
            value:
              item.values && typeof item.values[category] === "number"
                ? Number(item.values[category].toFixed(2))
                : 0,
          }))
          .filter((row) => row.value > 0);

        setActualData(mapped);
      } else {
        console.warn("Unexpected clean_data payload:", data);
        setActualData([]);
      }
    } catch (err) {
      console.error("Error fetching actual data:", err);
      setActualData([]);
    }
  };

  // fetch evaluation data
  const fetchEvaluation = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/bi-apps/api/evaluation?model=${model}&category=${category}`
      );
      const data = await res.json();
      if (data.evaluation && !data.error) {
        setEvaluation({
          mae: data.evaluation.MAE,
          rmse: data.evaluation.RMSE,
          mape: data.evaluation.MAPE,
        });
      } else {
        setEvaluation(null);
      }
    } catch (err) {
      console.error("Error fetching evaluation:", err);
      setEvaluation(null);
    }
  };

  useEffect(() => {
    fetchRawData();
  }, []);

  useEffect(() => {
    fetchForecast();
    fetchEvaluation();
    fetchRawData();
  }, [model, category, year]);

  // util untuk statistik
  function getStats(data: number[]) {
    const cleanData = data.filter((v) => v > 0);
    if (cleanData.length === 0) return { min: 0, max: 0, avg: 0 };

    const min = Math.min(...cleanData);
    const max = Math.max(...cleanData);
    const avg = cleanData.reduce((a, b) => a + b, 0) / cleanData.length;

    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
    };
  }

  const actualValues = actualData.map((d) => d.value);
  const forecastValues = forecastData.map((d) => d.forecastValue ?? 0);
  const actualStats = getStats(actualValues);
  const forecastStats = getStats(forecastValues);

  let diffPercent = null;
  if (Number(actualStats.avg) > 0) {
    diffPercent =
      ((Number(forecastStats.avg) - Number(actualStats.avg)) /
        Number(actualStats.avg)) *
      100;
  }

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-wrap gap-2">
        {/* Chart Section */}
        <div className="w-full bg-gray-200 border-2 rounded-lg p-2 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Forecast vs Actual (GJ/Kl)</h3>

            {/* Tabs Model */}
            <Tabs value={pendingModel} onValueChange={setPendingModel}>
              <TabsList className="rounded-md border-2 p-0.5 shadow-sm gap-1">
                <TabsTrigger value="prophet">Prophet</TabsTrigger>
                <TabsTrigger value="sarimax">Sarimax</TabsTrigger>
                <TabsTrigger value="linear">Linear</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* FilterBar */}
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
          <WarningBanner message={forecastWarning} />

          {/* Chart */}
          <ForecastChart forecastData={forecastData} actualData={actualData} />
        </div>

        {/* Model & Stats Summary */}
        <div className="flex flex-wrap gap-2 w-full mt-2">
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
