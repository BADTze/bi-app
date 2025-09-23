import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Insight {
  pair: string[];
  value: number;
}

interface CorrelationInsightsProps {
  highestPositive: Insight | null;
  highestNegative: Insight | null;
}

const CorrelationInsights: React.FC<CorrelationInsightsProps> = ({ highestPositive, highestNegative }) => {
  return (
    <div className="flex gap-2 w-full">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Strongest Positive</CardTitle>
        </CardHeader>
        <CardContent>
          {highestPositive ? (
            <p>
              {highestPositive.pair.join(" ↔ ")} (
              <span className="text-green-600 font-semibold">
                +{highestPositive.value.toFixed(3)}
              </span>
              )
            </p>
          ) : (
            <p className="text-gray-500">No data</p>
          )}
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Strongest Negative</CardTitle>
        </CardHeader>
        <CardContent>
          {highestNegative ? (
            <p>
              {highestNegative.pair.join(" ↔ ")} (
              <span className="text-red-600 font-semibold">
                {highestNegative.value.toFixed(3)}
              </span>
              )
            </p>
          ) : (
            <p className="text-gray-500">No data</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CorrelationInsights;
