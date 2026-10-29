import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TrucksPage } from "@/pages/TrucksPage";
import { BillingPage } from "@/pages/BillingPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import AnalyticsPage from "./pages/AnalyticsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: "trucks", element: <TrucksPage /> },
            { path: "analytics", element: <AnalyticsPage /> },
            { path: "billing", element: <BillingPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
