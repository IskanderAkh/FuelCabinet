import FuelExpenses from "@/components/layout/FuelExpenses";
import OverviewCards from "@/components/layout/OverviewCards";

// src/pages/DashboardPage.tsx
export function DashboardPage() {
  return (
    <div className="space-y-6">
      <OverviewCards />
      <FuelExpenses />
    </div>
  );
}