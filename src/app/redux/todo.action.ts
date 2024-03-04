import { createAsyncThunk } from "@reduxjs/toolkit";
//LOCAL DATA IMPORT
// import TaskRepositoryImpl from "../../data/repositories/TaskRepositoryImpl";
import { TaskServiceImpl } from "../../domain/usecases/TaskUsecases";
//FIREBASE DATA IMPORT
import FirebaseTaskRepositoryImpl from "../../data/repositories/FirebaseTaskRepositoryImpl";
import { Task } from "../../domain/entities/Task";

//LOCAL DATA REPO
// const taskDataRepos = new TaskRepositoryImpl();

//FIREBASE DATA REPO
const taskDataRepos = new FirebaseTaskRepositoryImpl();

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const taskService = new TaskServiceImpl(taskDataRepos);
      const tasks = await taskService.getTask();
      console.log("Fetched items:", tasks);
      return tasks;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ task }: { task: Task }, { rejectWithValue }) => {
    try {
      const taskService = new TaskServiceImpl(taskDataRepos);
      await taskService.addTask(task);
      console.log("Added:", task);
      return task;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ task }: { task: Task }, { rejectWithValue }) => {
    try {
      const taskService = new TaskServiceImpl(taskDataRepos);
      await taskService.removeTask(task);
      return task;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ task }: { task: Task }, { rejectWithValue }) => {
    try {
      const taskService = new TaskServiceImpl(taskDataRepos);
      await taskService.updateTask(task);
      console.log("Updated:", task);
      return task; 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);