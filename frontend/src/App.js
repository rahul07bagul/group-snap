import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Groups from './components/Groups';
import Photos from './components/Photos';
import Settings from './components/Settings';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  // Function to handle user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear session
  };

  // Function to handle user login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Save session
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Login */}
          <Route path="/login" element={<Login onSignIn={handleLogin} />} />

          {/* Route for SignUp */}
          <Route path="/signup" element={<SignUp />} />

          {/* Routes for Authenticated Users */}
          {isAuthenticated && (
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <div className="app__body">
                    <Sidebar onLogout={handleLogout}/>
                    <Routes>
                      <Route path="/home" element={<Feed group={null} page='home'/>} />
                      <Route path="/groups/*" element={<Groups />} />
                      <Route path="/photos" element={<Photos />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/" element={<Navigate to="/home" />} />
                      <Route path="*" element={<h1>404 - Not Found</h1>} />
                    </Routes>
                  </div>
                </>
              }
            />
          )}

          {/* Default Route to Redirect to Login */}
          {!isAuthenticated && (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
