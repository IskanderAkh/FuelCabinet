import type { FuelEntry } from "../types";
import { daysAgo } from "../lib/date";
import { trucks } from "./trucks";

/**
 * Fuel transactions for the last 30 days.
 * Generated with a seeded PRNG so the data is identical on every run,
 * while dates stay relative to today (the 7-day chart always has data).
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const stations = ["Pilot Flying J", "Love's Travel Stop", "TA Petro", "Speedway", "Sapp Bros", "Kwik Trip"];

function generateFuelEntries(): FuelEntry[] {
  const rand = mulberry32(2026);
  const entries: FuelEntry[] = [];
  let n = 1;

  for (let day = 7; day >= 0; day--) {
    for (const truck of trucks) {
      // Only moving trucks refuel; active trucks refuel more often
      const chance = truck.status === "active" ? 0.45 : truck.status === "idle" ? 0.12 : 0;
      if (rand() > chance) continue;

      const gallons = Math.round((60 + rand() * 120) * 10) / 10;
      const pricePerGallon = Math.round((3.69 + rand() * 0.6) * 100) / 100;
      entries.push({
        id: `fuel_${String(n++).padStart(4, "0")}`,
        truckId: truck.id,
        date: daysAgo(day),
        gallons,
        pricePerGallon,
        amount: Math.round(gallons * pricePerGallon * 100) / 100,
        station: stations[Math.floor(rand() * stations.length)],
      });
    }
  }
  return entries;
}

export const fuelEntries: FuelEntry[] = generateFuelEntries();
