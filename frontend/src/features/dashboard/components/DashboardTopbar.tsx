import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

type DashboardTopbarProps = {
  isSidebarCollapsed: boolean;
  onToggleMobileSidebar: () => void;
  onToggleCollapsedSidebar: () => void;
};

export const DashboardTopbar = ({
  isSidebarCollapsed,
  onToggleMobileSidebar,
  onToggleCollapsedSidebar,
}: DashboardTopbarProps) => {
  const { data: currentUser } = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <header className="sticky top-4 z-30 mb-7 flex items-center justify-between gap-3 rounded-2xl border border-white/35 bg-white/75 px-4 py-3 shadow-lg shadow-brand-primary/10 backdrop-blur-xl sm:px-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          aria-label="Toggle sidebar"
          className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-200/50 lg:hidden"
          onClick={onToggleMobileSidebar}
          type="button"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <button
          aria-label="Collapse sidebar"
          className="hidden h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-200/50 lg:grid"
          onClick={onToggleCollapsedSidebar}
          type="button"
        >
          <span className="material-symbols-outlined">
            {isSidebarCollapsed ? "left_panel_open" : "left_panel_close"}
          </span>
        </button>

        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 md:flex">
          <span className="material-symbols-outlined text-base text-slate-400">search</span>
          <input
            className="glow-input w-64 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            placeholder="Search project logs..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-200/50" type="button">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-200/50" type="button">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
        <div className="hidden h-7 w-px bg-slate-300/70 sm:block" />
        <button className="flex items-center gap-2 rounded-xl p-1 pr-2 transition hover:bg-slate-200/50" type="button">
          <img
            alt="User avatar"
            className="h-8 w-8 rounded-full border border-brand-primary/30"
            src={currentUser.user.avatarUrl ?? ""}
          />
          <span className="hidden text-sm font-semibold text-brand-primary sm:inline">{currentUser.user.name}</span>
        </button>
      </div>
    </header>
  );
};
