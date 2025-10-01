import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CorrelationHeatmap } from "@/components/correlation-section/correlation-heatmap";
import { CorrelationScatter } from "@/components/correlation-section/correlation-scatter";

interface CorrelationResponse {
  spearman: {
    matrix: Record<string, Record<string, number>>;
    insight: {
      highest_positive: { pair: string[]; value: number };
      highest_negative: { pair: string[]; value: number };
    };
  };
  pearson: {
    matrix: Record<string, Record<string, number>>;
    insight: {
      highest_positive: { pair: string[]; value: number };
      highest_negative: { pair: string[]; value: number };
    };
  };
}

export function CorrelationSection() {
  const [correlation, setCorrelation] = useState<CorrelationResponse | null>(
    null
  );

  const fetchCorrelation = async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:5000/bi-apps/api/var_correlation"
      );
      const data = await res.json();
      setCorrelation(data);
    } catch (err) {
      console.error("Error fetching correlation:", err);
    }
  };

  useEffect(() => {
    fetchCorrelation();
  }, []);

  if (!correlation) {
    return <div className="text-gray-500">Loading correlation data...</div>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {(["spearman", "pearson"] as const).map((method) => (
        <Card key={method} className="flex-1">
          <CardHeader>
            <CardTitle>{method.toUpperCase()} Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            <CorrelationHeatmap
              matrix={correlation[method].matrix}
              title={method.toUpperCase()}
            />
            <CorrelationScatter
              pair={correlation[method].insight.highest_positive.pair}
              title={`Highest Positive Correlation (${correlation[method].insight.highest_positive.value.toFixed(2)})`}
            />
            <CorrelationScatter
              pair={correlation[method].insight.highest_negative.pair}
              title={`Highest Negative Correlation (${correlation[method].insight.highest_negative.value.toFixed(2)})`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
