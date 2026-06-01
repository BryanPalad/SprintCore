import type { SocialProvider } from "@/features/auth/data";

type SocialButtonProps = {
  provider: SocialProvider;
  variant: "signin" | "register";
  onClick?: () => void;
  disabled?: boolean;
};

export function SocialButton({ provider, variant, onClick, disabled = false }: SocialButtonProps) {
  const baseClassName =
    variant === "signin"
      ? "group flex items-center justify-center gap-3 rounded-xl border border-border bg-white/50 px-4 py-3 transition-all duration-300 hover:border-brand-primary/30 hover:bg-white"
      : "group flex items-center justify-center gap-3 rounded-lg border border-[#c7c4d8]/30 bg-[#f5f2ff] px-4 py-3 transition-all duration-300 hover:bg-[#eae6f4]";

  return (
    <button
      className={`${baseClassName} cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {provider.logoUrl ? (
        <img
          alt={`${provider.name} logo`}
          className="h-5 w-5 grayscale transition-all group-hover:grayscale-0"
          src={provider.logoUrl}
        />
      ) : (
        <span className="material-symbols-outlined text-[20px] text-[#1b1b24]">{provider.icon}</span>
      )}
      <span className="text-sm font-medium tracking-[0.02em] text-[#464555] group-hover:text-foreground">
        {provider.name}
      </span>
    </button>
  );
}
