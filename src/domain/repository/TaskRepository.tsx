import { Task } from '../entities/Task';

export interface TaskRepository {
    //so here, nag himo tag method nga get task and nag promise siya nga iyang return ang array gikan sa ato Task entity(? di ko sure)
    //same gyapon sa uban, nag ingon dari nga once ma trigger ni na methods, si Task entity ilang maapektuhan
    getTasks(): Promise<Task[]>;
    addTask(task: Task): Promise<Task>;
    removeTask(taskId: string): Promise<boolean>;
}
