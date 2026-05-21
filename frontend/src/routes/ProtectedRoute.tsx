import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export function ProtectedRoute() {
  const { data: user, isLoading, isError } = useCurrentUser();

  // Wait for /auth/me before deciding access.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#464555]">
        Loading...
      </div>
    );
  }

  // Any auth failure falls back to login.
  if (isError || !user) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
}
