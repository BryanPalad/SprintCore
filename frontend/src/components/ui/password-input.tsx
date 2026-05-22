import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  leftIcon?: React.ReactNode;
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, leftIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="group relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand-neutral transition-colors group-focus-within:text-brand-primary">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          data-slot="password-input"
          className={cn(
            "glow-input flex h-12 w-full rounded-xl border border-border bg-white/50 px-4 py-3 text-foreground outline-none transition-all placeholder:text-[#777587] focus:border-brand-primary focus:bg-white aria-[invalid=true]:border-red-500",
            leftIcon ? "pl-12" : "",
            "pr-12",
            className,
          )}
          {...props}
        />
        <button
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-brand-neutral transition-colors hover:text-brand-primary"
          onClick={() => setShowPassword((prev) => !prev)}
          type="button"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
