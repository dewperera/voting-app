// src/CandidateRegistration.jsx
import { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import './CandidateRegistration.css';
import {candidatesAPI} from "./api/candidatesAPI.js"; // Custom CSS file

function CandidateRegistration() {
  const [formData, setFormData] = useState({
    // cname: 'Dilshan',
    // age: '34',
    // experience: 11,
    // prev_position: 'Minister',
    // qualifications: 'O/L'
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted', formData);
    setLoading(true)
    candidatesAPI.createCandidate(formData).then(res=>{
      console.log(res.data)
      setLoading(false)
    }).catch(err=>{
      console.log(err)
      setLoading(false)
    })

  };

  return (
    <Container className="candidate-registration-page">
      <Row>
        <Col>
          <h3 className="text-center">Candidate Registration Form</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="cname"
                placeholder="Enter your name"
                value={formData.cname}
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

            <Form.Group controlId="formExperience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="experience"
                placeholder="Enter your experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPreviousPosition">
              <Form.Label>Previous Position</Form.Label>
              <Form.Control
                type="text"
                name="prev_position"
                placeholder="Enter your previous position"
                value={formData.prev_position}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formQualifications">
              <Form.Label>Qualifications</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="qualifications"
                placeholder="Enter your qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button disabled={loading} variant="primary" type="submit">
              {loading?'Creating...':'Submit'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CandidateRegistration;




