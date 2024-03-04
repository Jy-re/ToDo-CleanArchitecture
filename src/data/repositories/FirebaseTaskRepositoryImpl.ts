import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

class FirebaseTaskRepositoryImpl implements TaskRepository {
  private todoCollectionRef = collection(db, "todos");

  async getTasks(): Promise<Task[]> {
    const querySnapshot = await getDocs(this.todoCollectionRef);
    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      const taskData = doc.data();
      const task: Task = {
        id: doc.id,
        name: taskData.name,
      };
      tasks.push(task);
    });
    return tasks;
  }

  async addTask(newTask: Task): Promise<Task> {
    const docRef = await addDoc(this.todoCollectionRef, newTask);
    return {
      ...newTask,
      id: docRef.id,
    };
  }

  async removeTask(task: Task): Promise<void> {
    const docRef = doc(this.todoCollectionRef, task.id);
    await deleteDoc(docRef);
    console.log("Document deleted successfully");
  }

async updateTask(task: Task): Promise<Task> {
  const taskData: { [key: string]: any } = { name: task.name };
  const docRef = doc(this.todoCollectionRef, task.id);
  await updateDoc(docRef, taskData);
  console.log("Document updated successfully");
  return task;
}
}

export default FirebaseTaskRepositoryImpl;
