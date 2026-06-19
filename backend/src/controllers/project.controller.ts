import type { Response } from "express";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

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

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const projects = await prisma.project.findMany({
      where: {
        ownerId: req.user.userId,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get projects", error });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, description } = req.body;

    if (typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ message: "Project name is required" });
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Project description must be a string" });
    }

    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        description,
        ownerId: req.user.userId,
      },
    });
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project", error });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const projectId = parsePositiveInteger(id);

    if (!projectId) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: req.user.userId,
      },
      select: {
        id: true,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await prisma.$transaction([
      prisma.comment.deleteMany({
        where: {
          task: {
            projectId,
            project: {
              ownerId: req.user.userId,
            },
          },
        },
      }),
      prisma.task.deleteMany({
        where: {
          projectId,
          project: {
            ownerId: req.user.userId,
          },
        },
      }),
      prisma.project.delete({
        where: { id: projectId },
      }),
    ]);

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete project", error });
  }
};
