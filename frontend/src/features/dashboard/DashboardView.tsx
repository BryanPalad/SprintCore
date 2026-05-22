import { useLogoutMutation } from "../auth/hooks/useLogoutMutation";

export function DashboardView() {
  const logoutMutation = useLogoutMutation();

  return (
    <main className="stitch-surface min-h-screen p-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-white/70 p-8">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-2 text-[#464555]">You are signed in.</p>
        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="cursor-pointer mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          {logoutMutation.isPending ? "Signing out..." : "Logout"}
        </button>
      </div>
    </main>
  );
}
