import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopbar } from "@/features/dashboard/components/DashboardTopbar";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarWidth = useMemo(() => (isSidebarCollapsed ? "lg:ml-28" : "lg:ml-72"), [isSidebarCollapsed]);

  return (
    <div className="relative min-h-screen overflow-x-hidden stitch-surface">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(77,68,227,0.17),transparent_38%),radial-gradient(circle_at_30%_80%,rgba(49,107,243,0.14),transparent_45%)]" />

      {isSidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}

      <DashboardSidebar
        isSidebarCollapsed={isSidebarCollapsed}
        isSidebarOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      <main className={["relative px-4 pb-6 pt-4 transition-all duration-300 sm:px-6", sidebarWidth].join(" ")}>
        <DashboardTopbar
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleCollapsedSidebar={() => setIsSidebarCollapsed((value) => !value)}
          onToggleMobileSidebar={() => setIsSidebarOpen((value) => !value)}
        />
        <Outlet />
      </main>
    </div>
  );
};
