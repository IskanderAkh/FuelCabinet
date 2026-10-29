import type { ActivityEvent } from "../types";
import { hoursAgo } from "../lib/date";

/** Seed activity feed. New events are prepended at runtime (invoice created, marked paid, etc.). */
export const activity: ActivityEvent[] = [
  { id: "act_001", type: "invoice_created", title: "Invoice created", description: "INV-2026-0056 issued to Summit Building Supply", entityType: "invoice", entityId: "inv_056", timestamp: hoursAgo(1) },
  { id: "act_002", type: "truck_status_changed", title: "Truck in maintenance", description: "TRK-1018 moved to maintenance (brake inspection)", entityType: "truck", entityId: "trk_018", timestamp: hoursAgo(3) },
  { id: "act_003", type: "truck_refueled", title: "Truck refueled", description: "TRK-1003 refueled at Love's Travel Stop", entityType: "truck", entityId: "trk_003", timestamp: hoursAgo(5) },
  { id: "act_004", type: "invoice_overdue", title: "Invoice overdue", description: "INV-2026-0031 for Prairie Grain Co. is past due", entityType: "invoice", entityId: "inv_031", timestamp: hoursAgo(9) },
  { id: "act_005", type: "truck_status_changed", title: "Truck idle", description: "TRK-1012 finished its route and is waiting for dispatch", entityType: "truck", entityId: "trk_012", timestamp: hoursAgo(14) },
  { id: "act_006", type: "invoice_paid", title: "Invoice paid", description: "INV-2026-0055 paid by Ironclad Manufacturing", entityType: "invoice", entityId: "inv_055", timestamp: hoursAgo(40) },
  { id: "act_007", type: "truck_refueled", title: "Truck refueled", description: "TRK-1007 refueled at Pilot Flying J", entityType: "truck", entityId: "trk_007", timestamp: hoursAgo(46) },
  { id: "act_008", type: "invoice_paid", title: "Invoice paid", description: "INV-2026-0051 paid by BlueRiver Retail", entityType: "invoice", entityId: "inv_051", timestamp: hoursAgo(64) },
  { id: "act_009", type: "truck_status_changed", title: "Truck in maintenance", description: "TRK-1017 scheduled for oil change and tire rotation", entityType: "truck", entityId: "trk_017", timestamp: hoursAgo(70) },
  { id: "act_010", type: "truck_status_changed", title: "Truck out of service", description: "TRK-1020 taken out of service pending engine repair", entityType: "truck", entityId: "trk_020", timestamp: hoursAgo(80) },
];
