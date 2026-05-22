type DashboardSimplePageProps = {
  title: string;
  description: string;
  routeLabel: string;
};

export const DashboardSimplePage = ({ title, description, routeLabel }: DashboardSimplePageProps) => {
  return (
    <section className="glass-panel rounded-3xl p-8">
      <h2 className="text-3xl font-black tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-brand-neutral sm:text-base">{description}</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Placeholder Content</h3>
          <p className="mt-1 text-sm text-brand-neutral">Use this route to plug in the full module later.</p>
        </article>
        <article className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Current Route</h3>
          <p className="mt-1 font-mono text-sm text-brand-primary">{routeLabel}</p>
        </article>
      </div>
    </section>
  );
};
