// --- Hook: useForecastCompare ---
import { useEffect, useState } from "react";

export interface ForecastCompareItem {
  date: string;
  linear: number;
  prophet: number;
  sarimax: number;
}

export interface ForecastCompareResponse {
  year: number;
  category: string;
  value: ForecastCompareItem[];
}

export function useForecastCompare(year: number) {
  const [data, setData] = useState<ForecastCompareItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/bi-apps/api/forecast_compare?year=${year}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch forecast compare data");
        const json: ForecastCompareResponse = await res.json();
        setData(json.value);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [year]);

  return { data, loading, error };
}
