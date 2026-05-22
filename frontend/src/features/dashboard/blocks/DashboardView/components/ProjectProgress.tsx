import { progressItems } from "@/features/dashboard/data";

export const ProjectProgress = () => {
  return (
    <section className="glass-panel rounded-3xl p-6">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-bold text-slate-900">Project Progress</h4>
          <p className="text-sm text-brand-neutral">Overview of current milestones</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-semibold text-brand-primary" type="button">
          View Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      <div className="space-y-5">
        {progressItems.map((item) => (
          <div className="space-y-1.5" key={item.label}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-slate-800">{item.label}</span>
              <span className={item.textClassName}>{item.percent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/70">
              <div className={["h-full rounded-full", item.colorClassName].join(" ")} style={{ width: `${item.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
