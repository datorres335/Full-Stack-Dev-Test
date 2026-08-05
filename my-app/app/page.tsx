"use client";

import { useState } from "react";
import CustomerCard from "@/components/customerCard/customerCard"
import EquipmentCard from "@/components/equipmentCard/equipmentCard";
import EstimateCard from "@/components/estimateCard/estimateCard";
import LaborRateCard from "@/components/laborRateCard/laborRateCard";
import { Customer, Equipment, LaborEstimate } from "@/lib/types";

export default function Home() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [laborEstimate, setLaborEstimate] = useState<LaborEstimate | null>(null);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="space-y-2">
          <p className="text-2xl font-medium uppercase tracking-wide text-zinc-500">
            HVAC Estimate Tool
          </p>
        </div>

        <CustomerCard onCustomerChange={setSelectedCustomer} />
        <LaborRateCard onLaborEstimateChange={setLaborEstimate} />
        <EquipmentCard onEquipmentChange={setSelectedEquipment} />
        <EstimateCard
          customer={selectedCustomer}
          equipment={selectedEquipment}
          laborEstimate={laborEstimate}
        />

      </section>
    </main>
  );
}
