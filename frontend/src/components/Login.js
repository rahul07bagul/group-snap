import React from 'react';
import './Login.css';
import { useNavigate  } from 'react-router-dom';

function Login({ onSignIn }) {
  const navigate = useNavigate ();

  const handleSignIn = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Perform your login logic here
    // For this example, we'll just simulate a login
    onSignIn();
    navigate('/home'); // Redirect to the main app after login
  };

  return (
    <div className="login">
      <div className="container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <a href="/" className="forgot-password">Forgot password?</a>
            <input type="submit" value="Login" className="btn"/>
            <p>Don't have an account? <a href="/signup" className="account-text" id="sign-up-link">Sign up</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
