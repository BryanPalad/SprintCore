import { api } from "@/lib/api";
import type {
  ProjectTask,
  TaskPriority,
  TaskStatus,
} from "@/features/projects/api/projects.api";

export type CreateTaskPayload = {
  title: string;
  description?: string;
  projectId: number;
  priority: TaskPriority;
};

export type UpdateTaskStatusPayload = {
  taskId: number;
  status: TaskStatus;
  projectId?: number;
};

export async function getTasksByProjectId(projectId: number) {
  const response = await api.get<ProjectTask[]>(`tasks/project/${projectId}`);

  return response.data;
}

export async function createTask(data: CreateTaskPayload) {
  const response = await api.post<ProjectTask>("tasks", data);

  return response.data;
}

export async function updateTaskStatus({
  taskId,
  status,
}: UpdateTaskStatusPayload) {
  const response = await api.patch<ProjectTask>(`tasks/${taskId}/status`, {
    status,
  });

  return response.data;
}

export async function deleteTask(taskId: number) {
  const response = await api.delete(`tasks/${taskId}`);

  return response.data;
}
