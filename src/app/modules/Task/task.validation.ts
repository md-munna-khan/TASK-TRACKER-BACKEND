
import { z } from "zod";
import { TaskPriority, TaskStatus } from "./task.interface";


export const createTaskSchema = z.object({
  title: z.string({ error: "Title is required" }).min(2),
  description: z.string({ error: "Description is required" }).min(5),
  dueDate: z
    .string({ error: "Due date is required" })
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  status: z.enum([TaskStatus.PENDING, TaskStatus.COMPLETED]).optional(),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]).optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val))).optional(),
  status: z.enum([TaskStatus.PENDING, TaskStatus.COMPLETED]).optional(),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]).optional(),
});
