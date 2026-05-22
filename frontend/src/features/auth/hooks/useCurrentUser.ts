import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.api";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
}
