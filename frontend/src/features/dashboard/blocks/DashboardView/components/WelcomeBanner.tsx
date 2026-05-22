export const WelcomeBanner = () => {
  return (
    <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary via-brand-secondary to-cyan-500 p-8 text-white shadow-2xl shadow-brand-primary/25">
      <div className="absolute -right-24 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl" />
      <h2 className="relative text-3xl font-black tracking-tight sm:text-4xl">Good morning, Developer</h2>
      <p className="relative mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
        Your current sprint "Orion-Alpha" is 72% complete. Team velocity is up by 12% this week. Keep up the
        momentum.
      </p>
    </section>
  );
};
