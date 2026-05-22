import { ActivityFeed } from "@/features/dashboard/blocks/DashboardView/components/ActivityFeed";
import { ProjectProgress } from "@/features/dashboard/blocks/DashboardView/components/ProjectProgress";
import { SprintKanban } from "@/features/dashboard/blocks/DashboardView/components/SprintKanban";
import { SummaryCardsGrid } from "@/features/dashboard/blocks/DashboardView/components/SummaryCardsGrid";
import { WelcomeBanner } from "@/features/dashboard/blocks/DashboardView/components/WelcomeBanner";

export const DashboardView = () => {
  return (
    <>
      <WelcomeBanner />
      <SummaryCardsGrid />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <ProjectProgress />
          <SprintKanban />
        </div>
        <ActivityFeed />
      </div>
    </>
  );
};
