import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import the LoginForm component
import './Admin.css'; // Import CSS file for Admin component

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const handleLogin = () => {
    setIsLoggedIn(true); // Set the state to true when logged in
  };

  return (
    <div className="admin-page">
      {isLoggedIn ? (
        <>
          <h2>Admin Dashboard</h2>
          <Button
            as={Link}
            to="/candidate-registration"
            variant="secondary"
            className="admin-button"
          >
            Candidate Registration
          </Button>
          <Button
            as={Link}
            to="/results"
            variant="warning"
            className="admin-button"
          >
            Results
          </Button>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} /> // Render LoginForm if not logged in
      )}
    </div>
  );
}

export default Admin;
