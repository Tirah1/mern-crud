import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

// Create context
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('http://localhost:5000/api/auth');

      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('http://localhost:5000/api/users', formData, config);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg
      });
    }
  };

  // Login User
const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      console.log('Attempting login with:', formData.email); // Add this for debugging
      const res = await axios.post('http://localhost:5000/api/auth', formData, config) ;
  
      console.log('Login response:', res.data); // Add this for debugging
  
      if (res && res.data) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data
        });
  
        // Add a small delay before loading user
        setTimeout(() => {
          loadUser();
        }, 100);
      }
    } catch (err) {
      console.error('Login error details:', err);
      
      // More detailed error logging
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
      }
      
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response && err.response.data && err.response.data.msg 
          ? err.response.data.msg 
          : 'Login failed. Please check your credentials.'
      });
    }
  };
  

  // Logout
  const logout = () => dispatch({ type: 'LOGOUT' });

  // Clear Errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
