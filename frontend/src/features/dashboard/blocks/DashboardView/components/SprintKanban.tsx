import { kanbanColumns } from "@/features/dashboard/data";

export const SprintKanban = () => {
  return (
    <section>
      <h4 className="mb-3 text-2xl font-bold text-slate-900">Sprint Kanban</h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {kanbanColumns.map((column) => (
          <article className="space-y-3" key={column.title}>
            <div className={["flex items-center justify-between rounded-xl px-3 py-2", column.headerClassName].join(" ")}>
              <span className="text-xs font-bold uppercase tracking-wider">{column.title}</span>
              <span className={["rounded px-2 py-0.5 text-[10px] font-bold", column.badgeClassName].join(" ")}>
                {column.count}
              </span>
            </div>

            {column.items.map((item) => (
              <div className="glass-panel rounded-2xl p-4 transition hover:shadow-md" key={item.id}>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span className={["rounded px-2 py-0.5 text-[10px] font-bold", tag.className].join(" ")} key={tag.label}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <p className={["text-sm text-slate-800", item.done ? "line-through opacity-80" : ""].join(" ")}>
                  {item.title}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200/80 pt-3">
                  <div className="flex -space-x-2">
                    {item.assignees?.map((assignee) => (
                      <img className="h-6 w-6 rounded-full border-2 border-white" key={assignee} src={assignee} />
                    ))}
                  </div>
                  <span className={["material-symbols-outlined text-lg", item.footerIconClassName].join(" ")}>{item.footerIcon}</span>
                </div>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
};
