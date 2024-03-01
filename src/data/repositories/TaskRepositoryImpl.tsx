import { TaskRepository } from '../../domain/repository/TaskRepository';
import { Task } from '../../domain/entities/Task';

class TaskRepositoryImpl implements TaskRepository {
    private storageKey: string;

    constructor() {
        this.storageKey = 'todos';
    }

    async getTasks(): Promise<Task[]> {

        const storedTasks = await JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        return storedTasks;
    }

    async addTask(newTask: Task): Promise<Task> {
        const tasks = await this.getTasks();
        tasks.push(newTask);
        await this.saveAllTasks(tasks);
        
        return newTask;
    }

    async removeTask(task: Task): Promise<Task> {
        let tasks = await this.getTasks();
        tasks = tasks.filter(task => task.id !== task.id);
        await this.saveAllTasks(tasks);
        return task;
    }

    private async saveAllTasks(tasks: Task[]): Promise<void> {
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
}

export default TaskRepositoryImpl;
