import { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

function LoginForm({ onLogin }) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State to handle error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    // Simulate a login process with hardcoded credentials
    const validUsername = 'admin';
    const validPassword = '123';

    setTimeout(() => {
      if (loginData.username === validUsername && loginData.password === validPassword) {
        console.log('Logged in:', loginData);
        onLogin(); // Call the onLogin function passed as a prop
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container className="login-page">
      <Row>
        <Col>
          <h3 className="text-center">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={loginData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if credentials are wrong */}

            <Button disabled={loading} variant="primary" type="submit">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
