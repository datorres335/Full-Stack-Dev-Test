"use client";

import { LaborRate } from "@/lib/types";
import { formatCurrency } from "@/lib/formatCurrency";

type LaborRateSummaryProps = {
  selectedLaborRate: LaborRate;
  estimatedHours: number;
  onEstimatedHoursChange: (hours: number) => void;
};

export function LaborRateSummary({
  selectedLaborRate,
  estimatedHours,
  onEstimatedHoursChange,
}: LaborRateSummaryProps) {
  const totalLaborCost = selectedLaborRate.hourlyRate * estimatedHours;

  return (
    <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
      <div>
        <p className="text-zinc-500">Hourly rate</p>
        <p className="font-medium">
          {formatCurrency(selectedLaborRate.hourlyRate)}/hr
        </p>
      </div>
      <div>
        <p className="text-zinc-500">Allowed hours</p>
        <p className="font-medium">
          {selectedLaborRate.estimatedHoursMin} -{" "}
          {selectedLaborRate.estimatedHoursMax} hrs
        </p>
      </div>
      <label className="block sm:col-span-2">
        <span className="text-zinc-500">Estimated hours</span>
        <input
          type="number"
          min={selectedLaborRate.estimatedHoursMin}
          max={selectedLaborRate.estimatedHoursMax}
          step="0.5"
          value={estimatedHours}
          className="mt-2 h-11 w-full max-w-xs rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-700 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-300 dark:focus:ring-zinc-800"
          onChange={(event) => {
            const value = Number(event.target.value);
            const boundedValue = Math.min(
              selectedLaborRate.estimatedHoursMax,
              Math.max(selectedLaborRate.estimatedHoursMin, value),
            );

            onEstimatedHoursChange(boundedValue);
          }}
        />
      </label>
      <div className="sm:col-span-2">
        <p className="text-zinc-500">Estimated labor total</p>
        <p className="text-lg font-semibold">
          {formatCurrency(totalLaborCost)}
        </p>
      </div>
    </div>
  );
}
