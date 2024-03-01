import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../main';
import { fetchTasks, addTask, deleteTask } from '../redux/slice';
import { Task } from '../../domain/entities/Task';

const TaskList: React.FC = () => {
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
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
        id: tasks.length + 1,
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

  return (
    <div>
      <h2>Tasks</h2>
      
      <p>Delete task to mark as complete</p>
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => handleDeleteTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
