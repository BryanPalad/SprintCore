import { Bolt, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { signInHighlights, signInSocialProviders } from "@/features/auth/data";
import { SocialButton } from "@/features/auth/components/SocialButton";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInFormData } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignInView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <main className="stitch-surface min-h-screen overflow-hidden antialiased">
      <div className="flex min-h-screen flex-col md:flex-row">
        <section className="hero-gradient relative z-10 flex w-full items-center justify-center p-6 md:w-[450px] lg:w-[540px] lg:p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-tertiary shadow-lg shadow-brand-primary/20">
                <Bolt className="h-5 w-5 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-2xl font-bold text-transparent">
                SprintCore
              </h1>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#1b1b24]">
                Welcome back
              </h2>
              <p className="text-base text-[#464555]">
                Access your high-performance engineering dashboard.
              </p>
            </div>

            <div className="glass-panel space-y-6 rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(77,68,227,0.08)]">
              <div className="grid grid-cols-2 gap-4">
                {signInSocialProviders.map((provider) => (
                  <SocialButton
                    key={provider.name}
                    provider={provider}
                    variant="signin"
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-[#c7c4d8]/50" />
                <span className="text-sm font-medium tracking-[0.02em] text-[#777587]">
                  or continue with email
                </span>
                <div className="h-px flex-1 bg-[#c7c4d8]/50" />
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <label
                    className="ml-1 block text-sm font-medium tracking-[0.02em] text-[#464555]"
                    htmlFor="signin-email"
                  >
                    Email Address
                  </label>
                  <Input
                    aria-invalid={Boolean(errors.email)}
                    id="signin-email"
                    leftIcon={<Mail className="h-4 w-4" />}
                    placeholder="name@company.com"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email?.message ? (
                    <p className="text-sm font-medium text-red-600">
                      {errors.email.message}
                    </p>
                  ) : null}

                  <div className="flex items-center justify-between px-1">
                    <label
                      className="text-sm font-medium tracking-[0.02em] text-[#464555]"
                      htmlFor="signin-password"
                    >
                      Password
                    </label>
                    <a
                      className="text-sm font-medium tracking-[0.02em] text-brand-primary transition-colors hover:text-brand-tertiary"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <PasswordInput
                    aria-invalid={Boolean(errors.password)}
                    id="signin-password"
                    leftIcon={<Lock className="h-4 w-4" />}
                    placeholder="●●●●●●●●●●"
                    {...register("password")}
                  />
                  {errors.password?.message ? (
                    <p className="text-sm font-medium text-red-600">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>

                <button
                  className="w-full rounded-xl bg-gradient-to-r from-brand-primary to-brand-tertiary py-4 text-sm font-bold tracking-[0.02em] text-white shadow-lg shadow-brand-primary/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  type="submit"
                >
                  Sign In to SprintCore
                </button>
              </form>

              <p className="text-center text-sm font-medium tracking-[0.02em] text-[#464555]">
                Don&apos;t have an account?{" "}
                <Link
                  className="font-bold text-brand-primary hover:underline"
                  to="/register"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <a
                className="text-sm font-medium tracking-[0.02em] text-[#777587] transition-colors hover:text-[#1b1b24]"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-sm font-medium tracking-[0.02em] text-[#777587] transition-colors hover:text-[#1b1b24]"
                href="#"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </section>

        <section className="relative hidden flex-1 overflow-hidden bg-white md:flex">
          <div className="absolute inset-0 z-0">
            <img
              alt="Abstract futuristic background"
              className="h-full w-full object-cover opacity-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBetKdPtzaj-vSS_gRbdT1lnOi8b8zNNPxhI3NLdIACddvBt6AXtw70hNnjPT3VThRnvoMGmPHnGlbAvl2QnLmWm8uhK70VAIHNCqXJCmeeIog8P516vPmZGdMjTJp686WWpuuErewpEPbJ0afISRHglzeHze64OW0lqDQfUqfbLYcH406fn4j763NJazdqdPpFnSacsO5Oos69LJ7RsXKc1dwQ8zhg0Dcjjs002MoxjgA_l5ERm7ElDBC0dyaiQOEUY4v0aMbFBth3"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-brand-primary/10 via-transparent to-brand-tertiary/10" />
          <div className="grid-pattern absolute inset-0 z-0 opacity-[0.03]" />

          <div className="relative z-10 m-auto max-w-lg p-8">
            <div className="glass-panel space-y-6 rounded-[1.5rem] border border-white/20 p-12 shadow-2xl">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand-primary" />
                  <span className="text-sm font-bold tracking-[0.1em] text-brand-primary uppercase">
                    New Version 2.4
                  </span>
                </div>
                <h3 className="text-[32px] leading-[1.3] font-semibold tracking-[-0.01em] text-[#1b1b24]">
                  Accelerate your workflow with precision.
                </h3>
                <p className="text-lg leading-[1.6] text-[#464555]">
                  Experience the next generation of engineering management.
                  Real-time collaboration, predictive sprint analytics, and
                  glass-morphic interface designed for clarity.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-[#c7c4d8]/30 pt-6">
                {signInHighlights.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div
                      className={`text-2xl font-bold ${item.valueClassName}`}
                    >
                      {item.value}
                    </div>
                    <div className="text-sm font-medium tracking-[0.02em] text-[#777587] uppercase">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-20 right-20 h-64 w-64 animate-pulse rounded-full bg-brand-primary/20 blur-[100px]" />
          <div
            className="absolute bottom-20 left-20 h-96 w-96 animate-pulse rounded-full bg-brand-tertiary/20 blur-[120px]"
            style={{ animationDelay: "2s" }}
          />
        </section>
      </div>
    </main>
  );
}
