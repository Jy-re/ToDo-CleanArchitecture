import { Task } from "../entities/Task";
import { TaskRepository } from "../repository/TaskRepository";

export interface TaskService {
    getTask(): Promise<Task[]>;
    addTask(task: Task): Promise<void>;
    removeTask(task: Task): Promise<void>;
    updateTask(task: Task): Promise<void>; 
}

export class TaskServiceImpl implements TaskService {
    private TaskRepo: TaskRepository;

    constructor(tr: TaskRepository) {
        this.TaskRepo = tr;
    }

    async getTask(): Promise<Task[]> {
        return this.TaskRepo.getTasks();
    }

    async addTask(task: Task): Promise<void> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(task.name)) {
            await this.TaskRepo.addTask(task);
        } else {
            throw new Error('Invalid email format');
        }
    }

    async removeTask(task: Task): Promise<void> {
        await this.TaskRepo.removeTask(task);
    }

    async updateTask(task: Task): Promise<void> { 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(task.name)) {
            await this.TaskRepo.updateTask(task);
        } else {
            throw new Error('Invalid email format');
        }
    }
}
