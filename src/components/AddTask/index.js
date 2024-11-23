import { Component } from 'react';
import Popup from 'reactjs-popup';
import './index.css';

import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";

class AddTask extends Component {
  state = { title: '', description: '', category: '', setErrorMsg: '' }

  changeTitle = event => {
    this.setState({ title: event.target.value, setErrorMsg: '' });
  }

  changeDescription = event => {
    this.setState({ description: event.target.value });
  }

  changeCategory = (event) => {
    this.setState({ category : event.target.value, setErrorMsg: '' });
  }

  addTask = async (close) => {  
    const { title, description, category } = this.state;

    // Validate title and description before making the POST request
    if (title === '' || description === '') {
      this.setState({ setErrorMsg: '*fields are required' });
      return;
    }

    const url = 'http://localhost:3000/create-tasks';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, category }),
    };

    this.setState({ setErrorMsg: '' });

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        this.props.addTask({ id: data.id, title, description, category });
        this.setState({title: '', description: '', category: ''})
        console.log('Success');
        close();
      } else {
        this.setState({ setErrorMsg: data.error });
      }
    } catch (error) {
      this.setState({ setErrorMsg: 'Network error. Please try again.' });
      console.error('Error:', error);
    }
  }

  render() {
    return (
      <Popup
        modal
        trigger={
          <div className='btn-container'>
            <button className='add-task-btn'>Add Task <FaPlus className='plus-icon' /></button>
          </div>
        }
      >
        {close => (  
          <div className='add-task-container'>
            <ImCross className='cross-icon' onClick={() => close()} />
            <h1 className='add'>Add Your Task</h1>
            <label className='label'>*Title:</label>
            <input
              placeholder='Enter your task...'
              onChange={this.changeTitle} // Corrected function name
              type='text'
              className='input'
              value={this.state.title} // Corrected value reference
            />
            <label className='label'>*Description:</label>
            <textarea
              value={this.state.description}
              onChange={this.changeDescription}
              placeholder='Enter your description...'
              className='textarea'
            />
            <label htmlFor="category" className='label'>Category:</label>
            <select onChange={this.changeCategory} value={this.state.category} className='input' id="category" name="category">
              <option value="">Select Category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Others">Others</option>
            </select>
            <p className='error'>{this.state.setErrorMsg}</p>
            <button onClick={() => this.addTask(close)} className='done-btn'>Done</button> 
          </div>
        )}
      </Popup>
    );
  }
}

export default AddTask;
