import type { Invoice, InvoiceStatus } from "../types";
import { todayIso } from "./date";

/** A pending invoice whose due date has passed is overdue. */
export function getInvoiceStatus(invoice: Invoice): InvoiceStatus {
  if (invoice.status === "paid") return "paid";
  return invoice.dueDate < todayIso() ? "overdue" : "pending";
}
