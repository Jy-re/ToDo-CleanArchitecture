import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/todo.action';
import { Task } from '../../domain/entities/Task'; 

const UpdateForm = ({ task, onClose }: { task: Task, onClose: () => void }) => {
  const dispatch = useDispatch();
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUpdate = async () => {
    const updatedTask = { ...task, name: newTaskName };

    dispatch(updateTask({ task: updatedTask }) as any)
        .unwrap()
        .then(() => {
            setNewTaskName('');
            setErrorMessage('')
            onClose();
        })
        .catch(() => {
            setErrorMessage('Invalid Email');
        })
  };
  return (
    <div>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Close</button> 
    </div>
  );
};

export default UpdateForm;
