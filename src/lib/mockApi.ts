import type { ActivityEvent, Customer, FuelEntry, Invoice, Truck } from "../types";
import { trucks } from "../data/trucks";
import { invoices } from "../data/invoices";
import { customers } from "../data/customers";
import { fuelEntries } from "../data/fuel";
import { activity } from "../data/activity";

/**
 * Fake network layer so loading and error states can be shown.
 * Add ?mockError=1 to the URL to force every request to fail.
 */
const DELAY_MS = 600;

function request<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const forceError =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).has("mockError");
      if (forceError) reject(new Error("Failed to load data. Please try again."));
      else resolve(structuredClone(data));
    }, DELAY_MS);
  });
}

export const api = {
  getTrucks: () => request<Truck[]>(trucks),
  getInvoices: () => request<Invoice[]>(invoices),
  getCustomers: () => request<Customer[]>(customers),
  getFuelEntries: () => request<FuelEntry[]>(fuelEntries),
  getActivity: () => request<ActivityEvent[]>(activity),
};
