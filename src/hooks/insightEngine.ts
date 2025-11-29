import { useEffect, useState } from "react";

export interface PeakMonth {
  month: string;
  index_energy: number;
}

export interface PeakMonthModel {
  prophet: PeakMonth[];
  sarimax: PeakMonth[];
  linear: PeakMonth[];
}

export interface PeakIndexEnergyModel {
  prophet: number;
  sarimax: number | null;
  linear: number | null;
}

export interface FutureInsightSummary {
  year: number;
  avg_index_energy: number;
  total_energy_yearly: number;
  peak_month: PeakMonthModel;
  peak_index_energy: PeakIndexEnergyModel;
  avg_productKl: number;
}

export interface FutureInsight {
  summary: FutureInsightSummary;
  kpi_outlook: {
    target: number;
    forecast: number;
    status: string;
    gap: number;
  };
  what_to_expect: string;
  what_to_prepare: string[];
  capacity_planning: {
    required_energy_next_year: number;
    required_buffer: number;
    recommended_capacity: number;
    peak_load_month: PeakMonthModel;
    peak_load_index: PeakIndexEnergyModel;
  };
  scenario_simulation: {
    product_plus_10: number;
    product_minus_5: number;
    achieve_KPI_target: number;
  };
}

export function useFutureInsight(model: string = "prophet") {
  const [data, setData] = useState<FutureInsight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (model) params.append("model", model);
    const url = params.toString()
      ? `/bi-apps/api/future_insight?${params.toString()}`
      : `/bi-apps/api/future_insight`;
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch future insight");
        const json: FutureInsight = await res.json();
        setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [model]);

  return { data, loading, error };
}
