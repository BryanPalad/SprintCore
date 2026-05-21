import type { Response } from "express";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

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
    const { name, description } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: req.user!.userId,
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

    await prisma.task.deleteMany({
      where: { projectId: Number(id) },
    })

    await prisma.project.delete({
      where: { id: Number(id) },
    });
    
    return res.json({ message: "Project deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Failed to delete project", error });
  }
}