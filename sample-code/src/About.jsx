import React from 'react';
import './About.css';  

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-text">
        Welcome to the Voting Application! We are dedicated to providing a seamless and secure platform for managing elections and voting processes.
      </p>
      <p className="about-text">
        Our mission is to facilitate fair and transparent elections by offering a user-friendly interface for both voters and candidates. We strive to enhance the democratic process through innovation and technology.
      </p>
      <h4 className="about-subtitle">Our Team</h4>
      <p className="about-text">
        Our team consists of dedicated professionals with expertise in software development, cybersecurity, and user experience design. We are passionate about creating a reliable and efficient voting system.
      </p>
      <h4 className="about-subtitle">Contact Us</h4>
      <p className="about-text">
        If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@votingapp.com">support@votingapp.com</a>.
      </p>
    </div>
  );
}

export default About;
