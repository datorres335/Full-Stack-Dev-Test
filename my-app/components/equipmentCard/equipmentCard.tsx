"use client"

import { useState } from "react";
import { EquipmentSelector } from "@/components/equipmentCard/equipment-selector";
import { EquipmentSummary } from "@/components/equipmentCard/equipment-summary";
import { Equipment } from "@/lib/types";

export default function EquipmentCard() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Select a equipment
      </h1>

      <EquipmentSelector onSelect={setSelectedEquipment} />

      <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold">Selected customer</h2>

        {selectedEquipment ? (
          <EquipmentSummary selectedEquipment={selectedEquipment} />
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            No customer selected yet.
          </p>
        )}
      </div>
    </section>
  );
}