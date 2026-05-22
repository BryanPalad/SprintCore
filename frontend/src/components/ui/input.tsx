import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftIcon, ...props }, ref) => {
    return (
      <div className="group relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand-neutral transition-colors group-focus-within:text-brand-primary">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "glow-input flex h-12 w-full rounded-xl border border-border bg-white/50 px-4 py-3 text-foreground outline-none transition-all placeholder:text-[#777587] focus:border-brand-primary focus:bg-white aria-[invalid=true]:border-red-500",
            leftIcon ? "pl-12" : "",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
