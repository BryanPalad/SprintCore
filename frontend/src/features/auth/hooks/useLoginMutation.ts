import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";

export function useLoginMutation() {
    return useMutation({
        mutationFn: loginUser
    })
}