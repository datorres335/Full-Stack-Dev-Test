import { Customer } from "@/lib/types";

type CustomerSummaryProps = {
  selectedCustomer: Customer;
};

export function CustomerSummary ({ selectedCustomer }: CustomerSummaryProps) {
  return (
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
  );
}