"use client";

import { useState } from "react";
import { CustomerSelector } from "@/components/customer-selector";
import { CustomerSummary } from "@/components/customer-summary";
import { Customer } from "@/lib/types";

export default function Home() {
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            HVAC Estimate Tool
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Select a customer
          </h1>
        </div>

        <CustomerSelector onSelect={setSelectedCustomer} />

        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">Selected customer</h2>

          {selectedCustomer ? (
            <CustomerSummary selectedCustomer={selectedCustomer} />
          ) : (
            <p className="mt-3 text-sm text-zinc-500">
              No customer selected yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
