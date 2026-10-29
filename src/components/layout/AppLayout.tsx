import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const status = useAppStore((s) => s.status);
  const error = useAppStore((s) => s.error);
  const loadAll = useAppStore((s) => s.loadAll);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r bg-background lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar (overlay) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 border-r bg-background">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-60">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-7xl p-4 lg:p-8">
          {status === "error" ? (
            <ErrorState message={error} onRetry={loadAll} />
          ) : status === "success" ? (
            <Outlet />
          ) : (
            <PageSkeleton />
          )}
        </main>
      </div>
    </div>
  );
}
