import { Link } from "react-router-dom";
import { registerFeatures, registerSocialProviders } from "@/features/auth/data";
import { SocialButton } from "@/features/auth/components/SocialButton";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export function RegisterView() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fcf8ff] text-[#1b1b24]">
      <div className="flex min-h-screen">
        <section className="relative z-10 flex w-full items-center justify-center bg-[#fcf8ff] p-6 lg:w-1/2 lg:p-8">
          <div className="register-mobile-glow pointer-events-none absolute inset-0 opacity-10 lg:hidden" />
          <div className="glass-card w-full max-w-md rounded-xl border border-white/40 p-8 shadow-2xl shadow-brand-primary/5">
            <div className="mb-8 text-center">
              <h1 className="mb-1 text-3xl font-black text-brand-primary">SprintCore</h1>
              <p className="text-base text-[#464555]">Accelerate your engineering workflow</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {registerSocialProviders.map((provider) => (
                  <SocialButton key={provider.name} provider={provider} variant="register" />
                ))}
              </div>

              <div className="flex items-center gap-4 py-3">
                <div className="h-px grow bg-[#c7c4d8]/50" />
                <span className="text-[10px] font-medium tracking-[0.12em] text-[#777587] uppercase">
                  or email
                </span>
                <div className="h-px grow bg-[#c7c4d8]/50" />
              </div>

              <form className="space-y-4">
                <Field label="Full Name" id="register-name" icon="person" placeholder="John Doe" type="text" />
                <Field
                  label="Work Email"
                  id="register-email"
                  icon="mail"
                  placeholder="john@company.com"
                  type="email"
                />
                <Field
                  label="Password"
                  id="register-password"
                  icon="lock"
                  placeholder="Min. 8 characters"
                  isPassword
                />

                <div className="flex items-start gap-3 pt-1">
                  <input
                    className="mt-1 rounded border-[#c7c4d8] text-brand-primary focus:ring-brand-primary"
                    id="terms"
                    type="checkbox"
                  />
                  <label className="text-sm leading-tight text-[#464555]" htmlFor="terms">
                    I agree to the <a className="text-brand-primary hover:underline" href="#">Terms of Service</a> and{" "}
                    <a className="text-brand-primary hover:underline" href="#">Privacy Policy</a>.
                  </label>
                </div>

                <button
                  className="mt-4 w-full rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  type="submit"
                >
                  Create Account
                </button>
              </form>

              <p className="pt-4 text-center text-base text-[#464555]">
                Already have an account?{" "}
                <Link className="font-bold text-brand-primary hover:underline" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="register-gradient-bg relative hidden w-1/2 items-center justify-center overflow-hidden lg:flex">
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute bottom-[-5%] left-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-400/20 blur-[80px]" />

          <div className="relative z-10 max-w-xl p-12 text-white">
            <div className="mb-6">
              <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-md">
                Release v2.4
              </span>
              <h2 className="mb-4 text-5xl leading-tight font-bold tracking-[-0.02em]">
                The engine behind high-performance teams.
              </h2>
              <p className="text-lg text-white/80">
                Experience the next generation of project management. Built for engineers, by
                engineers, with glassmorphic clarity and precision control.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {registerFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="glass-card rounded-xl border border-white/20 bg-white/5 p-4"
                >
                  <span className="material-symbols-outlined mb-3 text-cyan-300">{feature.icon}</span>
                  <h4 className="mb-1 text-sm font-semibold">{feature.title}</h4>
                  <p className="text-sm text-white/60">{feature.copy}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-12">
              <div className="absolute -inset-4 rounded-2xl bg-white/10 blur-xl" />
              <div className="glass-card relative overflow-hidden rounded-xl border border-white/30 shadow-2xl">
                <img
                  alt="Dashboard preview"
                  className="h-48 w-full object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtsHSf0ZeixL7DVnP5JwXy6g1T5Ko5TZN_nVp-mb29FFH5PzZuqfl3SaQOmYrkeRUhtey0XVzaZPTgRZtKciJdJBYtZqgQVaItWfbbpSfjFsdstqMrmyJ-TfaQFDWWVLmtqn_CoSfkwN1ZXUhmAMP474Ytr8KD6lsA5Q5kJdvngkT5lWhcGBvm9Ngp-FiL5n16RdtGGV6DVRZE1uIYBtJUYHnmsC6wILkWjbOccgvqBF1eKnV8hBKl5SqL-3l2b7zVlOazCRDaJxLd"
                />
                <div className="flex items-center justify-between bg-white/10 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary">
                      <span className="material-symbols-outlined text-sm text-white">deployed_code</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">System Health</p>
                      <p className="text-[10px] text-white/60">99.9% Uptime Verified</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                    <div className="h-2 w-2 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-10 bottom-10 flex h-32 w-32 rotate-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[64px] text-white/30">token</span>
          </div>
        </section>
      </div>
    </main>
  );
}

type FieldProps = {
  label: string;
  id: string;
  icon: string;
  placeholder: string;
  type?: string;
  isPassword?: boolean;
};

function Field({ label, id, icon, placeholder, type = "text", isPassword = false }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="ml-1 text-sm font-medium tracking-[0.02em] text-[#464555]" htmlFor={id}>
        {label}
      </label>
      {isPassword ? (
        <PasswordInput
          className="rounded-lg border-[#c7c4d8] bg-[#f0ecf9]/50 focus:ring-2 focus:ring-brand-primary/20"
          id={id}
          leftIcon={<span className="material-symbols-outlined text-[20px]">{icon}</span>}
          placeholder={placeholder}
        />
      ) : (
        <Input
          className="rounded-lg border-[#c7c4d8] bg-[#f0ecf9]/50 focus:ring-2 focus:ring-brand-primary/20"
          id={id}
          leftIcon={<span className="material-symbols-outlined text-[20px]">{icon}</span>}
          placeholder={placeholder}
          type={type}
        />
      )}
    </div>
  );
}
