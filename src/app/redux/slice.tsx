
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../domain/entities/Task';
import TaskRepositoryImpl from '../../data/repositories/TaskRepositoryImpl';
import { TaskServiceImpl } from '../../domain/usecases/TaskUsecases';

// Define async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_,{rejectWithValue}) => {
  try {
        const taskDataRepos = new TaskRepositoryImpl();
        const taskService = new TaskServiceImpl(taskDataRepos);
        const tasks = await taskService.getTask();
        console.log('Fetched items:', tasks);
        return tasks;
  } catch (error) {
        return rejectWithValue(error)
  }
    
});

export const addTask = createAsyncThunk('tasks/addTask', async ({ task }: { task: Task }, {rejectWithValue}) => { 
    try {
        const taskDataRepos = new TaskRepositoryImpl();
        const taskService = new TaskServiceImpl(taskDataRepos);
        await taskService.addTask(task);
        console.log("Added:", task)
        return task;
        
    } catch (error) {
        return rejectWithValue(error)
    }
        
    }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ task }: { task: Task }, {rejectWithValue}) => { 
    try {
        const taskDataRepos = new TaskRepositoryImpl();
        const taskService = new TaskServiceImpl(taskDataRepos);
        await taskService.removeTask(task);
        return task; 
    } catch (error) {
        return rejectWithValue(error)
    }
  }
);


interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: '',
};


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => ({
            ...state,
            tasks: action.payload, 
            loading: false
            
        }))
          builder.addCase(fetchTasks.pending, (state) => ({
            ...state,
            loading: true
            
        }))
          builder.addCase(fetchTasks.rejected, (state) => ({
            ...state,
            loading: false
            
        }))
        // not sure ngano but if dili ko ni e add, need pa siya e refresh ayha mureflect ang bag-o na add
        builder.addCase(addTask.fulfilled, (state, action) => ({
            ...state,
            tasks: [...state.tasks, action.payload],
        }))

        // para ma reject ang na add nga dili email
        builder.addCase(addTask.rejected, (state, action) => {
            state.error = action.payload as string; 
        });

        builder.addCase(deleteTask.fulfilled, (state, action) => ({
            ...state,
            tasks: state.tasks.filter(task => task.id !== action.payload.id),
        }))
    },
});

export default taskSlice.reducer;
