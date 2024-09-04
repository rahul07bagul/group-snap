import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Groups from './components/Groups';
import Photos from './components/Photos';
import Settings from './components/Settings';
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

          {/* Routes for Authenticated Users */}
          {isAuthenticated && (
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <div className="app__body">
                    <Sidebar />
                    <Routes>
                      <Route path="/home" element={<Feed />} />
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
