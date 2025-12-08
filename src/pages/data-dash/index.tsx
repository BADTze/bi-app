import { CostSection } from "./components/cost-section";
import { FutureInsightSection } from "./components/future-insight-section";

export function DataDash() {
  return (
    <div>
      <FutureInsightSection />
      <CostSection />
    </div>
  );
}
