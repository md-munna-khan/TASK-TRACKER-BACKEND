// src/modules/task/task.model.ts
import { Schema, model, Types } from "mongoose";
import { ITask, TaskPriority, TaskStatus } from "./task.interface";


const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },
    createdBy: { type: Types.ObjectId, ref: "Auth", required: true },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", TaskSchema);
