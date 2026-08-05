import { Customer, Equipment, LaborEstimate } from "@/lib/types";
import { formatCurrency } from "@/lib/formatCurrency";

type EstimateCardProps = {
  customer: Customer | null;
  equipment: Equipment | null;
  laborEstimate: LaborEstimate | null;
};

export default function EstimateCard({
  customer,
  equipment,
  laborEstimate,
}: EstimateCardProps) {
  const equipmentTotal = equipment?.baseCost ?? 0;
  const laborTotal = laborEstimate?.laborTotal ?? 0;
  const estimatedTotal = laborTotal + equipmentTotal;

  return (
    <article className="flex w-full flex-col gap-6 rounded-md border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Estimate summary
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Review the selected customer, labor, equipment, and total estimate.
        </p>
      </div>

      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-zinc-500">Customer</dt>
          <dd className="font-medium">
            {customer?.name ?? "No customer selected"}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">Labor</dt>
          <dd className="font-medium">
            {laborEstimate
              ? `${laborEstimate.laborRate.jobType} / ${laborEstimate.laborRate.level}`
              : "No labor rate selected"}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">Equipment</dt>
          <dd className="font-medium">
            {equipment?.name ?? "No equipment selected"}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">Estimated hours</dt>
          <dd className="font-medium">
            {laborEstimate ? `${laborEstimate.estimatedHours} hrs` : "N/A"}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">Labor total</dt>
          <dd className="font-medium">{formatCurrency(laborTotal)}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Equipment base cost</dt>
          <dd className="font-medium">{formatCurrency(equipmentTotal)}</dd>
        </div>
      </dl>

      <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">Final estimated total</p>
        <p className="mt-1 text-3xl font-semibold">
          {formatCurrency(estimatedTotal)}
        </p>
      </div>
    </article>
  );
}
