import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PeakMonth {
  month: string;
  index_energy: number;
}

export interface PeakMonthModel {
  prophet: PeakMonth[];
  sarimax: PeakMonth[];
  linear: PeakMonth[];
}

export interface PeakIndexEnergyModel {
  prophet: number;
  sarimax: number | null;
  linear: number | null;
}

export interface FutureInsightSummary {
  year: number;
  avg_index_energy: number;
  total_energy_yearly: number;
  peak_month: PeakMonthModel;
  peak_index_energy: PeakIndexEnergyModel;
  avg_productKl: number;
}

export interface KPIOutlook {
  target: number;
  avg_forecast: number;
  status: string;
  gap: number;
}

export interface CapacityPlanning {
  required_energy_next_year: number;
  required_buffer: number;
  recommended_capacity: number;
  peak_load: PeakMonthModel;
}

export interface ScenarioSimulation {
  product_plus_10: number;
  product_minus_5: number;
  achieve_KPI_target: number;
}

export interface FutureInsight {
  summary: FutureInsightSummary;
  kpi_outlook: KPIOutlook;
  capacity_planning: CapacityPlanning;
  scenario_simulation: ScenarioSimulation;
}
