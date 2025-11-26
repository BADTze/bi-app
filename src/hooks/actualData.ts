import { useEffect, useState } from "react";

export interface ActualRow {
  date: string;
  value: number;
}

export function useActualData(category: string, year: string) {
  const [actualData, setActualData] = useState<ActualRow[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchRawData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/bi-apps/api/clean_data?extend=true`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.warn("Unexpected payload:", data);
          setActualData([]);
          return;
        }

        // extract available years
        const years = [...new Set(data.map((item: any) => String(item.year)))].sort();
        setAvailableYears(years);

        // filter based on selected year
        const filtered = data.filter((item: any) => String(item.year) === year);


        const mapped: ActualRow[] = filtered
          .map((item: any) => ({
            date: `${item.year}-${item.month.padStart(2, "0")}`,
            value: Number(Number(item.values?.[category] ?? 0).toFixed(2)),
          }))
          .filter((row) => row.value > 0);

        setActualData(mapped);
      } catch (err) {
        console.error("Error fetching actual data:", err);
        setActualData([]);
      }
    };

    fetchRawData();
  }, [category, year]);

  return { actualData, availableYears };
}
