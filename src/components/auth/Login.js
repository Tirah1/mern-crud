import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const Login = () => {
  const navigate = useNavigate();
  const { login, error, clearErrors, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Clear any previous errors
    if (error) {
      clearErrors();
    }
    
    // If authenticated, redirect to home page
    if (isAuthenticated) {
      console.log('User authenticated, redirecting to home page');
      navigate('/');
    }
    
    // eslint-disable-next-line
  }, [isAuthenticated, error, navigate]);
  

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;
  const [alert, setAlert] = useState(null);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields');
    } else {
      login({
        email,
        password
      });
    }
  };

  useEffect(() => {
    if (error) {
      setAlert(error);
      clearErrors();
    }
  }, [error, clearErrors]);

  return (
    <div className='form-container'>
      <h1 className='text-primary'>
        Account <span className='text-dark'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        {alert && <div className='alert alert-danger'>{alert}</div>}
        <div className='form-group mb-3'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            className='form-control'
            required
          />
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            className='form-control'
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block w-100'
        />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
