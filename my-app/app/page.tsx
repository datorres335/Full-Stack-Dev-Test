import CustomerCard from "@/components/customerCard/customerCard"
import EquipmentCard from "@/components/equipmentCard/equipmentCard";
import LaborRateCard from "@/components/laborRateCard/laborRateCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="space-y-2">
          <p className="text-2xl font-medium uppercase tracking-wide text-zinc-500">
            HVAC Estimate Tool
          </p>
        </div>

        <CustomerCard />
        <LaborRateCard />
        <EquipmentCard />

      </section>
    </main>
  );
}
