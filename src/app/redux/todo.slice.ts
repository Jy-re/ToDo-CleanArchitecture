import { createSlice  } from "@reduxjs/toolkit";
import { Task } from "../../domain/entities/Task";
import { fetchTasks, addTask, deleteTask, updateTask } from "./todo.action";



interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: "invalid email",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => ({
        ...state,
        tasks: action.payload,
        loading: false,
      }))
      .addCase(fetchTasks.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchTasks.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(addTask.fulfilled, (state, action) => ({
        ...state,
        tasks: [...state.tasks, action.payload],
      }))
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action) => ({
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      }))
      .addCase(updateTask.fulfilled, (state, action) => ({
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      }))
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
  },
});

export default taskSlice.reducer;
