import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/tasks.api";
import { tasksByProjectQueryKey } from "./useTasksByProject";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksByProjectQueryKey });
    },
  });
}
