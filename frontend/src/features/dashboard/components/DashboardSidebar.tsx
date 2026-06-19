import { bottomNavItems, navItems } from "@/features/dashboard/constants";
import { ConfirmationModal } from "@/components/shared/ConfirmationModal";
import { useLogoutMutation } from "@/features/auth/hooks/useLogoutMutation";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type DashboardSidebarProps = {
  isSidebarCollapsed: boolean;
  isSidebarOpen: boolean;
  onNavigate?: () => void;
};

export const DashboardSidebar = ({ isSidebarCollapsed, isSidebarOpen, onNavigate }: DashboardSidebarProps) => {
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setIsLogoutConfirmationOpen(false);
        onNavigate?.();
      },
    });
  };

  return (
    <>
      <aside
        className={[
          "fixed left-4 top-4 z-50 flex h-[calc(100vh-2rem)] flex-col rounded-3xl border border-white/35 bg-white/70 p-4 shadow-2xl shadow-brand-primary/10 backdrop-blur-2xl transition-all duration-300",
          isSidebarCollapsed ? "w-20" : "w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="mb-10 flex items-center gap-3 px-1">
          <div className="grid h-11 w-11 place-items-center rounded-2xl primary-gradient text-white shadow-lg shadow-brand-primary/20">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
              terminal
            </span>
          </div>
          {!isSidebarCollapsed && (
            <div>
              <h1 className="text-xl font-black tracking-tight text-brand-primary">SprintCore</h1>
              <p className="text-xs font-medium text-brand-neutral">Engineering v2.4</p>
            </div>
          )}
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                [
                  "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all",
                  isActive
                    ? "bg-brand-primary/15 text-brand-primary shadow-sm"
                    : "text-slate-600 hover:bg-white/70 hover:text-brand-primary",
                  isSidebarCollapsed ? "justify-center" : "",
                ].join(" ")
              }
              key={item.label}
              end={item.href === "/dashboard"}
              onClick={onNavigate}
              to={item.href}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button
          className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition hover:scale-[1.015]"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          {!isSidebarCollapsed && <span>New Issue</span>}
        </button>

        <div className="mt-auto space-y-1">
          {bottomNavItems.map((item) => (
            <button
              className={[
                "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-all hover:bg-white/70 hover:text-brand-primary",
                isSidebarCollapsed ? "justify-center" : "",
              ].join(" ")}
              key={item.label}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}

          <button
            className={[
              "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition-all hover:bg-white/70 hover:text-brand-primary",
              isSidebarCollapsed ? "justify-center" : "",
            ].join(" ")}
            disabled={isLoggingOut}
            onClick={() => setIsLogoutConfirmationOpen(true)}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <ConfirmationModal
        confirmLabel="Logout"
        description="You will be signed out of your SprintCore account."
        isConfirming={isLoggingOut}
        isOpen={isLogoutConfirmationOpen}
        onCancel={() => setIsLogoutConfirmationOpen(false)}
        onConfirm={handleLogout}
        title="Logout?"
      />
    </>
  );
};
