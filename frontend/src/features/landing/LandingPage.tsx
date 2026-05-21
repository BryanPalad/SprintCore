import { Link } from "react-router-dom";
import { featureCards, footerLinks } from "@/features/landing/data";

export function LandingPage() {
  return (
    <main className="overflow-x-hidden bg-background text-[#1b1b24] selection:bg-brand-primary/20">
      <nav className="fixed top-4 left-1/2 z-50 flex w-[calc(100%-48px)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/40 bg-[#fcf8ff]/80 px-6 py-3 shadow-[0_20px_40px_rgba(77,68,227,0.08)] backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold tracking-tight text-brand-primary">SprintCore</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <a className="relative text-sm font-bold text-brand-primary transition-all duration-200 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-brand-secondary hover:scale-105" href="#features">
            Features
          </a>
          <a className="text-sm font-medium text-[#464555] transition-all duration-200 hover:scale-105 hover:text-brand-primary" href="#">
            Docs
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link className="hidden text-sm font-medium text-[#464555] transition-colors hover:text-brand-primary sm:block" to="/login">
            Log In
          </Link>
          <Link
            className="rounded-full bg-brand-primary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand-primary/20 transition-all duration-200 hover:scale-105 active:scale-95"
            to="/register"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <header className="relative flex min-h-screen items-center overflow-hidden px-8 pt-40 pb-32 lg:px-16">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-brand-primary/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-brand-secondary/10 blur-[100px]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1 rounded-full border border-brand-primary/10 bg-brand-primary/10 px-4 py-1 text-brand-primary">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span className="text-sm font-medium tracking-[0.02em]">Next-gen Engineering Intelligence</span>
            </div>
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight md:text-[56px]">
              Accelerate your <br />
              <span className="text-brand-primary italic">engineering workflow</span> <br />
              with precision.
            </h1>
            <p className="max-w-xl text-lg leading-[1.6] text-[#464555]">
              Experience unparalleled glass-morphic clarity and predictive analytics. SprintCore
              synchronizes your personal tech stack into a high-fidelity visual engine designed
              for focused, individual speed.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                className="primary-gradient glow-cyan flex items-center gap-3 rounded-xl px-12 py-4 text-sm font-medium text-white shadow-xl shadow-brand-primary/30 transition-all duration-200 hover:scale-105"
                to="/register"
              >
                Start Free Trial
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <button className="rounded-xl border border-[#c7c4d8]/50 px-12 py-4 text-sm font-medium text-[#1b1b24] transition-all duration-200 hover:bg-[#f0ecf9]" type="button">
                Book a Demo
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="glass-card-soft animate-float relative z-10 rounded-[32px] p-6 shadow-2xl">
              <img
                alt="Dashboard Preview"
                className="h-auto w-full rounded-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsuwr2JiDjUoZ45E-_zh_U9CGGLayJQX6xQznNQfQRBhUpd0GbfYwidzAGXfqcuGHR2LME52pG_iACluktkQ_jxX5oyQC0sjXLCBZHocbTv9gfLdhwc6q3fIO2MhGlOleKhTWwRpdr5pbbgykJHE3T5phFAAR6Xc-zp5vw_LytJs5yO7k_irHWIaR1rjTSEandXQJeQ9Wi5jBY6y6XlDipbaXBSdyQL2NliPTplzT236JUONqcp9CvECKHH0dgvBqf-2lO2gdq4VuQ"
              />
              <div className="glass-card-soft absolute -top-6 -right-6 rounded-2xl border border-white/50 p-4 shadow-xl backdrop-blur-3xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-secondary/20">
                    <span className="material-symbols-outlined text-brand-secondary">trending_up</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">+42% Velocity</p>
                    <p className="text-[10px] text-[#464555]">Last 30 Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-8 py-24 lg:px-16" id="features">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.01em]">Engineering excellence, visualized.</h2>
            <p className="mx-auto max-w-2xl text-base text-[#464555]">
              Built for individual engineers who demand precision. Our toolset integrates
              seamlessly with your local environment while providing deeper insights into your
              personal productivity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="glass-card-soft rounded-[24px] border border-white/20 p-6 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.accentClassName}`}>
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <h3 className="mb-3 text-2xl font-semibold tracking-[-0.01em]">{card.title}</h3>
                <p className="text-base text-[#464555]">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-8 py-24 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card-soft relative overflow-hidden rounded-[40px] border border-white/60 p-12 text-center shadow-[0_40px_80px_rgba(77,68,227,0.12)]">
            <span className="material-symbols-outlined absolute -top-10 -left-10 select-none text-[120px] text-brand-primary/5">
              format_quote
            </span>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img
                  alt="Testimonial User"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoJceK_WcvomC-vVaLQMpeLJPQYKkFT1btUa4IcFXjOpqOo_ffi6HzBUzvyt_7GRXFj8i4PTkbH8S_o94gLz6qQR9TRHsMYtq-mUtfuI-LTQqM5DyygL8n1j8etjN6T5xKyhFpMQ8Jl9S_gs4Q6nOqEr9f7e0rTJLHCn2Q-N9ouOo7BGvkOmv11y48MeN3FvQaJELUprx7Hx16xgoDsC9lg2qB10f8UVoBrq1kkdIEu9MUx4ALMQKgaA_NDLRTcp3c55yfO4ezIcm4"
                />
              </div>
              <p className="text-3xl leading-relaxed font-semibold italic">
                "SprintCore transformed how our engineering department functions. The
                glass-morphic interface isn&apos;t just beautiful-it drastically reduces cognitive
                load during crunch time."
              </p>
              <div>
                <p className="text-sm font-bold text-brand-primary">Alex Chen</p>
                <p className="text-sm text-[#464555]">Lead Engineer at TechFlow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center lg:px-16">
        <div className="primary-gradient glass-card-soft relative mx-auto max-w-4xl overflow-hidden rounded-[32px] p-12 text-white shadow-2xl">
          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl font-bold tracking-[-0.02em]">Join 50,000+ developers</h2>
            <p className="mx-auto max-w-xl text-lg text-white/80">
              Ready to bring precision to your workflow? Start your 14-day free trial today. No
              credit card required.
            </p>
            <div className="pt-4">
              <Link
                className="inline-block rounded-xl bg-white px-12 py-4 text-sm font-bold text-brand-primary shadow-xl shadow-black/10 transition-all duration-200 hover:scale-105"
                to="/register"
              >
                Get Started Now
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/60">Trusted by teams at Google, Meta, and Stripe.</p>
          </div>
        </div>
      </section>

      <footer className="mt-24 w-full rounded-t-[32px] border-t border-[#c7c4d8]/30 bg-[#f5f2ff]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-24 md:flex-row lg:px-16">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <span className="text-2xl font-bold">SprintCore</span>
            <p className="max-w-[300px] text-center text-base text-[#464555] md:text-left">
              © 2024 SprintCore. Engineered for high-velocity teams.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link}
                className="text-sm font-medium text-[#464555] transition-colors hover:text-brand-secondary"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c7c4d8]/30 text-[#464555] transition-all hover:border-brand-primary hover:text-brand-primary"
              href="#"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c7c4d8]/30 text-[#464555] transition-all hover:border-brand-primary hover:text-brand-primary"
              href="#"
            >
              <span className="material-symbols-outlined">forum</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
