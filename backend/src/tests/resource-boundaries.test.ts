import type { Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AuthRequest } from "../middleware/auth.middleware.js";

const prismaMock = vi.hoisted(() => ({
  project: {
    findFirst: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
  task: {
    findMany: vi.fn(),
    create: vi.fn(),
    updateMany: vi.fn(),
    findFirst: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
  },
  comment: {
    deleteMany: vi.fn(),
  },
  $transaction: vi.fn(),
}));

vi.mock("../config/prisma.js", () => ({
  prisma: prismaMock,
}));

const { createProject, deleteProject } = await import(
  "../controllers/project.controller.js"
);
const {
  createTask,
  deleteTask,
  getTasksByProject,
  updateTaskStatus,
} = await import("../controllers/task.controller.js");

function createResponse() {
  const status = vi.fn();
  const json = vi.fn();
  const response = {
    status,
    json,
  };

  status.mockReturnValue(response);

  return response;
}

function createAuthRequest(
  overrides: Partial<AuthRequest> = {},
): AuthRequest {
  return {
    body: {},
    cookies: {},
    params: {},
    user: {
      email: "owner@example.com",
      userId: 1,
    },
    ...overrides,
  } as AuthRequest;
}

describe("resource ownership boundaries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not list tasks for a project the user does not own", async () => {
    prismaMock.project.findFirst.mockResolvedValue(null);

    const req = createAuthRequest({ params: { projectId: "10" } });
    const res = createResponse();

    await getTasksByProject(req, res as unknown as Response);

    expect(prismaMock.project.findFirst).toHaveBeenCalledWith({
      where: {
        id: 10,
        ownerId: 1,
      },
      select: {
        id: true,
      },
    });
    expect(prismaMock.task.findMany).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Project not found" });
  });

  it("rejects project creation without a valid name", async () => {
    const req = createAuthRequest({
      body: {
        name: "   ",
      },
    });
    const res = createResponse();

    await createProject(req, res as unknown as Response);

    expect(prismaMock.project.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Project name is required",
    });
  });

  it("rejects project deletion with an invalid id", async () => {
    const req = createAuthRequest({ params: { id: "abc" } });
    const res = createResponse();

    await deleteProject(req, res as unknown as Response);

    expect(prismaMock.project.findFirst).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid project id",
    });
  });

  it("does not create a task in a project the user does not own", async () => {
    prismaMock.project.findFirst.mockResolvedValue(null);

    const req = createAuthRequest({
      body: {
        projectId: 10,
        title: "Build scoped API",
      },
    });
    const res = createResponse();

    await createTask(req, res as unknown as Response);

    expect(prismaMock.project.findFirst).toHaveBeenCalledWith({
      where: {
        id: 10,
        ownerId: 1,
      },
      select: {
        id: true,
      },
    });
    expect(prismaMock.task.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("rejects task creation with invalid input before checking ownership", async () => {
    const req = createAuthRequest({
      body: {
        priority: "URGENT",
        projectId: "abc",
        title: "",
      },
    });
    const res = createResponse();

    await createTask(req, res as unknown as Response);

    expect(prismaMock.project.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.task.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid project id",
    });
  });

  it("rejects task creation with an invalid priority", async () => {
    const req = createAuthRequest({
      body: {
        priority: "URGENT",
        projectId: 10,
        title: "Build scoped API",
      },
    });
    const res = createResponse();

    await createTask(req, res as unknown as Response);

    expect(prismaMock.project.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.task.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid task priority",
    });
  });

  it("rejects task creation with an invalid due date", async () => {
    const req = createAuthRequest({
      body: {
        dueDate: "not-a-date",
        projectId: 10,
        title: "Build scoped API",
      },
    });
    const res = createResponse();

    await createTask(req, res as unknown as Response);

    expect(prismaMock.project.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.task.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid task due date",
    });
  });

  it("scopes task status updates through the owning project", async () => {
    prismaMock.task.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.task.findFirst.mockResolvedValue({
      id: 20,
      status: "DONE",
      title: "Finish boundary checks",
    });

    const req = createAuthRequest({
      body: {
        status: "DONE",
      },
      params: {
        id: "20",
      },
    });
    const res = createResponse();

    await updateTaskStatus(req, res as unknown as Response);

    expect(prismaMock.task.updateMany).toHaveBeenCalledWith({
      where: {
        id: 20,
        project: {
          ownerId: 1,
        },
      },
      data: {
        status: "DONE",
      },
    });
    expect(res.json).toHaveBeenCalledWith({
      id: 20,
      status: "DONE",
      title: "Finish boundary checks",
    });
  });

  it("rejects task status updates with an invalid status", async () => {
    const req = createAuthRequest({
      body: {
        status: "BLOCKED",
      },
      params: {
        id: "20",
      },
    });
    const res = createResponse();

    await updateTaskStatus(req, res as unknown as Response);

    expect(prismaMock.task.updateMany).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid task status",
    });
  });

  it("rejects task deletion with an invalid id", async () => {
    const req = createAuthRequest({ params: { id: "abc" } });
    const res = createResponse();

    await deleteTask(req, res as unknown as Response);

    expect(prismaMock.task.findFirst).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid task id",
    });
  });

  it("does not delete a task the user does not own", async () => {
    prismaMock.task.findFirst.mockResolvedValue(null);

    const req = createAuthRequest({ params: { id: "20" } });
    const res = createResponse();

    await deleteTask(req, res as unknown as Response);

    expect(prismaMock.task.findFirst).toHaveBeenCalledWith({
      where: {
        id: 20,
        project: {
          ownerId: 1,
        },
      },
      select: {
        id: true,
      },
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("does not delete a project the user does not own", async () => {
    prismaMock.project.findFirst.mockResolvedValue(null);

    const req = createAuthRequest({ params: { id: "10" } });
    const res = createResponse();

    await deleteProject(req, res as unknown as Response);

    expect(prismaMock.project.findFirst).toHaveBeenCalledWith({
      where: {
        id: 10,
        ownerId: 1,
      },
      select: {
        id: true,
      },
    });
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
