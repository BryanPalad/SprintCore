import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { prisma } from "../config/prisma.js";

export const getTasksByProject = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { projectId } = req.params;

    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
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

    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId: Number(projectId),
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
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

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
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

    await prisma.task.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task", error });
  }
};
