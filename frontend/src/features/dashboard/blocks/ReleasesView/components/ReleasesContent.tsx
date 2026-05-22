import { DashboardSimplePage } from "@/features/dashboard/components/DashboardSimplePage";

export const ReleasesContent = () => {
  return (
    <DashboardSimplePage
      description="Simple releases view. Upcoming versions, release notes, and rollout status live here."
      routeLabel="/dashboard/releases"
      title="Releases"
    />
  );
};
