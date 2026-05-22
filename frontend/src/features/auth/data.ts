export type SocialProvider = {
  name: string;
  logoUrl?: string;
  icon?: "terminal";
};

export type Highlight = {
  value: string;
  label: string;
  valueClassName: string;
};

const googleLogoUrl = "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";
const githubLogoUrl = "https://cdn.simpleicons.org/github";

export const signInSocialProviders: SocialProvider[] = [
  {
    name: "Google",
    logoUrl: googleLogoUrl,
  },
  {
    name: "GitHub",
    logoUrl: githubLogoUrl,
  },
];

export const registerSocialProviders: SocialProvider[] = [
  {
    name: "Google",
    logoUrl: googleLogoUrl,
  },
  { name: "GitHub", logoUrl: githubLogoUrl },
];

export const signInHighlights: Highlight[] = [
  { value: "99.9%", label: "Uptime SLA", valueClassName: "text-brand-primary" },
  { value: "10x", label: "Build Speed", valueClassName: "text-brand-tertiary" },
];

export const registerFeatures = [
  {
    icon: "bolt",
    title: "Fast Sync",
    copy: "Real-time updates across your entire stack.",
  },
  {
    icon: "view_kanban",
    title: "Visual Flow",
    copy: "Manage complex backlogs with intuitive drag-and-drop.",
  },
];
