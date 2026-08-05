import { Equipment } from "@/lib/types";

type EquipmentSummaryProps = {
  selectedEquipment: Equipment;
};

export function EquipmentSummary ({ selectedEquipment }: EquipmentSummaryProps) {
  return (
    <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-zinc-500">Name</dt>
        <dd className="font-medium">{selectedEquipment.name}</dd>
      </div>
      <div>
        <dt className="text-zinc-500">Equipment ID</dt>
        <dd className="font-medium">{selectedEquipment.id}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-zinc-500">Category</dt>
        <dd className="font-medium">{selectedEquipment.category}</dd>
      </div>
      <div>
        <dt className="text-zinc-500">Brand</dt>
        <dd className="font-medium capitalize">
          {selectedEquipment.brand}
        </dd>
      </div>
      <div>
        <dt className="text-zinc-500">Model Number</dt>
        <dd className="font-medium">{selectedEquipment.modelNumber}</dd>
      </div>
      <div>
        <dt className="text-zinc-500">Base Cost</dt>
        <dd className="text-lg font-semibold">
          ${selectedEquipment.baseCost.toLocaleString()}
        </dd>
      </div>
    </dl>
  );
}