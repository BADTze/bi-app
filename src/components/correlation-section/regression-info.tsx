interface Props {
  gradient: number;
  intercept: number;
  r: number;
}

export function RegressionInfo({ gradient, intercept, r }: Props) {
  return (
    <div className="text-sm text-gray-700 mt-2">
      <p>
        Persamaan regresi:{" "}
        <span className="font-mono">
          y = {gradient}x + {intercept}
        </span>
      </p>
      <p>
        Koefisien Determinasi (R²):{" "}
        <span className="font-mono">{r}</span>
      </p>
    </div>
  );
}
