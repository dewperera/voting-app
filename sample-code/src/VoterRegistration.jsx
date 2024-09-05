import { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import './VoterRegistration.css';
import { votingAPI } from "./api/votingAPI.js";

function VoterRegistration() {
  const [formData, setFormData] = useState({
    vid: '',
    name: '',
    age: ''
  });

  const [message, setMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    
    votingAPI.addVoter(formData)
      .then(res => {
        if (res.data.exists) {
          setMessage('Voter ID already registered.'); // Handle case where voter ID already exists
        } else {
          console.log(res.data);
          setFormData({
            vid: '',
            name: '',
            age: ''
          }); // Reset the form fields
          setMessage('Voter registered successfully!'); // Set success message
        }
      })
      .catch(err => {
        console.log(err);
        setMessage('Error registering voter.'); // Set error message
      });
  };
  
  

  return (
    <Container className="voter-registration-page">
      <Row>
        <Col>
          <h3 className="text-center">Voter Registration Form</h3>
          {message && <p className="text-success text-center">{message}</p>} {/* Display success message */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNic">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type="text"
                name="vid"
                placeholder="Enter your NIC"
                value={formData.vid}
                onChange={handleChange}
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default VoterRegistration;
