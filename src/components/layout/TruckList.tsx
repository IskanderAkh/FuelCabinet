import { useMemo, useState } from "react";
import { trucks } from "../../data/trucks";
import type { TruckStatus } from "@/types";
import AddTruck from "./AddTruck";



const statusStyles: Record<TruckStatus, string> = {
    active: "bg-blue-50 text-blue-700",
    idle: "bg-blue-50 text-blue-700",
    maintenance: "bg-amber-50 text-amber-700",
    out_of_service: "bg-red-50 text-red-700",
};

export default function
    () {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("All status");

    const filteredTrucks = useMemo(() => {
        const search = query.trim().toLowerCase();
        return trucks.filter((truck) => {
            const matchesSearch = !search || [truck.id, truck.truckNumber, truck.model, truck.driverName, truck.currentLocation]
                .some((value) => value.toLowerCase().includes(search));
            return matchesSearch && (status === "All status" || truck.status === status);
        });
    }, [query, status]);

    const [showAddTruck, setShowAddTruck] = useState(false);

    const handleAddTruck = () => {
        setShowAddTruck(true);
    }
    return (
        <main className="min-h-screen bg-slate-50 p-6 text-slate-900 sm:p-8">
            {
                showAddTruck && <AddTruck onClose={() => setShowAddTruck(false)} />
            }
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-1 text-sm font-medium text-slate-500">Fleet management</p>
                        <h1 className="text-3xl font-bold tracking-tight">Trucks</h1>
                        <p className="mt-2 text-sm text-slate-500">Manage your fleet, drivers, and truck availability.</p>
                    </div>
                    <button onClick={handleAddTruck} type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                        <span aria-hidden="true" className="text-lg leading-none">+</span> Add truck
                    </button>
                </div>

                <section aria-label="Fleet overview" className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: "Total trucks", value: trucks.length, note: "Across your fleet" },
                        { label: "Available", value: trucks.filter((truck) => truck.status === "idle").length, note: "Ready for dispatch" },
                        { label: "On trip", value: trucks.filter((truck) => truck.status === "active").length, note: "Currently assigned" },
                        { label: "In maintenance", value: trucks.filter((truck) => truck.status === "maintenance").length, note: "Service required" },
                    ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                            <p className="mt-2 text-3xl font-bold">{item.value}</p>
                            <p className="mt-1 text-xs text-slate-400">{item.note}</p>
                        </div>
                    ))}
                </section>

                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Fleet inventory</h2>
                            <p className="mt-1 text-sm text-slate-500">{filteredTrucks.length} trucks shown</p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <label className="relative">
                                <span className="sr-only">Search trucks</span>
                                <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search trucks..." className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-56" />
                            </label>
                            <label>
                                <span className="sr-only">Filter by status</span>
                                <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-40">
                                    <option>All status</option>
                                    <option>available</option>
                                    <option>idle</option>
                                    <option>maintenance</option>
                                    <option>out_of_service</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th scope="col" className="px-5 py-3 font-semibold">Truck</th>
                                    <th scope="col" className="px-5 py-3 font-semibold">License plate</th>
                                    <th scope="col" className="px-5 py-3 font-semibold">Driver</th>
                                    <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                                    <th scope="col" className="px-5 py-3 font-semibold">Location</th>
                                    <th scope="col" className="px-5 py-3 font-semibold">Last service</th>
                                    <th scope="col" className="px-5 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredTrucks.map((truck) => (
                                    <tr key={truck.id} className="transition hover:bg-slate-50">
                                        <td className="px-5 py-4"><p className="font-semibold text-slate-800">{truck.id}</p><p className="mt-1 text-xs text-slate-500">{truck.model}</p></td>
                                        <td className="px-5 py-4 text-slate-600">{truck.truckNumber}</td>
                                        <td className="px-5 py-4 text-slate-600">{truck.driverName}</td>
                                        <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[truck.status]}`}>{truck.status}</span></td>
                                        <td className="px-5 py-4 text-slate-600">{truck.currentLocation}</td>
                                        <td className="px-5 py-4 text-slate-600">{truck.lastUpdated}</td>
                                        <td className="px-5 py-4 text-right"><button type="button" aria-label={`More options for ${truck.id}`} className="rounded-md px-2 py-1 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">···</button></td>
                                    </tr>
                                ))}
                                {filteredTrucks.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-500">No trucks match your search.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
