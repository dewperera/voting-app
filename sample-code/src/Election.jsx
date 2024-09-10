import React, { useState, useEffect } from 'react';
import './Election.css';

function Election() {
  const [showCandidates, setShowCandidates] = useState(false);
  const [candidates, setCandidates] = useState([]);

  // Fetch candidate data from the server when the component mounts
  useEffect(() => {
    if (showCandidates) {
      // Replace with your API endpoint to fetch candidates
      fetch('/api/candidates')
        .then(response => response.json())
        .then(data => setCandidates(data))
        .catch(error => console.error('Error fetching candidates:', error));
    }
  }, [showCandidates]);

  const handleViewCandidates = () => {
    setShowCandidates(!showCandidates);
  };

  return (
    <div className="cast-votes-container">
      <button className="candidates-button" onClick={handleViewCandidates}>
        {showCandidates ? 'Hide Candidates' : 'View Candidates'}
      </button>
      {showCandidates && (
        <div className="candidate-table">
          <h2 className="candidate-title">Candidates List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Party</th>
                {/* Add other columns as needed */}
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.party}</td>
                  {/* Render other columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="vote-box">
        <h2 className="vote-title">CAST VOTES</h2>
        <div className="input-group">
          <label className="voter-label">Voter NIC =</label>
          <input type="text" className="voter-input" />
        </div>
        <div className="input-group">
          <label className="candidate-label">Preferred Candidate =</label>
          <input type="text" className="candidate-input" />
        </div>
        <button className="cast-button">Cast</button>
      </div>
    </div>
  );
}

export default Election;

