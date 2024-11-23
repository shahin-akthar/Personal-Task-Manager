import { Component } from 'react';
import AddTask from '../AddTask';
import Task from '../Task';
import './index.css';

class Tasks extends Component {
  state = { tasksList: [] };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = async () => {  
    const url = 'http://localhost:3000/get-tasks';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updateList = data.map((eachTask) => ({
          id: eachTask.id,
          title: eachTask.title,
          description: eachTask.description,
          category: eachTask.category
        }));

        updateList.sort((a, b) => {
          const priorityOrder = { pending: 1, inProgress: 2, completed: 3 };
          return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
        });

        console.log(updateList);
        this.setState({ tasksList: updateList });
      } else {
        console.log('Error fetching tasks');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  updateTask = (id, updatedTask) => {
    this.setState((prevState) => ({
      tasksList: prevState.tasksList.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState(prevState => ({
      tasksList: prevState.tasksList.filter(task => task.id !== id)
    }));
  };

  addTask = (newTask) => {
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask]
    }));
  };
  

  render() {
    const { tasksList } = this.state;
    console.log(tasksList)
    return (
      <div className='bg-container'>
        <h1 className='heading'>Tasks List</h1>
        <p className='text'>Keep It Together with Tasks!</p>
        <AddTask addTask={this.addTask}/>
        <h1 className='to-do'>Your tasks to do!</h1>
        <ul className='tasks-ul'>
          {tasksList.length === 0 ? (
            <p className='no-tasks'>Your task list is empty! Time to plan something amazing.</p>
          ) : (
            tasksList.map((each) => (
              <Task
                key={each.id} 
                task={each} 
                updateTask={this.updateTask} 
                onDelete={this.handleDelete} 
              />
            ))
          )}
        </ul>
      </div>
    );
  }
}

export default Tasks;