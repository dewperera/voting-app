// src/UserGuide.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './UserGuide.css'; // Custom CSS file

function UserGuide() {
  return (
    <div className="user-guide-page">
      <Container>
        <Row className="mb-5">
          <Col>
            {/* <h1 className="text-center user-guide-heading">User Guide</h1> */}
            <p className="text-center user-guide-subheading">
              Welcome to the Smart Vote App! Follow this guide to navigate through the app and participate in the elections with ease.
            </p>
          </Col>
        </Row>
        
        {/* Registration as a Voter */}
        <Row className="mb-4">
          <Col>
            <h2 className="user-guide-section-heading">1. Register as a Voter</h2>
            <p>Click on the <strong>Voter Registration</strong> button on the homepage.</p>
            <p>Fill out the registration form with your personal details, such as name, age, and identification number.</p>
            <p>Verify your identity using the provided verification method.</p>
            <p>Submit your registration. You will receive a confirmation message once your registration is successful.</p>
          </Col>
        </Row>
        
        {/* Registration as a Candidate */}
        <Row className="mb-4">
          <Col>
            <h2 className="user-guide-section-heading">2. Register as a Candidate</h2>
            <p>Click on the <strong>Candidate Registration</strong> button on the homepage.</p>
            <p>Fill in your candidate details, including name, party affiliation, and manifesto.</p>
            <p>Upload your campaign photo and any necessary documents.</p>
            <p>Submit your application. Once approved, your profile will appear on the ballot.</p>
          </Col>
        </Row>
        
        {/* Voting Instructions */}
        <Row className="mb-4">
          <Col>
            <h2 className="user-guide-section-heading">3. How to Vote</h2>
            <p>On Election Day, log in to the Smart Vote App.</p>
            <p>Click on the <strong>Election</strong> button.</p>
            <p>Review the list of candidates and their manifestos.</p>
            <p>Select your preferred candidate by clicking on their name or photo.</p>
            <p>Confirm your vote. Once confirmed, your vote will be securely recorded.</p>
          </Col>
        </Row>
        
        {/* Viewing Results */}
        <Row className="mb-4">
          <Col>
            <h2 className="user-guide-section-heading">4. Viewing Election Results</h2>
            <p>Click on the <strong>Results</strong> button on the homepage.</p>
            <p>View the live results, including the total number of votes each candidate has received.</p>
            <p>Use filters to view results by region or demographic if available.</p>
            <p>Results will be updated in real-time until the final tally is announced.</p>
          </Col>
        </Row>
        
        {/* Additional Features */}
        <Row className="mb-4">
          <Col>
            <h2 className="user-guide-section-heading">5. Additional Features</h2>
            <p>Access this guide anytime by clicking on the <strong>User Guide</strong> link in the navigation bar.</p>
            <p>Stay informed about the rules of the election by visiting the <strong>Rules & Regulations</strong> section.</p>
            <p>Learn more about the team behind Smart Vote by clicking on the <strong>About Us</strong> link.</p>
          </Col>
        </Row>
        
        {/* Tips */}
        <Row className="mb-4">
          <Col>
            <h2 className="user-guide-section-heading">Tips for a Smooth Experience</h2>
            <p>Ensure your internet connection is stable, especially when casting your vote.</p>
            <p>Double-check your registration details before submission to avoid errors.</p>
            {/* <p>For any issues or support, contact our help desk through the <strong>Contact Us</strong> section.</p> */}
          </Col>
        </Row>
        
        
      </Container>
    </div>
  );
}

export default UserGuide;