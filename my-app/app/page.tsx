"use client";

import { useState } from "react";
import { CustomerSelector } from "@/components/customer-selector";

type SelectedCustomer = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  propertyType: string;
  squareFootage: number;
  systemType: string;
  systemAge: number | null;
  lastServiceDate: string | null;
};

export default function Home() {
  const [selectedCustomer, setSelectedCustomer] =
    useState<SelectedCustomer | null>(null);

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
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-zinc-500">Name</dt>
                <dd className="font-medium">{selectedCustomer.name}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Customer ID</dt>
                <dd className="font-medium">{selectedCustomer.id}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-zinc-500">Address</dt>
                <dd className="font-medium">{selectedCustomer.address}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Property type</dt>
                <dd className="font-medium capitalize">
                  {selectedCustomer.propertyType}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">System</dt>
                <dd className="font-medium">{selectedCustomer.systemType}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Square footage</dt>
                <dd className="font-medium">
                  {selectedCustomer.squareFootage.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Phone</dt>
                <dd className="font-medium">
                  {selectedCustomer.phone ?? "No phone on file"}
                </dd>
              </div>
            </dl>
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
