import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterView } from "@/features/auth/RegisterView";
import { SignInView } from "@/features/auth/SignInView";
import { LandingPage } from "@/features/landing/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<SignInView />} path="/login" />
      <Route element={<RegisterView />} path="/register" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}
