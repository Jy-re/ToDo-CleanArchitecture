import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../main';
import { fetchTasks, addTask, deleteTask } from '../redux/todo.action';
import { Task } from '../../domain/entities/Task';
import UpdateForm from './UpdateForm';

const TaskList: React.FC = () => {
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editTask, setEditTask] = useState<Task | null>(null); 
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask: Task = {
        id: "",
        name: newTaskText,
      };

      dispatch(addTask({ task: newTask }) as any)
        .unwrap()
        .then(() => {
          setErrorMessage(''); 
          dispatch(fetchTasks() as any);
          setNewTaskText('');
        })
        .catch((error: Error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const handleDeleteTask = (task: Task) => {
    dispatch(deleteTask({ task }) as any);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task); 
  };

  const handleCloseForm = () => {
    setEditTask(null);
  };

  return (
    <div>
      <h2>Emails</h2>
      
      <p>Add emails you need to remember</p>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Email</button>
      </div>
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => handleDeleteTask(task)}>Delete</button>
            <button onClick={() => handleEditTask(task)}>Edit</button> 
            {editTask && editTask.id === task.id && <UpdateForm task={task} onClose={handleCloseForm}/>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
