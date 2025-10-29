import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModelSummaryProps {
  evaluation: { mae: number; rmse: number; mape: number } | null;
}

export function ModelSummary({ evaluation }: ModelSummaryProps) {
  return (
    <Card className="flex-1 bg-gray-100">
      <CardHeader>
        <CardTitle>Model Evaluation</CardTitle>
      </CardHeader>
      <CardContent>
        {evaluation ? (
          <div className="grid grid-cols-[1fr_2fr] gap-y-2">
            <div className="font-medium">MAE:</div>
            <div>{evaluation.mae}</div>
            <div className="font-medium">RMSE:</div>
            <div>{evaluation.rmse}</div>
            <div className="font-medium">MAPE:</div>
            <div>{evaluation.mape}</div>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            No evaluation data available.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
