import React from 'react';
import './Login.css';
import { useNavigate  } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate ();

  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Perform your login logic here
    // For this example, we'll just simulate a login
    // onSignIn();
    navigate('/login'); // Redirect to the main app after login
  };

  return (
    <div className="login">
      <div className="container">
        <div className="signin-signup">
            <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign Up" className="btn"/>
            {/* <Button type="submit" className="btn" variant="contained" color="primary">Sign up</Button> */}
            <p>Already have an account? <a href="/" className="account-text" id="sign-in-link">Sign in</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
