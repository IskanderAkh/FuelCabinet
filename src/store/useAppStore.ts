import { create } from "zustand";
import type {
  ActivityEvent,
  Customer,
  FuelEntry,
  Invoice,
  NewInvoiceInput,
  Truck,
} from "@/types";
import { api } from "@/lib/mockApi";
import { todayIso } from "@/lib/date";

type LoadStatus = "idle" | "loading" | "success" | "error";

interface AppState {
  trucks: Truck[];
  invoices: Invoice[];
  customers: Customer[];
  fuelEntries: FuelEntry[];
  activity: ActivityEvent[];
  status: LoadStatus;
  error: string | null;

  loadAll: () => Promise<void>;
  markInvoicePaid: (id: string) => void;
  createInvoice: (input: NewInvoiceInput) => Invoice;
}

function makeActivity(event: Omit<ActivityEvent, "id" | "timestamp">): ActivityEvent {
  return { ...event, id: `act_${Date.now()}`, timestamp: new Date().toISOString() };
}

export const useAppStore = create<AppState>((set, get) => ({
  trucks: [],
  invoices: [],
  customers: [],
  fuelEntries: [],
  activity: [],
  status: "idle",
  error: null,

  loadAll: async () => {
    // Avoid duplicate loads (e.g. React StrictMode or switching pages)
    if (get().status === "loading" || get().status === "success") return;
    set({ status: "loading", error: null });
    try {
      const [trucks, invoices, customers, fuelEntries, activity] = await Promise.all([
        api.getTrucks(),
        api.getInvoices(),
        api.getCustomers(),
        api.getFuelEntries(),
        api.getActivity(),
      ]);
      set({ trucks, invoices, customers, fuelEntries, activity, status: "success" });
    } catch (e) {
      set({ status: "error", error: e instanceof Error ? e.message : "Something went wrong" });
    }
  },

  markInvoicePaid: (id) => {
    const invoice = get().invoices.find((i) => i.id === id);
    if (!invoice || invoice.status === "paid") return;

    set((state) => ({
      invoices: state.invoices.map((i) =>
        i.id === id ? { ...i, status: "paid", paidAt: todayIso() } : i
      ),
      activity: [
        makeActivity({
          type: "invoice_paid",
          title: "Invoice paid",
          description: `${invoice.invoiceNumber} paid by ${invoice.customerName}`,
          entityType: "invoice",
          entityId: id,
        }),
        ...state.activity,
      ],
    }));
  },

  createInvoice: (input) => {
    const { invoices, customers } = get();
    const customer = customers.find((c) => c.id === input.customerId);

    const invoice: Invoice = {
      ...input,
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(4, "0")}`,
      customerName: customer?.name ?? "Unknown customer",
      status: "pending",
      paidAt: null,
    };

    set((state) => ({
      invoices: [invoice, ...state.invoices],
      activity: [
        makeActivity({
          type: "invoice_created",
          title: "Invoice created",
          description: `${invoice.invoiceNumber} issued to ${invoice.customerName}`,
          entityType: "invoice",
          entityId: invoice.id,
        }),
        ...state.activity,
      ],
    }));

    return invoice;
  },
}));
