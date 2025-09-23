import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CorrelationHeatmap from "@/components/correlation-section/correlation-heatmap";
import CorrelationInsights from "@/components/correlation-section/correlation-insight";

interface CorrelationResult {
  spearman: {
    matrix: Record<string, Record<string, number>>;
    insight: {
      highest_positive: { pair: string[]; value: number } | null;
      highest_negative: { pair: string[]; value: number } | null;
    };
  };
  pearson: {
    matrix: Record<string, Record<string, number>>;
    insight: {
      highest_positive: { pair: string[]; value: number } | null;
      highest_negative: { pair: string[]; value: number } | null;
    };
  };
}

const CorrelationSection: React.FC = () => {
  const [data, setData] = useState<CorrelationResult | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/bi-apps/api/var_correlation")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching correlation:", err));
  }, []);

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <Card className="min-full">
      <CardHeader>
        <CardTitle>Variable Correlation (Pearson)</CardTitle>
      </CardHeader>
      <CardContent>
        <CorrelationInsights
          highestPositive={data.pearson.insight.highest_positive}
          highestNegative={data.pearson.insight.highest_negative}
        />
        <div className="mt-4">
          <CorrelationHeatmap matrix={data.pearson.matrix} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationSection;
