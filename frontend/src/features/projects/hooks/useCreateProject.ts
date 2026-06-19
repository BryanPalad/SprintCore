import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/projects.api";
import { projectsQueryKey } from "./useProjects";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: projectsQueryKey });
    },
  });
}
