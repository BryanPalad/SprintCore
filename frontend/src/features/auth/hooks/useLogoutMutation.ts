import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../api/auth.api";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.setQueryData(
        ["current-user"],
        null,
      );

      navigate("/login", {
        replace: true,
      });
    },

    onError: () => {
      toast.error("Logout failed");
    },
  });
}