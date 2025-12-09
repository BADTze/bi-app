import { CorrelationInfo } from "@/pages/correlation/components/corr-info";
import { VifInfo } from "@/pages/correlation/components/vif-info";
import { RegressionInfo } from "@/pages/correlation/components/regression-info";
import { useVariableCorrelation } from "@/hooks/variableCorrelation";

export function CorrelationSection() {
  const { data, loading, error } = useVariableCorrelation();

  return (
    <div className="flex flex-col gap-3 w-full h-full rounded-2xl bg-gray-200 border-2 p-3">
      <h2 className="text-xl font-semibold">Correlation Info</h2>
      {loading ? (
        <>
          <div className="h-20 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="h-20 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-gray-300 animate-pulse rounded-lg"></div>
          </div>
        </>
      ) : error ? (
        <div className="p-4 bg-red-100 rounded-lg text-red-700">
          Error loading correlation data: {error}
        </div>
      ) : data ? (
        <>
          <CorrelationInfo
            title="Pearson Method"
            data={data.correlation.pearson}
          />
          <CorrelationInfo
            title="Spearman Method"
            data={data.correlation.spearman}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VifInfo />
            <RegressionInfo data={data.regression} />
          </div>
        </>
      ) : (
        <div className="p-4 bg-yellow-100 rounded-lg text-yellow-700">
          No data available
        </div>
      )}
    </div>
  );
}
