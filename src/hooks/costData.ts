import { useEffect, useState } from "react";

export interface ElectricityBilling {
  date: string;
  total_electricity: number;
  total_cost: number;
  price_per_kwh: number;
}

export interface NaturalGasBilling {
  date: string;
  total_gas: number;
  total_cost: number;
  price_per_mmbtu: number;
}

export interface CostDataResponse {
  electricity: ElectricityBilling[];
  naturalGas: NaturalGasBilling[];
}

export function useCostData(year: number) {
  const [data, setData] = useState<CostDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/bi-apps/api/billing?year=${year}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch cost data");
        const json: CostDataResponse = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [year]);

  return { data, loading, error };
}
