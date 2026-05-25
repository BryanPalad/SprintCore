import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "@/routes/router";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </>
  );
}
