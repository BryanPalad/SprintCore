import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";

const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;
const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

const parsePositiveInteger = (value: unknown) => {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
};

const isTaskStatus = (value: unknown) => {
  return (
    typeof value === "string" &&
    TASK_STATUSES.includes(value as (typeof TASK_STATUSES)[number])
  );
};

const isTaskPriority = (value: unknown) => {
  return (
    typeof value === "string" &&
    TASK_PRIORITIES.includes(value as (typeof TASK_PRIORITIES)[number])
  );
};

export const getTasksByProject = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { projectId } = req.params;
    const parsedProjectId = parsePositiveInteger(projectId);

    if (!parsedProjectId) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: parsedProjectId,
        ownerId: req.user.userId,
      },
      select: {
        id: true,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId: parsedProjectId,
        project: {
          ownerId: req.user.userId,
        },
      },
      include: {
        assignee: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get tasks", error });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, projectId, priority, dueDate } = req.body;
    const parsedProjectId = parsePositiveInteger(projectId);

    if (!parsedProjectId) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    if (typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Task description must be a string" });
    }

    if (priority !== undefined && !isTaskPriority(priority)) {
      return res.status(400).json({ message: "Invalid task priority" });
    }

    const parsedDueDate =
      dueDate === undefined || dueDate === null || dueDate === ""
        ? null
        : new Date(dueDate);

    if (parsedDueDate && Number.isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ message: "Invalid task due date" });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: parsedProjectId,
        ownerId: req.user.userId,
      },
      select: {
        id: true,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description,
        projectId: parsedProjectId,
        priority,
        dueDate: parsedDueDate,
      },
    });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task", error });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { status } = req.body;
    const taskId = parsePositiveInteger(id);

    if (!taskId) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    if (!isTaskStatus(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const updatedTask = await prisma.task.updateMany({
      where: {
        id: taskId,
        project: {
          ownerId: req.user.userId,
        },
      },
      data: {
        status,
      },
    });

    if (updatedTask.count === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: req.user.userId,
        },
      },
      include: {
        assignee: true,
      },
    });

    return res.json(task);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update task status", error });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const taskId = parsePositiveInteger(id);

    if (!taskId) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: req.user.userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.$transaction([
      prisma.comment.deleteMany({
        where: {
          taskId,
          task: {
            project: {
              ownerId: req.user.userId,
            },
          },
        },
      }),
      prisma.task.delete({
        where: {
          id: taskId,
        },
      }),
    ]);

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task", error });
  }
};
