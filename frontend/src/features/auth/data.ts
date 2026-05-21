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

export const signInSocialProviders: SocialProvider[] = [
  {
    name: "Google",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxnzIFaKCDVWRqXD_MN5L_BOjPS7c2FKdFnO5byTu90hDLAPFSDnz9GX1fXGtJEBe6YXlA7XGPvIvN5zlubt5PwLuQFcoSQB-XHy3nap3zCBZDFoyXfWITWiOJml3WWXeQikgEqZz2mMcR86bQmfcd16Vtp0aFO8wtXBR5P_e-3Pc7MMFBQCfZsuOQ9qZlLV0eoxEr8o_NJQTjidWXpbSkqGa4WAuJnQkc3_lHNnDQ09cLcsHd24jDT2n8E-pa_i6CQhr0mjVSXQVx",
  },
  {
    name: "GitHub",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQQzQ2Dibn9vNagDCS2KcV_yTWCQfZBa_sCUBGnZhBQCb4IqIualeq774Fe_E9jE9SKhVTr6vRpTl8S0s8Vl0Vb6PMZvOyDMNtenEOvwZIrETBg9WRWs_2RWjmajDHXfd-0qfmsSVVnSGHULba7ABlskJyrzNwYk1IaFkAW3y6sioD_O6NxBD3-IX99QtHFsCq0LKgd4DchydhAC1w-RtHChHvFhnGVJ124KJODwu77GzVBpQ9vX6tsNimFlkTdffbjlq3elILhvm",
  },
];

export const registerSocialProviders: SocialProvider[] = [
  {
    name: "Google",
    logoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAwfoNLU2r9rRERVXaqeEe1Zm9e4dDlpgI3bYuvWW87LkfQNAatxBhRUBLMhsaJLau6axmWTTRMRoiy-wvzlITZlX08fipDQm-cR_I_uXuFZePg1G1nNJDdDnKd-gggkQklcVPct-tRjZmUMi4JX_zqbKpFwcbv3XdbwYnwZCffKS6wXwuIxEp1OWAGXGVQEWac-dP-bKFheF5xfeaxqfvBRuTNMdAAHZqJ0M_2dI5SkPqaZxH8bJHPppkP9Y7x4hOtTBzdiuFdG-W",
  },
  { name: "GitHub", icon: "terminal" },
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
