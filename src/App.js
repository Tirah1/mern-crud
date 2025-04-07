import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layout/Navbar';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import EditTask from './components/tasks/EditTask';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import { AuthProvider } from './context/auth/AuthState';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <TaskList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/add-task" 
                element={
                  <PrivateRoute>
                    <TaskForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/edit-task/:id" 
                element={
                  <PrivateRoute>
                    <EditTask />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
