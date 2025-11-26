import { useEffect, useState } from "react";

export interface ForecastRow {
  date: string;
  forecastValue: number | null;
  upperValue: number | null;
  lowerValue: number | null;
}

export function useForecast(model: string, category: string, year: string) {
  const [forecastData, setForecastData] = useState<ForecastRow[]>([]);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/bi-apps/api/forecast?model=${model}&category=${category}&year=${year}`
        );
        const data = await res.json();

        if (!data.forecast || data.forecast.length < 6) {
          setWarning(
            "Model tidak bisa membaca Forecast. Terlalu sedikit data observasi."
          );
          setForecastData([]);
          return;
        }

        setWarning("");

        const mapped: ForecastRow[] = data.forecast.map((item: any) => ({
          date: item.ds.slice(0, 7),
          forecastValue: item.yhat ?? null,
          upperValue: item.yhat_upper ?? null,
          lowerValue: item.yhat_lower ?? null,
        }));

        setForecastData(mapped);
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setWarning("Gagal mengambil forecast dari server.");
        setForecastData([]);
      }
    };

    fetchForecast();
  }, [model, category, year]);

  return { forecastData, warning };
}
