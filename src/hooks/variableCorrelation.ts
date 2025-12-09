import { useEffect, useState } from "react";

export interface CorrelationData {
  correlation: {
    pearson: {
      matrix: Record<string, Record<string, number>>;
      highest_positive: { pair: string[]; value: number };
      highest_negative: { pair: string[]; value: number };
    };
    spearman: {
      matrix: Record<string, Record<string, number>>;
      highest_positive: { pair: string[]; value: number };
      highest_negative: { pair: string[]; value: number };
    };
  };
  regression: any;
  vif: any;
}

export function useVariableCorrelation() {
  const [data, setData] = useState<CorrelationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:5000/bi-apps/api/var_correlation");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        console.log("[useVariableCorrelation] Data:", json);
        setData(json);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[useVariableCorrelation] Error:", message);
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
