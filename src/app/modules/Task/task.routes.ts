
import { Router } from "express";
import { TaskController } from "./task.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../interface/enums";

const router = Router();

router.post("/", checkAuth(Role.USER, Role.ADMIN) , TaskController.createTask);
router.get("/", checkAuth(Role.USER, Role.ADMIN) , TaskController.getAllTasks);
router.get("/:taskId",checkAuth(Role.USER, Role.ADMIN), TaskController.getTaskById);
router.patch("/:taskId", checkAuth(Role.USER, Role.ADMIN), TaskController.updateTask);
router.delete("/:taskId", checkAuth(Role.USER, Role.ADMIN), TaskController.deleteTask);

export const TaskRoutes = router;
