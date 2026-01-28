// src/modules/task/task.controller.ts
import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";

export const TaskController = {
createTask: catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const task = await TaskService.createTask(req.body, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Task created",
    data: task,
  });
}),


  getAllTasks: catchAsync(async (req: Request, res: Response) => {
    const tasks = await TaskService.getAllTasks();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Tasks retrieved",
      data: tasks,
    });
  }),

  getTaskById: catchAsync(async (req: Request, res: Response) => {
    const task = await TaskService.getTaskById(req.params.taskId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Task retrieved",
      data: task,
    });
  }),

  updateTask: catchAsync(async (req: Request, res: Response) => {
    const task = await TaskService.updateTask(req.params.taskId as string, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Task updated",
      data: task,
    });
  }),

  deleteTask: catchAsync(async (req: Request, res: Response) => {
    const task = await TaskService.deleteTask(req.params.taskId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Task deleted",
      data: task,
    });
  }),
};
