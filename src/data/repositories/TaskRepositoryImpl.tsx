import { TaskRepository } from '../../domain/repository/TaskRepository';
import { Task } from '../../domain/entities/Task';

//so diri dayon nako gi himo ang mga CRUD application ug sa pag save sa storage, kay ana ni sir, sa data/repo daw nako ibutang ang CRUD then according sa akong research dari daw sa data layer sugu-on kung asa ibutang ang data, kung sa memory, sa external database or sa local storage

class TaskRepositoryImpl implements TaskRepository {
    private storageKey: string;

    constructor() {
        this.storageKey = 'todos';
    }

    // si getItem atong gipakuha sa atong storage

    async getTasks(): Promise<Task[]> {
        const storedTasks = await JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        return storedTasks;
    }


    // diri nato e save atong mga tasks
    async saveAllTasks(tasks: Task[]): Promise<void> {
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    // atong gikuha ang task ug atong e push sa atong array ang bag-o nato gi add nga task

    async addTask(newTask: Task): Promise<Task> {
        const tasks = await this.getTasks();
        tasks.push(newTask);
        await this.saveAllTasks(tasks);
        return newTask;
    }

    //same gyapon sauna, ato siyang kuhaon sa array ang nag match nga ID

    async removeTask(taskId: string): Promise<boolean> {
        let tasks = await this.getTasks();
        tasks = tasks.filter(task => task.id !== taskId.toString());
        await this.saveAllTasks(tasks);
        return true;
    }

    // pang edit ni na part dari. butangan pa nako ug katong isEditing = true para matoggle nako ang editing mode, pero ayha ko na sa problemahon kung ni work na akong, add, remove ug get functions which is for now dili pa

  
}

export default TaskRepositoryImpl;
