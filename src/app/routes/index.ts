import { Router } from "express";

import { AuthRoutes } from "../modules/Auth/auth.routes";
import { TaskRoutes } from "../modules/Task/task.routes";


export const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },         
  { path: "/tasks", route: TaskRoutes }         
];

moduleRoutes.forEach((module) => {
  router.use(module.path, module.route);
});
