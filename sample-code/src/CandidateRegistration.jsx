import { useState } from 'react';
import { Container, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import './CandidateRegistration.css';
import { candidatesAPI } from "./api/candidatesAPI.js";
import LoginForm from './LoginForm';

function CandidateRegistration() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({});
  const [candidateID, setCandidateID] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // For success/error messages

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

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
    console.log('Submitting candidate with data:', formData); // Debugging log
    candidatesAPI.createCandidate(formData)
      .then(res => {
        console.log('Candidate created successfully:', res.data); // Debugging log
        setMessage('Candidate created successfully!');
        setLoading(false);
        setFormData({}); // Clear the form after submission
        setCandidateID(''); // Clear candidateID after submission
      })
      .catch(err => {
        console.error('Error creating candidate:', err.response ? err.response.data : err.message); // Improved error logging
        setMessage('Error creating candidate.');
        setLoading(false);
      });
  };

  const handleSearch = () => {
    setLoading(true);
    candidatesAPI.getCandidateById(candidateID)
      .then(res => {
        if (res.data) {
          setFormData(res.data);
          setMessage('Candidate found!');
        } else {
          setMessage('Candidate not found.');
        }
        setLoading(false);
      })
      .catch(err => {
        setMessage('Error fetching candidate.');
        setLoading(false);
      });
};


  const handleUpdate = (e) => {
    e.preventDefault();
    if (!candidateID) {
      setMessage('Please enter a Candidate ID to update.');
      return;
    }
    
    setLoading(true);
    console.log('Updating candidate with ID:', candidateID); // Debugging log
    candidatesAPI.updateCandidate(candidateID, formData)
      .then(res => {
        console.log('Candidate updated successfully:', res.data); // Debugging log
        setMessage('Candidate updated successfully!');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error updating candidate:', err.response ? err.response.data : err.message); // Improved error logging
        setMessage('Error updating candidate.');
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (!candidateID) {
      setMessage('Please enter a Candidate ID to delete.');
      return;
    }
    
    setLoading(true);
    console.log('Deleting candidate with ID:', candidateID); // Debugging log
    candidatesAPI.deleteCandidate(candidateID)
      .then(res => {
        console.log('Candidate deleted successfully:', res.data); // Debugging log
        setMessage('Candidate deleted successfully!');
        setFormData({});
        setCandidateID('');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error deleting candidate:', err.response ? err.response.data : err.message); // Improved error logging
        setMessage('Error deleting candidate.');
        setLoading(false);
      });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Container className="candidate-registration-page">
      <Row>
        <Col>
          <h3 className="text-center">Candidate Registration Form</h3>

          {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCandidateID">
              <Form.Label>Candidate ID (For Search, Update, and Delete)</Form.Label>
              <Form.Control
                type="text"
                name="candidateID"
                placeholder="Enter candidate ID"
                value={candidateID}
                onChange={(e) => setCandidateID(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Form.Group>

            <Form.Group controlId="formName">
  <Form.Label>Name</Form.Label>
  <Form.Control
    type="text"
    name="cname"
    placeholder="Enter candidate name"
    value={formData.cname || ''}
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
    value={formData.age || ''}
    onChange={handleChange}
    required/>
    </Form.Group>

    <Form.Group controlId="formExperience">
    <Form.Label>Experience</Form.Label>
    <Form.Control
    as="textarea"
    rows={3}
    name="experience"
    placeholder="Enter your experience"
    value={formData.experience || ''}
    onChange={handleChange}
    required/>
    </Form.Group>

    <Form.Group controlId="formPreviousPosition">
    <Form.Label>Previous Position</Form.Label>
    <Form.Control
    type="text"
    name="prev_position"
    placeholder="Enter your previous position"
    value={formData.prev_position || ''}
    onChange={handleChange}
    required/>
    </Form.Group>

    <Form.Group controlId="formQualifications">
    <Form.Label>Qualifications</Form.Label>
    <Form.Control
    as="textarea"
    rows={3}
    name="qualifications"
    placeholder="Enter your qualifications"
    value={formData.qualifications || ''}
    onChange={handleChange}
    required/>
    </Form.Group>

            <Button disabled={loading} variant="primary" type="submit">
              {loading ? 'Creating...' : 'Submit'}
            </Button>
            <Button variant="secondary" onClick={handleUpdate} disabled={loading || !candidateID}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={loading || !candidateID}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default CandidateRegistration;
