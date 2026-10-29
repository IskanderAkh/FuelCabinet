import { NavLink } from "react-router-dom";
import { trucks } from "@/data/trucks";
import { invoices } from "@/data/invoices";
const totalTrucks: number = trucks.length;
const totalActiveTrucks: number = trucks.filter((truck) => truck.status === "active").length;
const activeTruckPercentage: number = (totalActiveTrucks / totalTrucks) * 100;
const unpaidInvoices = invoices.filter((invoice) => invoice.status === "pending");
const cards = [
    { title: "Total Trucks", value: totalTrucks.toString(), "linkText": "Fleet View", bottomText: { "Shop": "1 in Shop", "Available": "10 Available" }, page: "/trucks" },
    { title: "Active Trucks", value: totalActiveTrucks.toString(), "linkText": "Utilization", bottomText: { "description": "In use", "units": "6.8 MPG Fleet Avg" }, change: `${activeTruckPercentage.toFixed(2)}%`, page: "/trucks" },
    { title: "Outstanding Invoices", value: unpaidInvoices.length.toString(), "linkText": "View Invoices", bottomText: { "description": "Unpaid balance", "units": `$${unpaidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}` }, change: "", page: "/billing" },
    { title: "Total Discounts", value: "$1,200", "linkText": "See Details", bottomText: { "description": "Compared to last month", "units": "+5%" }, change: "", page: "/billing" },
];


export default function OverviewCards() {
    return (
        <section
            aria-label="Overview"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
            {cards.map(({ title, value, linkText, change, bottomText, page }) => (
                <article
                    key={title}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <h2 className="text-sm font-medium text-gray-500">{title}</h2>
                    {

                        <div className="mt-2 gap-2 flex flex-row justify-between items-end">
                            <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
                            <NavLink to={page} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                {linkText && (
                                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                        {`${change ? `${change} ${linkText} ` : linkText}`}
                                    </span>
                                )}
                            </NavLink>
                        </div>

                    }
                    <div className="mt-4 flex items-center gap-2 border-t-1 border-gray-200 pt-2">
                        <div className="font-normal text-gray-500 flex flex-wrap gap-2 justify-between w-full">{
                            typeof bottomText === "object"
                                ? Object.entries(bottomText).map(([key, value]) => (
                                    <span className="font-normal text-gray-500" key={key}>{`${value} `}</span>
                                ))
                                : bottomText
                        }</div>
                    </div>
                </article>
            ))
            }
        </section >
    );
}