import { Task } from '../entities/Task';
import { TaskRepository } from '../repository/TaskRepository';

// so according sa akong gisearch, kalimot ko where but ana sila is ang use cases kay mao ni siya ang in charge sa pag manage sa methods na atong gi declare sa atong domain/repository

//so ang naa diri nga function is si retrieve task, diri gitawag nato si TaskRepository kay kung ka remember mo, nag promise to siya nga iyang ang maapektuhan sa iyang method kay si Task Entity nato. 

//So nag try dayon siya ug retrieve sa task gamit ang getTasks() nato nga method kung asa siya nag promise ganina, so niana siya "unsa man tong promise nimo nga kuhaon nimo si Tasks pag tawagon ka, asa mnaman to." 

// So if good mood si getTasks(), mudagan siya para kuhaon si task ug e hatag sa atoa or if dili siya successful mag hatag siya ug error message. Same gyapon sa uban functions.

async function retrieveTasks(taskRepository: TaskRepository): Promise<Task[]> {
    try {
        const tasks = await taskRepository.getTasks();
        return tasks;
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        throw error;
    }
}

async function addTask(taskRepository: TaskRepository, task: Task): Promise<Task> {
    try {
        const addedTask = await taskRepository.addTask(task);
        return addedTask;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
}

async function removeTask(taskRepository: TaskRepository, taskId: string): Promise<void> {
    try {
        await taskRepository.removeTask(taskId);
        console.log('Task removed successfully');
    } catch (error) {
        console.error('Error removing task:', error);
        throw error;
    }
}

export { retrieveTasks, addTask, removeTask };
