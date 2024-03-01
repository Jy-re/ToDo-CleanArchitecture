import { Task } from '../entities/Task';

export interface TaskRepository {
    getTasks(): Promise<Task[]>;
    addTask(task: Task): Promise<Task>;
    removeTask(task: Task): Promise<Task>;
}
