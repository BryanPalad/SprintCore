import { summaryCards } from "@/features/dashboard/data";

export const SummaryCardsGrid = () => {
  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => (
        <article className="glass-panel rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg" key={card.title}>
          <div className="mb-4 flex items-start justify-between">
            <span className={["material-symbols-outlined rounded-xl p-2.5", card.iconClassName].join(" ")}>{card.icon}</span>
            <span className={["text-xs font-semibold", card.accentClassName].join(" ")}>{card.accentText}</span>
          </div>
          <p className="text-sm text-brand-neutral">{card.title}</p>
          <h3 className="mt-1 text-3xl font-bold text-slate-900">
            {card.value}
            {card.suffix && <span className="ml-1 text-sm font-medium text-brand-neutral">{card.suffix}</span>}
          </h3>
        </article>
      ))}
    </section>
  );
};
