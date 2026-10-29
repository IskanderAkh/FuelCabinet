import { ArrowUpRight, Fuel, Gauge, Plus, Wallet, Truck } from 'lucide-react';
import { fuelEntries } from "@/data/fuel";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { formatDate } from '@/lib/format';




const totalFuel = fuelEntries.reduce((sum, entry) => sum + entry.gallons, 0);
const totalCost = fuelEntries.reduce((sum, entry) => sum + (entry.gallons * entry.pricePerGallon), 0);
const averageCost = Math.round(totalCost / totalFuel);
const maxCount: number = 10;
const averageDailySpend = totalCost / new Set(fuelEntries.map((entry) => entry.date)).size;
const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
const dailyFuelSpend = Object.values(
    fuelEntries.reduce<Record<string, { date: string; gallons: number; amount: number }>>((dailySpend, entry) => {
        const day = dailySpend[entry.date] ?? { date: entry.date, gallons: 0, amount: 0 };
        day.gallons += entry.gallons;
        day.amount += entry.amount;
        dailySpend[entry.date] = day;
        return dailySpend;
    }, {}),
).map((day) => ({
    ...day,
    averagePricePerGallon: day.gallons > 0 ? day.amount / day.gallons : 0,
})).sort((a, b) => a.date.localeCompare(b.date));

interface FuelTooltipProps {
    active?: boolean;
    payload?: readonly { payload?: (typeof dailyFuelSpend)[number] }[];
}

function FuelToolTip({ active, payload }: FuelTooltipProps) {
    const day = payload?.[0]?.payload;
    if (!active || !day) return null;

    const rows = [
        { label: 'Gallons', value: `${day.gallons.toLocaleString(undefined, { maximumFractionDigits: 1 })} gal` },
        { label: 'Amount', value: formatCurrency(day.amount) },
        { label: 'Average Price / Gallon', value: formatCurrency(day.averagePricePerGallon) },
    ];

    return (
        <div className="min-w-44 rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md">
            <p className="mb-1.5 font-medium">{formatDate(day.date)}</p>
            {rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-0.5">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium tabular-nums">{row.value}</span>
                </div>
            ))}
        </div>
    );
}

export default function FuelExpenses() {
    const recentFuelEntries = [...fuelEntries]
        .filter((entry) => entry.date)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, maxCount);

    const summary = [
        {
            label: 'Total fuel',
            value: `${totalFuel.toLocaleString()} L`,
            icon: Fuel,
            iconClass: 'bg-emerald-500/10 text-emerald-700',
        },
        {
            label: 'Total spent',
            value: `$${totalCost.toLocaleString()}`,
            icon: Wallet,
            iconClass: 'bg-amber-500/10 text-amber-700',
        },
        {
            label: 'Average cost / gallon',
            value: `$${averageCost.toLocaleString()}`,
            icon: Gauge,
            iconClass: 'bg-sky-500/10 text-sky-700',
        },
        {
            label: 'truckIds',
            value: new Set(fuelEntries.map((entry) => entry.truckId)).size.toString(),
            icon: Truck,
            iconClass: 'bg-rose-500/10 text-rose-700',
        },
    ];

    return (
        <main className="min-h-full bg-muted/30 px-4 py-6 text-foreground sm:px-6 sm:py-8 border rounded-lg">
            <div className="mx-auto w-full max-w-7xl">
                <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Operations / Fleet
                        </p>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Fuel expenses</h1>
                            <h3>(Last 7 days)</h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Monitor refueling activity and recorded costs.</p>
                    </div>
                    <button
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        type="button"
                    >
                        <Plus className="size-4" aria-hidden="true" />
                        Add fuel expense
                    </button>
                </header>

                <section aria-label="Fuel expense summary" className="mb-7 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                    {summary.map(({ label, value, icon: Icon, iconClass }) => (
                        <article key={label} className="rounded-lg border bg-card p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                                    <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
                                </div>
                                <span className={`grid size-10 shrink-0 place-items-center rounded-md ${iconClass}`}>
                                    <Icon className="size-5" aria-hidden="true" />
                                </span>
                            </div>
                        </article>
                    ))}
                </section>

                <section aria-labelledby="fuel-chart-heading" className="mb-7 overflow-hidden rounded-lg border bg-card shadow-sm">
                    <div className="border-b px-5 py-4 sm:px-6">
                        <h2 id="fuel-chart-heading" className="text-base font-semibold">Fuel spend by day</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Daily spend across recorded refueling transactions</p>
                    </div>
                    <div className="h-72 w-full p-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Total spend: ${totalCost.toLocaleString()}</p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyFuelSpend} margin={{ top: 8, right: 12, left: 8, bottom: 0 }} className="h-full w-full outline-none">
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} />
                                <Tooltip content={<FuelToolTip />} />
                                <Bar dataKey="amount" fill="#3b82f6" stroke="none" activeBar={false} radius={[4, 4, 0, 0]} className="transition-all duration-300 ease-in-out hover:fill-blue-600">
                                </Bar>
                                <ReferenceLine
                                    y={averageDailySpend}
                                    stroke="#f59e0b"
                                    strokeDasharray="4 4"
                                    label={{
                                        value: `Avg ${formatCurrency(averageDailySpend)}`,
                                        position: "insideTopRight",
                                        fill: "#f59e0b",
                                        fontSize: 12,
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section aria-labelledby="transactions-heading" className="overflow-hidden rounded-lg border bg-card shadow-sm">
                    <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 id="transactions-heading" className="text-base font-semibold">Recent transactions</h2>
                            <p className="mt-1 text-sm text-muted-foreground">{recentFuelEntries.length} recorded fuel expenses</p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
                            All recorded entries
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                            <thead className="bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
                                <tr>
                                    <th scope="col" className="px-6 py-3.5">Date</th>
                                    <th scope="col" className="px-6 py-3.5">station</th>
                                    <th scope="col" className="px-6 py-3.5">truckId</th>
                                    <th scope="col" className="px-6 py-3.5">gallons</th>
                                    <th scope="col" className="px-6 py-3.5">Amount</th>
                                    <th scope="col" className="px-6 py-3.5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {recentFuelEntries.map((entry) => (
                                    <tr key={`${entry.date}-${entry.station}`} className="transition-colors hover:bg-muted/30">
                                        <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{entry.date}</td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{entry.station}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{entry.truckId}</td>
                                        <td className="whitespace-nowrap px-6 py-4 tabular-nums">{entry.gallons} gal    </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-semibold tabular-nums">KSh {entry.amount.toLocaleString()}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                                <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                                                Approved
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

        </main>
    );
}
