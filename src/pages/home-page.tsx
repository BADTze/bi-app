import { CorrelationSection } from "@/components/correlation-section";
import { EnergyTrends } from "@/components/energy-trends-section/energy-trends";

export function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      {/* Correlation Section - lebih lebar */}
      <div className="flex-[1.5] min-w-[55%]">
        <CorrelationSection />
      </div>

      {/* Energy Trends - lebih kecil */}
      <div className="flex-1 min-w-[40%]">
        <EnergyTrends />
      </div>
    </div>
  );
}
