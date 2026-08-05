"use client";

import { useEffect, useMemo, useState } from "react";
import { LaborRate } from "@/lib/types";
import { JobTypeSelector } from "@/components/laborRateCard/jobType-selector";
import { LaborRateSummary } from "@/components/laborRateCard/laborRate-summary";
import { LevelSelector } from "@/components/laborRateCard/level-selector";

export default function LaborRateCard() {
  const [laborRates, setLaborRates] = useState<LaborRate[]>([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLaborRates() {
      try {
        const response = await fetch("/api/labor-rates", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load labor rates");
        }

        const data = (await response.json()) as LaborRate[];
        setLaborRates(data);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError("Could not load labor rates");
      } finally {
        setIsLoading(false);
      }
    }

    void loadLaborRates();

    return () => controller.abort();
  }, []);

  const jobTypes = useMemo(
    () => Array.from(new Set(laborRates.map((rate) => rate.jobType))).sort(),
    [laborRates],
  );

  const levels = useMemo(
    () =>
      Array.from(
        new Set(
          laborRates
            .filter((rate) => rate.jobType === selectedJobType)
            .map((rate) => rate.level),
        ),
      ).sort(),
    [laborRates, selectedJobType],
  );

  const selectedLaborRate = useMemo(
    () =>
      laborRates.find(
        (rate) =>
          rate.jobType === selectedJobType && rate.level === selectedLevel,
      ) ?? null,
    [laborRates, selectedJobType, selectedLevel],
  );

  function handleJobTypeSelect(jobType: string) {
    setSelectedJobType(jobType);
    setSelectedLevel("");
    setEstimatedHours(0);
  }

  function handleLevelSelect(level: string) {
    const laborRate = laborRates.find(
      (rate) => rate.jobType === selectedJobType && rate.level === level,
    );

    setSelectedLevel(level);
    setEstimatedHours(laborRate?.estimatedHoursMin ?? 0);
  }

  return (
    <article className="flex w-full flex-col gap-6 rounded-md border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-2xl font-semibold tracking-tight">
        Select labor rate
      </h1>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <JobTypeSelector
              jobTypes={jobTypes}
              selectedJobType={selectedJobType}
              disabled={isLoading}
              onSelect={handleJobTypeSelect}
            />
            <LevelSelector
              levels={levels}
              selectedLevel={selectedLevel}
              disabled={isLoading || !selectedJobType}
              onSelect={handleLevelSelect}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Selected labor rate</h2>

            {selectedLaborRate ? (
              <LaborRateSummary
                selectedLaborRate={selectedLaborRate}
                estimatedHours={estimatedHours}
                onEstimatedHoursChange={setEstimatedHours}
              />
            ) : (
              <p className="mt-3 text-sm text-zinc-500">
                Select a job type and level to see labor pricing.
              </p>
            )}
          </div>
        </>
      )}
    </article>
  );
}
