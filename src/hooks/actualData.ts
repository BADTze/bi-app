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
        // Fetch all data tanpa filter untuk extract available years
        const resAll = await fetch(`http://127.0.0.1:5000/bi-apps/api/clean_data`);
        const dataAll = await resAll.json();

        console.log("[actualData] Fetched all data:", dataAll);

        // Parse available years from all data
        let allYears: string[] = [];
        let allDataArray: any[] = [];
        
        if (dataAll.data && Array.isArray(dataAll.data)) {
          allDataArray = dataAll.data;
          allYears = [...new Set(allDataArray.map((item: any) => String(item.year)))].sort() as string[];
        } else if (Array.isArray(dataAll)) {
          allDataArray = dataAll;
          allYears = [...new Set(allDataArray.map((item: any) => String(item.year)))].sort() as string[];
        }
        
        console.log("[actualData] Available years:", allYears);
        setAvailableYears(allYears);

        let url = `http://127.0.0.1:5000/bi-apps/api/clean_data`;
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (year) params.append("year", year);
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        console.log("[actualData] Fetching from:", url);
        const res = await fetch(url);
        const response = await res.json();
        console.log("[actualData] Response:", response);

        // Handle response format
        let data: any[] = [];
        if (response.data && Array.isArray(response.data)) {
          data = response.data;
        } else if (Array.isArray(response)) {
          data = response;
        }

        console.log("[actualData] Parsed data array:", data);

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("No data available:", data);
          setActualData([]);
          return;
        }

        // Map data
        let mapped: ActualRow[] = [];
        
        if (category) {
          // Single category mode - data has category column
          mapped = data
            .map((item: any) => {
              const value = item[category] ?? 0;
              return {
                date: `${item.year}-${String(item.month).padStart(2, "0")}`,
                value: Number(value),
              };
            })
            .filter((row) => row.value > 0);
        } else {
          // Multiple categories mode - data has values object
          mapped = data
            .map((item: any) => {
              const categoryValue = item.values?.[category] ?? 0;
              return {
                date: `${item.year}-${String(item.month).padStart(2, "0")}`,
                value: Number(categoryValue),
              };
            })
            .filter((row) => row.value > 0);
        }

        console.log("[actualData] Mapped data:", mapped);
        setActualData(mapped);
      } catch (err) {
        console.error("Error fetching actual data:", err);
        setActualData([]);
      }
    };

    if (category && year) {
      fetchRawData();
    }
  }, [category, year]);

  return { actualData, availableYears };
}
