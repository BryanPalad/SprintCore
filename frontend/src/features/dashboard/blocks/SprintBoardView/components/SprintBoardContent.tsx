import { DashboardSimplePage } from "@/features/dashboard/components/DashboardSimplePage";

export const SprintBoardContent = () => {
  return (
    <DashboardSimplePage
      description="Simple sprint board view. Work-in-progress cards and lane statuses appear here."
      routeLabel="/dashboard/sprint-board"
      title="Sprint Board"
    />
  );
};
