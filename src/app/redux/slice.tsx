// src/redux/slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../domain/entities/Task';
import TaskRepositoryImpl from '../../data/repositories/TaskRepositoryImpl';

const taskRepository = new TaskRepositoryImpl();

//mao ning actions, dapat pa ni nako e separate sa slicee

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await taskRepository.getTasks();
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (newTask: Task) => { 
    return await taskRepository.addTask(newTask);
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => { 
    await taskRepository.removeTask((taskId));
  }
);

// create sliceee

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
      builder.addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      builder.addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      builder.addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.meta.arg);
      })
  },
});

export default taskSlice.reducer;
