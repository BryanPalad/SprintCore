import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getTasksByProject, createTask, updateTaskStatus, deleteTask } from "../controllers/task.controller.js";

const router = Router();

router.get("/project/:projectId", authMiddleware, getTasksByProject);
router.post("/", authMiddleware, createTask);
router.patch("/:id/status", authMiddleware, updateTaskStatus);
router.delete("/:id", authMiddleware, deleteTask);

export default router;