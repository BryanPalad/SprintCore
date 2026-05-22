export type SummaryCard = {
  title: string;
  value: string;
  suffix?: string;
  icon: string;
  accentText: string;
  accentClassName: string;
  iconClassName: string;
};

export type ProgressItem = {
  label: string;
  percent: number;
  colorClassName: string;
  textClassName: string;
};

export type KanbanItem = {
  id: string;
  title: string;
  tags: Array<{ label: string; className: string }>;
  footerIcon: string;
  footerIconClassName: string;
  assignees?: string[];
  done?: boolean;
};

export type KanbanColumn = {
  title: string;
  count: number;
  headerClassName: string;
  badgeClassName: string;
  items: KanbanItem[];
};

export const summaryCards: SummaryCard[] = [
  {
    title: "Active Sprints",
    value: "04",
    icon: "rocket_launch",
    accentText: "+2 New",
    accentClassName: "text-secondary",
    iconClassName: "bg-primary-container/20 text-primary",
  },
  {
    title: "Open Issues",
    value: "12",
    icon: "bug_report",
    accentText: "-5 fixed",
    accentClassName: "text-error",
    iconClassName: "bg-error-container/20 text-error",
  },
  {
    title: "Team Velocity",
    value: "42",
    suffix: "pts",
    icon: "bolt",
    accentText: "High",
    accentClassName: "text-secondary",
    iconClassName: "bg-secondary-container/20 text-secondary",
  },
  {
    title: "Days Remaining",
    value: "06",
    icon: "calendar_today",
    accentText: "Sprint End",
    accentClassName: "text-outline",
    iconClassName: "bg-tertiary-container/20 text-tertiary",
  },
];

export const progressItems: ProgressItem[] = [
  {
    label: "API Refactoring",
    percent: 85,
    colorClassName: "bg-primary",
    textClassName: "text-primary",
  },
  {
    label: "UI Design System",
    percent: 40,
    colorClassName: "bg-secondary",
    textClassName: "text-secondary",
  },
];

export const kanbanColumns: KanbanColumn[] = [
  {
    title: "To Do",
    count: 3,
    headerClassName: "bg-surface-container-high/50 text-on-surface-variant",
    badgeClassName: "bg-surface text-outline",
    items: [
      {
        id: "todo-1",
        title: "Update API documentation for v2 endpoints",
        tags: [
          {
            label: "DOCS",
            className: "bg-tertiary-fixed text-on-tertiary-fixed",
          },
        ],
        footerIcon: "chat_bubble_outline",
        footerIconClassName: "text-outline",
        assignees: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA2Fwmophg3NcU-SfKfIDv4ZztDjggmKqw0R3cpnnQuw63GgM-fD_PFPaxoqrQlksiZCVnpEUtYNPS_SeiwRl8VWwb83-Y5PHpAFRe9y_nOBcPA3QvhSPLK8i6gV-rpoiQnX22K151TGtNNWnJ4-KM2h-oOPAAliKus1Bgy1bZwD2CUsmn8LvgTMzDpuGK8rdia6Em94deeH7xl0_w45RtifDenGGzJfc831lE0rXjaSGVaEI9Z-bLPr3IUuG5fjC1uL3qyTUgJ2RvH",
        ],
      },
    ],
  },
  {
    title: "In Progress",
    count: 1,
    headerClassName: "bg-primary-container/10 text-primary border-l-2 border-primary",
    badgeClassName: "bg-primary text-on-primary",
    items: [
      {
        id: "progress-1",
        title: "Implement Webhook authentication layer",
        tags: [
          { label: "CORE", className: "bg-primary-fixed text-on-primary-fixed" },
          { label: "HIGH", className: "bg-error-container text-on-error-container" },
        ],
        footerIcon: "timer",
        footerIconClassName: "text-primary",
        assignees: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB9VYea99tszNcrC7DGMdOaQAL167k9BdU62KdnoFS3a3YTwP641CrjV4qyrI3urEcBM58TRqar4EXwHi5QfhZ9h1SpnNXiwSP_cs28idiWteyaPuJ3D_YkWiVzozOi2jQHPRpN8tnQVtQhT1vYPnkHYjajzMjCjPaIjAozuKV0tDqN6Ca7I84FE3HFxTtNyrpx2jGZdMyEwObh3z7FRLFgxkIi-haiYyWAAZXv5pjeNPaK1XdCY_YaCxmdGiyggyvoW9eCP1spoUO_",
        ],
      },
    ],
  },
  {
    title: "Done",
    count: 8,
    headerClassName: "bg-secondary-container/10 text-secondary",
    badgeClassName: "bg-secondary text-on-secondary",
    items: [
      {
        id: "done-1",
        title: "Fix mobile navigation flickering issue",
        tags: [
          { label: "UI/UX", className: "bg-outline-variant/30 text-outline" },
        ],
        footerIcon: "check_circle",
        footerIconClassName: "text-secondary",
        done: true,
      },
    ],
  },
];

export const activityItems = [
  {
    id: "a1",
    icon: "commit",
    iconClassName: "bg-primary-container text-on-primary-container",
    title: "Dev_Sprint pushed to",
    highlight: "main",
    note: "feat(auth): add jwt rotation logic",
    code: true,
    time: "24 mins ago",
  },
  {
    id: "a2",
    icon: "edit_note",
    iconClassName: "bg-secondary-container text-on-secondary-container",
    title: "Sarah.Dev updated issue",
    highlight: "SC-402",
    note: 'Status changed from "In Progress" to "Quality Assurance"',
    code: false,
    time: "1 hour ago",
  },
  {
    id: "a3",
    icon: "call_merge",
    iconClassName: "bg-tertiary-container text-on-tertiary-container",
    title: "Merge Pull Request",
    highlight: "#124",
    note: "Branch 'hotfix/ui-latency' merged into staging",
    code: false,
    time: "3 hours ago",
  },
  {
    id: "a4",
    icon: "bolt",
    iconClassName: "bg-surface-container-highest text-on-surface-variant",
    title: "Auto-deployment successful",
    highlight: "",
    note: "Preview environment 'alpha-test' is now live.",
    code: false,
    time: "Yesterday",
  },
];
