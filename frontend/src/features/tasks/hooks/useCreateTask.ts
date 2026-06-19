import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks.api";
import { tasksByProjectQueryKey } from "./useTasksByProject";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksByProjectQueryKey });
    },
  });
}
