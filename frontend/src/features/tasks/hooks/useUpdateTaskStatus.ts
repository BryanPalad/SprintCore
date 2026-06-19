import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "../api/tasks.api";
import { tasksByProjectQueryKey } from "./useTasksByProject";

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (_task, variables) => {
      void queryClient.invalidateQueries({
        queryKey: variables.projectId
          ? [...tasksByProjectQueryKey, variables.projectId]
          : tasksByProjectQueryKey,
      });
    },
  });
}
