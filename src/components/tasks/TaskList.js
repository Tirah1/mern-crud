import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks');
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h1 className="mb-4">Task List</h1>
      <Link to="/add-task" className="btn btn-primary mb-4">Add New Task</Link>
      
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks found. Add a new task to get started!</div>
      ) : (
        <div className="list-group">
          {tasks.map(task => (
            <div key={task._id} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{task.title}</h5>
                <small className="text-muted">
                  {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </div>
              <p className="mb-1">{task.description}</p>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className={`badge ${getStatusBadgeClass(task.status)}`}>
                  {task.status}
                </span>
                <div>
                  <Link to={`/edit-task/${task._id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                  <button 
                    onClick={() => deleteTask(task._id)} 
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
