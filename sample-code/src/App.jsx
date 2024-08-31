import { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="navbar-container">
        <Navbar expand="lg" className="navbar-custom">
          <Container>
            <Navbar.Brand href="#home">
              <FontAwesomeIcon icon={faVoteYea} style={{ marginRight: '8px' }} />
              <b>SMART VOTE</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">User Guide</Nav.Link>
                <Nav.Link href="#home">Rules & Regulations</Nav.Link>
                <Nav.Link href="#link">About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div>
        <Button variant="secondary" style={{ padding: '1em 3em', fontSize: '1.5em', marginRight: '1em', marginBottom: '1em' }}>Candidate Registration</Button>{' '}
        <Button variant="dark" style={{ padding: '1em 3em', fontSize: '1.5em', marginBottom: '1em' }}>Voter Registration</Button>{' '}
        <br />
        <Button variant="success" style={{ padding: '1em 3em', fontSize: '1.5em', marginRight: '1em' }}>Election</Button>{' '}
        <Button variant="warning" style={{ padding: '1em 3em', fontSize: '1.5em' }}>Results</Button>
      </div>
    </>
  )
}

export default App
