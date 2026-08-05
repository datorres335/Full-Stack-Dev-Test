"use client"

import { useState } from "react";
import { EquipmentSelector } from "@/components/equipmentCard/equipment-selector";
import { EquipmentSummary } from "@/components/equipmentCard/equipment-summary";
import { Equipment } from "@/lib/types";

type EquipmentCardProps = {
  onEquipmentChange?: (equipment: Equipment | null) => void;
};

export default function EquipmentCard({ onEquipmentChange }: EquipmentCardProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  function handleEquipmentSelect(equipment: Equipment | null) {
    setSelectedEquipment(equipment);
    onEquipmentChange?.(equipment);
  }

  return (
    <article className="flex w-full flex-col gap-6 rounded-md border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-2xl font-semibold tracking-tight">Select equipment</h1>

      <EquipmentSelector onSelect={handleEquipmentSelect} />

      <div>
        <h2 className="text-lg font-semibold">Selected equipment</h2>

        {selectedEquipment ? (
          <EquipmentSummary selectedEquipment={selectedEquipment} />
        ) : (
          <p className="mt-3 text-sm text-zinc-500">
            No equipment selected yet.
          </p>
        )}
      </div>
    </article>
  );
}
