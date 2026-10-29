import { format, formatDistanceToNow, parseISO } from "date-fns";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const usdShort = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatCurrency = (value: number) => usd.format(value);
export const formatCurrencyShort = (value: number) => usdShort.format(value);

/** "Oct 28, 2026" */
export const formatDate = (iso: string) => format(parseISO(iso), "MMM d, yyyy");

/** "Mon" / "Oct 28" — for chart axes */
export const formatWeekday = (iso: string) => format(parseISO(iso), "EEE");
export const formatShortDate = (iso: string) => format(parseISO(iso), "MMM d");

/** "3 hours ago" */
export const timeAgo = (iso: string) => formatDistanceToNow(parseISO(iso), { addSuffix: true });
