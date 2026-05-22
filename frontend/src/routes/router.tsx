import { createBrowserRouter, Navigate } from "react-router-dom";
import { RegisterView } from "@/features/auth/RegisterView";
import { SignInView } from "@/features/auth/SignInView";
import { DashboardView } from "@/features/dashboard/DashboardView";
import { LandingPage } from "@/features/landing/LandingPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SignInView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    // All children here require a valid cookie-backed session.
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardView />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
]);
