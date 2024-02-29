import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../main';
import { fetchTasks, addTask, deleteTask } from '../redux/slice';
import { Task } from '../../domain/entities/Task';

const TaskList: React.FC = () => {
  const [newTaskText, setNewTaskText] = useState<string>(''); 
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  console.log("Tasks:", tasks);

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask: Task = {
        id: (tasks.length + 1).toString(), 
        name: newTaskText,
        isComplete: false,
        isEditing: false,
      };
      dispatch(addTask(newTask));
      setNewTaskText(''); 
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
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
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
