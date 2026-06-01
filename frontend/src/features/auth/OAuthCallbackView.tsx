import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Bolt } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { getCurrentUser } from "./api/auth.api";

export function OAuthCallbackView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    if (hasHandledCallback.current) {
      return;
    }

    hasHandledCallback.current = true;

    const completeOAuthSignIn = async () => {
      try {
        await queryClient.fetchQuery({
          queryKey: ["currentUser"],
          queryFn: getCurrentUser,
          retry: false,
        });

        toast.success("Successfully signed in");
        navigate("/dashboard", { replace: true });
      } catch {
        toast.error("OAuth sign-in failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };

    void completeOAuthSignIn();
  }, [navigate, queryClient, toast]);

  return (
    <main className="stitch-surface flex min-h-screen items-center justify-center px-6 text-[#464555] antialiased">
      <div className="glass-panel flex w-full max-w-md flex-col items-center gap-5 rounded-3xl p-10 text-center shadow-[0_32px_64px_-16px_rgba(77,68,227,0.08)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-tertiary shadow-lg shadow-brand-primary/20">
          <Bolt className="h-6 w-6 text-white" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-[-0.01em] text-[#1b1b24]">
            Finishing secure sign-in
          </h1>
          <p className="text-sm text-[#464555]">Verifying your account and loading your workspace.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand-primary [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand-secondary [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand-tertiary" />
        </div>
      </div>
    </main>
  );
}
