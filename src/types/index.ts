export type TruckStatus = "active" | "idle" | "maintenance" | "out_of_service";

export interface Truck {
  id: string;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
  status: TruckStatus;
  make: string;
  model: string;
  year: number;
  mileage: number; // miles
  currentLocation: string;
  lastUpdated: string; // ISO date
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

/** Stored status. "overdue" is derived from dueDate — see getInvoiceStatus(). */
export type StoredInvoiceStatus = "paid" | "pending";
export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface InvoiceTransaction {
  id: string;
  truckId: string;
  route: string;
  date: string;
  amount: number; // USD
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  truckId: string | null;
  route: string;
  amount: number; // USD
  issueDate: string; // ISO date
  dueDate: string; // ISO date
  status: StoredInvoiceStatus;
  paidAt: string | null;
  servicePeriodStart?: string;
  servicePeriodEnd?: string;
  transactions?: InvoiceTransaction[];
}

export interface FuelEntry {
  id: string;
  truckId: string;
  date: string; // ISO date
  gallons: number;
  pricePerGallon: number;
  amount: number; // USD
  station: string;
}

export type ActivityType =
  | "truck_status_changed"
  | "truck_refueled"
  | "invoice_created"
  | "invoice_paid"
  | "invoice_overdue";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  entityType: "truck" | "invoice";
  entityId: string;
  timestamp: string; // ISO datetime
}

/** Payload for the "Create invoice" form */
export interface NewInvoiceInput {
  customerId: string;
  truckId: string | null;
  route: string;
  amount: number;
  issueDate: string;
  dueDate: string;
}
