import { DashboardSimplePage } from "@/features/dashboard/components/DashboardSimplePage";

export const BacklogContent = () => {
  return (
    <DashboardSimplePage
      description="Simple backlog view. Prioritized issues and feature requests are listed here."
      routeLabel="/dashboard/backlog"
      title="Backlog"
    />
  );
};
