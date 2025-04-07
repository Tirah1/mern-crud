import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layout/Navbar';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import EditTask from './components/tasks/EditTask';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
