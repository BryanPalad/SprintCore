import { useQuery } from "@tanstack/react-query";
import { getTasksByProjectId } from "../api/tasks.api";

export const tasksByProjectQueryKey = ["tasksByProject"] as const;

export function useTasksByProject(projectId: number) {
    return useQuery({
        queryKey: [...tasksByProjectQueryKey, projectId],
        queryFn: () => getTasksByProjectId(projectId),
    });
}