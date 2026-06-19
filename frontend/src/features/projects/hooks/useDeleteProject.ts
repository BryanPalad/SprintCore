import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../api/projects.api";
import { projectsQueryKey } from "./useProjects";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: projectsQueryKey });
    },
  });
}
