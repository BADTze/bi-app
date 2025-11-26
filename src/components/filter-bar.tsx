import React from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FilterBarProps {
  category: string;
  setCategory: (cat: string) => void;
  year: string;
  setYear: (yr: string) => void;
  years: string[];
  onSubmit: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  category,
  setCategory,
  year,
  setYear,
  years,
  onSubmit,
}) => {
  // Buat daftar tahun dinamis: tahun historis + 3 tahun ke depan dari tahun terakhir historis
  let yearNums = years.map((y) => parseInt(y, 10)).filter((y) => !isNaN(y));
  let maxYear = yearNums.length > 0 ? Math.max(...yearNums) : new Date().getFullYear();
  let minYear = yearNums.length > 0 ? Math.min(...yearNums) : new Date().getFullYear();
  let dynamicYears = [];
  for (let y = minYear; y <= maxYear + 3; y++) {
    dynamicYears.push(String(y));
  }
  // Hilangkan duplikat dan urutkan
  dynamicYears = Array.from(new Set(dynamicYears)).sort();

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      {/* Category Select */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px] h-[36px] rounded px-3 text-sm border-8 border-gray-300">
          <SelectValue placeholder="Pilih Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="indexEnergy">Index Energy</SelectItem>
          <SelectItem value="electricity">Electricity</SelectItem>
          <SelectItem value="naturalGas">Natural Gas</SelectItem>
        </SelectContent>
      </Select>

      {/* Year Select (dynamic) */}
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-[120px] h-[36px] rounded px-3 text-sm border-4 border-gray-200">
          <SelectValue placeholder="Pilih Tahun" />
        </SelectTrigger>
        <SelectContent>
          {dynamicYears.length > 0 ? (
            dynamicYears.map((yr) => (
              <SelectItem key={yr} value={yr}>
                {yr}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no_years" disabled>
              No Years
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Submit Button */}
      <Button variant="mine" onClick={onSubmit} className="ml-2">
        Submit
      </Button>
    </div>
  );
};

export default FilterBar;
