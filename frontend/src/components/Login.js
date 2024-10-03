import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';

function Login({ onSignIn }) {
  const [{ user }, dispatch] = useStateValue();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate ();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await loginUser(username, password);
      
      dispatch({
        type: actionTypes.SET_USER,
        user: response,
      });

      if (onSignIn) onSignIn();

      navigate('/home');
    } catch (err) {
      // Handle login error
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <a href="/" className="forgot-password">Forgot password?</a>
            <input type="submit" value="Login" className="btn"/>
            <p>Don't have an account? <a href="/signup" className="account-text" id="sign-up-link">Sign up</a></p>
          </form>
          <p className='error-message'>{error}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
