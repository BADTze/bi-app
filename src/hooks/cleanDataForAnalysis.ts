import { useEffect, useState } from "react";

export interface CleanDataItem {
  year: string;
  month: string;
  values: Record<string, number>;
}

export function useCleanDataForAnalysis() {
  const [data, setData] = useState<CleanDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/bi-apps/api/clean_data");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const response = await res.json();

        console.log("[useCleanDataForAnalysis] Response:", response);

        // Handle different response formats
        let parsedData: CleanDataItem[] = [];
        if (response.data && Array.isArray(response.data)) {
          // Format: { data: [...], year?: ... }
          parsedData = response.data;
        } else if (Array.isArray(response)) {
          // Format: direct array
          parsedData = response;
        }

        setData(parsedData);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[useCleanDataForAnalysis] Error:", message);
        setError(message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
