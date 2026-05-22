import { activityItems } from "@/features/dashboard/data";

export const ActivityFeed = () => {
  return (
    <section className="glass-panel h-fit rounded-3xl p-6">
      <h4 className="mb-5 text-2xl font-bold text-slate-900">Activity Feed</h4>
      <div className="relative space-y-6 before:absolute before:bottom-0 before:left-[10px] before:top-2 before:w-px before:bg-slate-300/70 before:content-['']">
        {activityItems.map((item) => (
          <article className="relative pl-8" key={item.id}>
            <div className={["absolute left-0 top-1 grid h-5 w-5 place-items-center rounded-full text-[11px]", item.iconClassName].join(" ")}>
              <span className="material-symbols-outlined text-[12px]">{item.icon}</span>
            </div>
            <p className="text-sm font-bold text-slate-800">
              {item.title} {item.highlight && <span className="text-brand-primary">{item.highlight}</span>}
            </p>
            {item.code ? (
              <p className="mt-1 rounded-md border border-slate-200 bg-white/80 px-2 py-1 font-mono text-xs text-slate-600">{item.note}</p>
            ) : (
              <p className="mt-1 text-sm text-brand-neutral">{item.note}</p>
            )}
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-brand-neutral">{item.time}</span>
          </article>
        ))}
      </div>
      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold text-brand-neutral transition hover:bg-slate-100/70 hover:text-brand-primary" type="button">
        View Full History <span className="material-symbols-outlined text-sm">history</span>
      </button>
    </section>
  );
};
