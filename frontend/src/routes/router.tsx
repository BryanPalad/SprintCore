import { createBrowserRouter, Navigate } from "react-router-dom";
import { RegisterView } from "@/features/auth/RegisterView";
import { SignInView } from "@/features/auth/SignInView";
import { OAuthCallbackView } from "@/features/auth/OAuthCallbackView";
import { BacklogView } from "@/features/dashboard/BacklogView";
import { DashboardLayout } from "@/features/dashboard/DashboardLayout";
import { DashboardView } from "@/features/dashboard/DashboardView";
import { ReleasesView } from "@/features/dashboard/ReleasesView";
import { SprintBoardView } from "@/features/dashboard/SprintBoardView";
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
    path: "/oauth/callback",
    element: <OAuthCallbackView />,
  },
  {
    // All children here require a valid cookie-backed session.
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardView />,
          },
          {
            path: "backlog",
            element: <BacklogView />,
          },
          {
            path: "sprint-board",
            element: <SprintBoardView />,
          },
          {
            path: "releases",
            element: <ReleasesView />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
]);
