import React, { useState } from "react";
import { Button } from "./ui/button";

const FilterBar: React.FC = () => {
  const [mode, setMode] = useState("monthly");
  const [year, setYear] = useState("2025");
  const [category, setCategory] = useState("indexEnergy");

  const handleSubmit = () => {
    console.log({
      mode,
      year,
      category,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      {/* Mode Select */}
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="rounded px-3 text-sm border border-gray-300"
        style={{ width: "140px", height: "36px" }}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Year Select */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="rounded px-3 text-sm border border-gray-300"
        style={{ width: "120px", height: "36px" }}
      >
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded px-3 text-sm border border-gray-300"
        style={{ width: "180px", height: "36px" }}
      >
        <option value="indexEnergy">Index Energy</option>
        <option value="electricity">Electricity</option>
        <option value="naturalGas">Natural Gas</option>
      </select>

      {/* Submit Button */}
      <Button variant="mine" onClick={handleSubmit} className="ml-2">
        Submit
      </Button>
    </div>
  );
};

export default FilterBar;
