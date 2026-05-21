export type FeatureCardData = {
  icon: string;
  title: string;
  description: string;
  accentClassName: string;
};

export const featureCards: FeatureCardData[] = [
  {
    icon: "sync",
    title: "Real-time Sync",
    description:
      "Instant bidirectional synchronization across all your development environments and project management tools.",
    accentClassName: "bg-primary/10 text-primary",
  },
  {
    icon: "analytics",
    title: "Predictive Sprints",
    description:
      "AI-driven estimation that learns from your team's historical velocity to forecast delivery dates with 98% accuracy.",
    accentClassName: "bg-tertiary/10 text-tertiary",
  },
  {
    icon: "security",
    title: "Advanced Security",
    description:
      "Enterprise-grade encryption and automated compliance checks integrated directly into your workflow.",
    accentClassName: "bg-secondary/10 text-secondary",
  },
  {
    icon: "hub",
    title: "Social Integration",
    description:
      "Collaborative features that bring code discussions directly into the context of your project timeline.",
    accentClassName: "bg-primary/10 text-primary",
  },
  {
    icon: "terminal",
    title: "CI/CD Pipelines",
    description:
      "Visualize deployment status and identify bottlenecks with integrated CI/CD monitoring dashboards.",
    accentClassName: "bg-tertiary/10 text-tertiary",
  },
  {
    icon: "bar_chart",
    title: "Team Analytics",
    description:
      "Deep-dive metrics into team health, individual contribution patterns, and overall sprint health.",
    accentClassName: "bg-secondary/10 text-secondary",
  },
];

export const footerLinks = ["Privacy Policy", "Terms of Service", "Security", "System Status"];
