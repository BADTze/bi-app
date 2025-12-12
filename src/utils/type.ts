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
  peak_month: PeakMonthData;
}

export interface PeakIndexEnergy {
  prophet: number;
  sarimax: number | null;
  linear: number | null;
}

export interface PeakMonthInfo {
  month: string;
  index_energy: number;
}

export interface PeakMonthData {
  prophet: PeakMonthInfo[];
  sarimax: PeakMonthInfo[];
  linear: PeakMonthInfo[];
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
  best_electricity_model: string;
  best_natural_gas_model: string; 
  required_electricity_kwh: number;
  required_natural_gas_mmbtu: number;
  required_index_energy_gj: number;

  peak_load: {
    electricity: {
      month: string | null;
      value_kwh: number | null;
    };
    natural_gas: {
      month: string | null;
      value_mmbtu: number | null;
    };
  };

  recommended_capacity_electricity_kwh: number | null;
  recommended_capacity_natural_gas_mmbtu: number | null;

  natural_gas_anomalies: NaturalGasAnomaly[];
}

export interface NaturalGasAnomaly {
  type: "below_minimum" | "above_maximum";
  month: string;
  value: number;
  threshold: number;
  message: string;
}

/* ------------------------ COST PROJECTION ------------------------ */

export interface CostProjection {
  total_electricity_kwh: number;
  total_natural_gas_mmbtu: number;

  avg_price_per_kwh: number;
  avg_price_per_mmbtu: number;

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
