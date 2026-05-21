import { Router } from "express";
import { getProjects, createProject, deleteProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getProjects);
router.post("/", authMiddleware, createProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;