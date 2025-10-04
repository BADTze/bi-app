interface RegressionData {
  coefficients: Record<string, number>;
  intercept: number;
  r2_score: number;
}

export function RegressionInfo({ data }: { data: RegressionData }) {
  if (!data) return null;

  return (
    <div className="border rounded-xl bg-white p-4 shadow-sm flex flex-col">
      <h3 className="text-lg font-medium mb-4">Multiple Linear Regression</h3>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold">Intercept:</span>{" "}
          {data.intercept.toFixed(4)}
        </p>
        <p>
          <span className="font-semibold">R² Score:</span>{" "}
          {data.r2_score.toFixed(3)}
        </p>

        <div className="mt-2">
          <span className="font-semibold">Coefficients:</span>
          <ul className="list-disc list-inside text-gray-700">
            {Object.entries(data.coefficients).map(([feature, coef]) => (
              <li key={feature}>
                {feature}: {coef.toExponential(3)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
