const DAY_MS = 24 * 60 * 60 * 1000;

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** ISO date (YYYY-MM-DD) n days before today */
export function daysAgo(n: number): string {
  return toIsoDate(new Date(startOfToday().getTime() - n * DAY_MS));
}

/** ISO date (YYYY-MM-DD) n days after today */
export function daysFromNow(n: number): string {
  return toIsoDate(new Date(startOfToday().getTime() + n * DAY_MS));
}

/** ISO datetime n hours before now */
export function hoursAgo(n: number): string {
  return new Date(Date.now() - n * 60 * 60 * 1000).toISOString();
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayIso(): string {
  return toIsoDate(startOfToday());
}
