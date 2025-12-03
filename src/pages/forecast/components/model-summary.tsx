import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModelSummaryProps {
  evaluation: { mae: number; rmse: number; mape: number } | null;
}

export function ModelSummary({ evaluation }: ModelSummaryProps) {
  return (
    <Card className="flex-1 bg-gray-200 rounded-lg overflow-hidden gap-2 py-4">
      <CardHeader>
        <CardTitle>Model Evaluation</CardTitle>
      </CardHeader>
      <CardContent className="h-full px-4">
        <div className="bg-white rounded-lg h-full">
          {evaluation ? (
            <ul className="h-full list-none divide-y divide-gray-100">
              {(() => {
                // MAPE bisa string ("16.6%") atau number
                let mapeNum =
                  typeof evaluation.mape === "string"
                    ? parseFloat((evaluation.mape as string).replace("%", ""))
                    : typeof evaluation.mape === "number"
                    ? evaluation.mape
                    : 0;
                return (
                  <>
                    <li className="flex items-center justify-between px-3 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        MAE
                      </span>
                      <span className="text-sm text-gray-900">
                        {evaluation.mae}
                      </span>
                    </li>
                    <li className="flex items-center justify-between px-3 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        RMSE
                      </span>
                      <span className="text-sm text-gray-900">
                        {evaluation.rmse}
                      </span>
                    </li>
                    <li className="flex items-center justify-between px-3 py-3">
                      <span className="text-sm font-medium text-gray-700">
                        MAPE
                      </span>
                      <span className="text-sm text-gray-900">
                        {typeof evaluation.mape === "string"
                          ? evaluation.mape
                          : `${evaluation.mape}%`}
                      </span>
                    </li>
                    <li className="px-3 py-3">
                      <div className="text-xs text-gray-600">
                        <p>
                          {mapeNum < 10 &&
                            "Model prediksi memiliki tingkat kesalahan yang sangat rendah, hasil dapat dijadikan dasar keputusan strategis."}
                          {mapeNum >= 10 &&
                            mapeNum < 20 &&
                            "Prediksi cukup konsisten dan dapat diperhitungkan untuk perencanaan operasional."}
                          {mapeNum >= 20 &&
                            mapeNum < 30 &&
                            "Prediksi masih dalam batas wajar, namun perlu perhatian lebih dalam analisis lanjutan."}
                          {mapeNum >= 30 &&
                            "Tingkat kesalahan relatif tinggi, disarankan dilakukan peninjauan ulang terhadap model atau data input."}
                        </p>
                      </div>
                    </li>
                  </>
                );
              })()}
            </ul>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              No evaluation data available.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
