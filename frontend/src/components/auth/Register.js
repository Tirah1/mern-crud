import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const Register = () => {
  const navigate = useNavigate();
  const { register, error, clearErrors, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;
  const [alert, setAlert] = useState(null);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register({
        name,
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
        Account <span className='text-dark'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        {alert && <div className='alert alert-danger'>{alert}</div>}
        <div className='form-group mb-3'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            className='form-control'
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            className='form-control'
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block w-100'
        />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
