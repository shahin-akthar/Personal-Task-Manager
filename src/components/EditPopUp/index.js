import { Component } from 'react';
import Popup from 'reactjs-popup';
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

class EditPopUp extends Component {
  state = { 
    title: this.props.task.title || '', 
    description: this.props.task.description || '', 
    categroy: this.props.task.categroy || '', 
    setErrorMsg: ''
  }

  changeTitle = event => {
    this.setState({ title: event.target.value, setErrorMsg: '' });
  }

  changeDescription = event => {
    this.setState({ description: event.target.value });
  }

  changeCategory = event => {
    this.setState({ categroy: event.target.value, setErrorMsg: '' });
  }

  editTask = async (onClose) => {
   const { title, description, dueDate, priority } = this.state; 
   const { id } = this.props.task; 

   const updatedTask = { title, description, dueDate, priority };

   try {
     const response = await fetch(`http://localhost:3000/update-task/${id}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(updatedTask),
     });

     if (response.ok) {
       this.props.updateTask(id, updatedTask); 
       onClose(); 
     } else {
       const data = await response.json();
       console.error(data.error);
     }
   } catch (error) {
     console.error('Error updating task:', error);
   }
 };


  render() {
    return (
      <Popup
        modal
        trigger={<FaEdit />}
      >
        {onClose => (  
          <div className='add-task-container'>
            <ImCross className='cross-icon' onClick={onClose} />
            <h1 className='add'>Edit Your Task</h1>
            <label className='label'>*Title:</label>
            <input
              placeholder='Enter your task...'
              onChange={this.changeTitle}
              type='text'
              className='input'
              value={this.state.title}
            />
            <label className='label'>*Description:</label>
            <textarea
              value={this.state.description}
              onChange={this.changeDescription}
              placeholder='Enter your description...'
              className='textarea'
            />
            <label htmlFor="category" className='label'>Categroy:</label>
            <select 
              onChange={this.changeCategory} 
              value={this.state.categroy} 
              className='input' 
              id="category" 
              name="category"
            >
              <option value="">Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Others">Others</option>
            </select>
            <p className='error'>{this.state.setErrorMsg}</p>
            <button onClick={() => this.editTask(onClose)} className='done-btn'>Save</button> 
          </div>
        )}
      </Popup>
    );
  }
}

export default EditPopUp;
