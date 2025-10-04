import { HeatmapChart } from "@/components/heatmap";
import { RegressionPlot } from "@/components/correlation-section/regression-plot";

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
    <div className="border rounded-xl bg-white p-3 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div className="flex gap-4 items-start">
        {/* Heatmap */}
        <div className="h-[40vh] w-[50vh] shrink-0">
          <HeatmapChart matrix={data.matrix} />
        </div>

        {/* Scatter plots */}
        <div className="flex flex-col h-full flex-1">
          {/* Highest Positive */}
          <div className="mb-2">
            <h4 className="text-base font-semibold mb-1">Highest Positive</h4>
            <div className="bg-gray-50 rounded-lg p-2 shadow h-[15vh] w-[50vh]">
              <RegressionPlot
                pair={data.highest_positive.pair}
                label={`r=${data.highest_positive.value.toFixed(2)}`}
              />
            </div>
          </div>

          {/* Highest Negative */}
          <div>
            <h4 className="text-base font-semibold mb-1">Highest Negative</h4>
            <div className="bg-gray-50 rounded-lg p-2 shadow h-[15vh] w-[50vh]">
              <RegressionPlot
                pair={data.highest_negative.pair}
                label={`r=${data.highest_negative.value.toFixed(2)}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
