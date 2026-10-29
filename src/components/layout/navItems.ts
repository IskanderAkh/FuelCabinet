import { FuelIcon, LayoutDashboard, Receipt, Truck, type LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/trucks", label: "Fleet & Trucks", icon: Truck },
  { to: "/billing", label: "Invoices & Billing", icon: Receipt },
  { to: "/analytics", label: "Fuel Analytics", icon: FuelIcon },
];
