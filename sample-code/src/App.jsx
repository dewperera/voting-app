import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';

// Import the new page components
import UserGuide from './UserGuide';
import Rules from './Rules';
import About from './About';
import CandidateRegistration from './CandidateRegistration';
import VoterRegistration from './VoterRegistration';
import Election from './Election';
import Results from './Results';

function App() {
  return (
    <Router>
      <div className="navbar-container">
        <Navbar expand="lg" className="navbar-custom">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <FontAwesomeIcon icon={faVoteYea} style={{ marginRight: '8px' }} />
              <b>SMART VOTE</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/User-Guide">User Guide</Nav.Link>
                <Nav.Link as={Link} to="/rules">Rules & Regulations</Nav.Link>
                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/User-Guide" element={<UserGuide />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/about" element={<About />} />
          <Route path="/candidate-registration" element={<CandidateRegistration />} />
          <Route path="/voter-registration" element={<VoterRegistration />} />
          <Route path="/election" element={<Election />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </ContentWrapper>
    </Router>
  );
}

function ContentWrapper({ children }) {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' && (
        <div>
          <Button as={Link} to="/candidate-registration" variant="secondary" style={{ padding: '1em 3em', fontSize: '1.5em', marginRight: '1em', marginBottom: '1em' }}>Candidate Registration</Button>{' '}<br></br>
          <Button as={Link} to="/voter-registration" variant="dark" style={{padding: '1em 3em', fontSize: '1.5em', marginRight: '1em', marginBottom: '1em' }}>Voter Registration</Button>{' '}
          <br />
          <Button as={Link} to="/election" variant="success" style={{ padding: '1em 3em', fontSize: '1.5em', marginRight: '1em' }}>Election</Button>{' '}
          <Button as={Link} to="/results" variant="warning" style={{ padding: '1em 3em', fontSize: '1.5em' }}>Results</Button>
        </div>
      )}
      {children}
    </div>
  );
}

function Home() {
  return ;
}

export default App;

