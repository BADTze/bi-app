import { useEffect, useState } from "react";

export interface ForecastFGItem {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
}

export interface ForecastFGResponse {
  year: number | null;
  data: ForecastFGItem[];
}

interface UseForecastFGOptions {
  year?: number;
}

export function useForecastFG(options: UseForecastFGOptions = {}) {
  const [data, setData] = useState<ForecastFGItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (options.year) params.append("year", String(options.year));
    const url = params.toString()
      ? `/bi-apps/api/forecast_fg?${params.toString()}`
      : `/bi-apps/api/forecast_fg`;
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch forecast FG");
        const json: ForecastFGResponse = await res.json();
        setData(json.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [options.year]);

  return { data, loading, error };
}
