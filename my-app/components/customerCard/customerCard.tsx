"use client"

import { useState } from "react";
import { CustomerSelector } from "@/components/customerCard/customer-selector";
import { CustomerSummary } from "@/components/customerCard/customer-summary";
import { Customer } from "@/lib/types";

export default function CustomerCard() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Select a customer
      </h1>

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
  );
}