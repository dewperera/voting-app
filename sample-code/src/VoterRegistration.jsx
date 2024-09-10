import { useState } from 'react';
import { Container, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import './VoterRegistration.css';
import { votingAPI } from "./api/votingAPI.js";

function VoterRegistration() {
  const [formData, setFormData] = useState({
    vid: '',
    name: '',
    age: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState({}); // New state for error fields

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');
    setErrorFields({}); // Reset error fields

    // Check if NIC is already registered
    votingAPI.checkVoter(formData.vid)
      .then(res => {
        if (res.data.exists) {
          setMessage('The entered NIC is already registered.');
          setMessageType('danger');
          setErrorFields({ vid: true }); // Highlight NIC field
        } else {
          // If NIC is not registered, proceed with registration
          votingAPI.addVoter(formData)
            .then(res => {
              setFormData({
                vid: '',
                name: '',
                age: ''
              }); // Reset the form fields
              setMessage('Voter registered successfully!');
              setMessageType('success');
            })
            .catch(err => {
              console.error('Error registering voter:', err.response ? err.response.data : err.message);
              setMessage('Error registering voter.');
              setMessageType('danger');
            });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error checking voter ID:', err.response ? err.response.data : err.message);
        setMessage('Error checking voter ID.');
        setMessageType('danger');
        setLoading(false);
      });
  };

  return (
    <Container className="voter-registration-page">
      <Row>
        <Col>
          <h3 className="text-center">Voter Registration Form</h3>
          {message && (
            <Alert variant={messageType} className="mb-3">
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNic">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type="text"
                name="vid"
                placeholder="Enter your NIC"
                value={formData.vid}
                onChange={handleChange}
                className={errorFields.vid ? 'input-error' : ''}
                required
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default VoterRegistration;





