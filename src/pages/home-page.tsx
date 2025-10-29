import { CorrelationSection } from "@/components/correlation-section";
import { EnergyOverviewSection } from "@/components/energy-section";

export function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 min-h-[600px] items-stretch">
      <div className="flex-[1.5] min-w-[55%] flex">
        <CorrelationSection/>
      </div>

      <div className="flex-1 min-w-[40%] flex overflow-hidden">
        <EnergyOverviewSection/>
      </div>
    </div>
  );
}
