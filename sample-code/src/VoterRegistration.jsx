// src/CandidateRegistration.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import './VoterRegistration.css';
import {votingAPI} from "./api/votingAPI.js"; // Custom CSS file

function VoterRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted', formData);
    votingAPI.createVote(formData).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  };

  return (
    <Container className="voter-registration-page">
      <Row>
        <Col>
          <h3 className="text-center">Voter Registration Form</h3>
          <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formNic">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type="text"
                name="nic"
                placeholder="Enter your NIC"
                value={formData.nic}
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
