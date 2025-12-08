import type { FutureInsight } from "@/utils/type";
import { useEffect, useState } from "react";

export function useFutureInsight() {
  const [data, setData] = useState<FutureInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/bi-apps/api/future_insight")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch future insight");
        const json: FutureInsight = await res.json();
        setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
