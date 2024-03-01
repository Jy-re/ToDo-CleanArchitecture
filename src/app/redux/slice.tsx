
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../domain/entities/Task';
import TaskRepositoryImpl from '../../data/repositories/TaskRepositoryImpl';
import { TaskServiceImpl } from '../../domain/usecases/TaskUsecases';

// Define async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const taskDataRepos = new TaskRepositoryImpl();
    const taskService = new TaskServiceImpl(taskDataRepos);
    const tasks = await taskService.getTask();
    console.log('Fetched items:', tasks);
    return tasks;
    
});

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({ task }: { task: Task }) => { 
        const taskDataRepos = new TaskRepositoryImpl();
        const taskService = new TaskServiceImpl(taskDataRepos);
        await taskService.addTask(task);
        console.log("Added:", task)
        return task;
    }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ task }: { task: Task }) => { 
    const taskDataRepos = new TaskRepositoryImpl();
    const taskService = new TaskServiceImpl(taskDataRepos);
    await taskService.removeTask(task);
    return task; // Return the taskId directly
  }
);


interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => ({
            ...state,
            tasks: action.payload, 
        }))
        builder.addCase(fetchTasks.pending, (state) => ({
            ...state,
        }))
        builder.addCase(fetchTasks.rejected, (state) => ({
            ...state,
        }))
    },
});

export default taskSlice.reducer;
