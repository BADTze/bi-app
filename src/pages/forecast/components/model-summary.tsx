import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModelSummaryProps {
  evaluation: { mae: number; rmse: number; mape: number } | null;
}

export function ModelSummary({ evaluation }: ModelSummaryProps) {
  return (
    <Card className="flex-1 bg-gray-200 rounded-lg overflow-hidden gap-2 py-4">
      <CardHeader >
        <CardTitle>Model Evaluation</CardTitle>
      </CardHeader>
      <CardContent className="h-full px-4">
        <div className="bg-white p-2 rounded-lg h-full">
          {evaluation ? (
            <div className="h-full flex items-center justify-between">
              <div className="w-full grid grid-cols-[1fr_2fr] gap-y-2">
                <div className="font-medium">MAE:</div>
                <div>{evaluation.mae}</div>
                <div className="font-medium">RMSE:</div>
                <div>{evaluation.rmse}</div>
                <div className="font-medium">MAPE:</div>
                <div>{evaluation.mape}</div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">
              No evaluation data available.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
