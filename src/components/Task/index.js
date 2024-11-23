import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import EditPopUp from '../EditPopUp'; 
import './index.css';

const Task = (props) => {
  const { task, updateTask, onDelete } = props;

  const deleteTask = async () => {
   try {
     const response = await fetch(`http://localhost:3000/delete-task/${task.id}`, {
       method: 'DELETE',
     });

     if (response.ok) {
       onDelete(task.id);
     } else {
       const errorData = await response.json();
       console.error('Failed to delete task:', errorData);
     }
   } catch (error) {
     console.error('Error deleting task:', error);
   }
 };
 console.log(task.title)

  return (
    <li className="tasks-list">
      <div className='heading-section'>
        <h1 className='task-head'>{task.title}</h1>
        <p className='category' >{task.category}</p>
      </div>
      {task.description && <p className='description'>Detail: {task.description}</p>}
      <div className='edit-section'>
         <EditPopUp task={task} updateTask={updateTask} /> 
         <MdDelete onClick={deleteTask}/>
      </div>
    </li>
  );
};

export default Task;