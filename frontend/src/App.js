import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Login */}
          <Route path="/login" element={<Login onSignIn={() => setIsAuthenticated(true)} />} />

          {/* Route for Main App */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <React.Fragment>
                  <Header />
                  <div className="app__body">
                    <Sidebar />
                    <Home />
                  </div>
                </React.Fragment>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Default Route to Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Catch-All Route for 404 */}
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
