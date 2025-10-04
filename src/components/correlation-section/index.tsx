import { useEffect, useState } from "react";
import { CorrelationInfo } from "@/components/correlation-section/corr-info";
import { VifInfo } from "./vif-info";
import { RegressionInfo } from "./regression-info";

interface ApiResponse {
  correlation: {
    pearson: any;
    spearman: any;
  };
  regression: any;
  vif: any;
}

export function CorrelationSection() {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:5000/bi-apps/api/var_correlation"
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching correlation:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div className="p-4 text-center">Loading correlation data...</div>;
  }

  return (
    <div className="flex flex-col gap-3 w-full rounded-2xl bg-gray-200 border-2 p-4">
      <h2 className="text-xl font-semibold">Correlation Info</h2>
      <CorrelationInfo title="Pearson Method" data={data.correlation.pearson} />
      <CorrelationInfo
        title="Spearman Method"
        data={data.correlation.spearman}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VifInfo />
        <RegressionInfo data={data.regression} />
      </div>
    </div>
  );
}
