import { CostSection } from "./components/cost-section";
import { FutureInsightSection } from "./components/future-insight-section";

export function DataDash() {
  return (
    <div className="flex flex-col gap-2">
      <FutureInsightSection/>
      <CostSection />
    </div>
  );
}
