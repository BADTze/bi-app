import { HeatmapChart } from "@/components/heatmap";
import { RegressionPlot } from "@/pages/correlation/components/regression-plot";

interface Props {
  title: string;
  data: {
    matrix: Record<string, Record<string, number>>;
    highest_positive: { pair: string[]; value: number };
    highest_negative: { pair: string[]; value: number };
  };
}

export function CorrelationInfo({ title, data }: Props) {
  return (
    <div className="border rounded-lg bg-white p-3 shadow-sm">
      <h3 className="text-md font-semibold mb-3 text-gray-700">{title}</h3>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Heatmap */}
        <div className="flex-1 bg-gray-50 rounded-lg p-2 flex items-center justify-center min-h-[260px]">
          <HeatmapChart matrix={data.matrix} />
        </div>

        {/* Correlation Plots */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          {/* Positive */}
          <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium text-green-700">
                + Positive (r={data.highest_positive.value.toFixed(2)})
              </h4>
              <span className="text-sm font-bold text-gray-600">
                {data.highest_positive.pair[0]} vs {data.highest_positive.pair[1]}
              </span>
            </div>
            <div className="h-[160px]">
              <RegressionPlot pair={data.highest_positive.pair} />
            </div>
          </div>

          {/* Negative */}
          <div className="bg-gray-50 rounded-lg p-2 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium text-red-700">
                − Negative (r={data.highest_negative.value.toFixed(2)})
              </h4>
              <span className="text-sm font-bold text-gray-600">
                {data.highest_negative.pair[0]} vs {data.highest_negative.pair[1]}
              </span>
            </div>
            <div className="h-[160px]">
              <RegressionPlot pair={data.highest_negative.pair} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
