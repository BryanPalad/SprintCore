import { api } from "@/lib/api";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type ProjectTask = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate: string | null;
  projectId: number;
  assigneeId: number | null;
};

export type Project = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  ownerId: number;
  tasks: ProjectTask[];
};

export type CreateProjectPayload = {
  name: string;
  description?: string;
};

export async function getProjects() {
  const response = await api.get<Project[]>("projects");

  return response.data;
}

export async function createProject(data: CreateProjectPayload) {
  const response = await api.post<Project>("projects", data);

  return response.data;
}

export async function deleteProject(projectId: number) {
  const response = await api.delete(`projects/${projectId}`);

  return response.data;
}