// src/modules/task/task.service.ts
import { Task } from "./task.model";
import { ITask } from "./task.interface";

export const TaskService = {
    createTask: async (payload: ITask, userId: string) => {
        return Task.create({ ...payload, createdBy: userId });
    },


    getAllTasks: async () => {
        return Task.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
    },

    getTaskById: async (taskId: string) => {
        return Task.findById(taskId);
    },

    updateTask: async (taskId: string, payload: Partial<ITask>) => {
        return Task.findByIdAndUpdate(taskId, payload, { new: true });
    },

    deleteTask: async (taskId: string) => {
        return Task.findByIdAndDelete(taskId);
    },
};
