import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth.api";

export function useRegisterMutation(){
    return useMutation({
        mutationFn: registerUser
    })
}