import { Task } from "../entities/Task";
import { TaskRepository } from "../repository/TaskRepository";

export interface TaskService {
    getTask(): Promise<Task[]>;
    addTask(task: Task): Promise<void>;
    removeTask(task: Task): Promise<void>; 
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
        await this.TaskRepo.addTask(task); 
    }

    async removeTask(task: Task): Promise<void> {
        await this.TaskRepo.removeTask(task);
    }
}
