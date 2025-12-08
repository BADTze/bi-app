export interface FutureInsight {
  summary: InsightSummary;
  kpi_outlook: KPIOutlook;
  capacity_planning: CapacityPlanning;
  cost_projection: CostProjection;
  scenario_simulation: ScenarioSimulation;
}

/* ----------------------------- SUMMARY ----------------------------- */

export interface InsightSummary {
  year: number;
  avg_index_energy: number;
  avg_productKl: number;
  total_energy_yearly: number;
  peak_index_energy: PeakIndexEnergy;
}

export interface PeakIndexEnergy {
  prophet: number;
  sarimax: number;
  linear: number;
}

/* ----------------------------- KPI OUTLOOK ----------------------------- */

export interface KPIOutlook {
  target: number;
  avg_forecast: number;
  status: string;
  gap: number;
}

/* ------------------------ CAPACITY PLANNING ------------------------ */

export interface CapacityPlanning {
  required_electricity_gj: number;
  required_natural_gas_gj: number;
  total_energy_gj_next_year: number;

  peak_load: {
    electricity: {
      month: string;
      value_gj: number;
    };
    natural_gas: {
      month: string;
      value_gj: number;
    };
  };

  recommended_capacity_electricity_gj: number;
  recommended_capacity_natural_gas_gj: number;
}

/* ------------------------ COST PROJECTION ------------------------ */

export interface CostProjection {
  avg_price_per_gj_electricity: number;
  avg_price_per_gj_natural_gas: number;

  electricity_cost_est: number;
  natural_gas_cost_est: number;
  total_cost_est: number;
}

/* ------------------------ SCENARIO SIMULATION ------------------------ */

export interface ScenarioSimulation {
  product_plus_10: number;
  product_minus_5: number;
  achieve_KPI_target: number;
}
