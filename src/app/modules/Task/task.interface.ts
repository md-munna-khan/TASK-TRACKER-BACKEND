import { Types } from "mongoose";

export enum TaskStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface ITask {
  _id?: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

