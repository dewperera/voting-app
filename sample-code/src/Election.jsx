import React, { useState, useEffect } from 'react';
import './Election.css';
import { electionAPI } from './api/electionAPI';

function Election() {
  const [showCandidates, setShowCandidates] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [voterIdInput, setVoterIdInput] = useState('');

  // Pre-fetch candidate data when component mounts
  useEffect(() => {
    fetch('http://localhost:8080/api/candidates')
      .then(response => response.json())
      .then(data => {
        setCandidates(data);
      })
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  // Pre-fetch voter data when component mounts
  useEffect(() => {
    fetch('http://localhost:8081/api/voters')
      .then(response => response.json())
      .then(data => {
        setVoters(data);
      })
      .catch(error => console.error('Error fetching voters:', error));
  }, []);

  const handleViewCandidates = () => {
    setShowCandidates(!showCandidates);
  };

  const handleVote = async () => {
    if (!selectedCandidate || !voterIdInput) {
      window.alert('Please enter your NIC and select a candidate.');
      return;
    }

    const voterExists = voters.some(voter => voter.vid === voterIdInput);

    if (!voterExists) {
      window.alert('Invalid NIC NO. Please enter a valid NIC NO.');
      return;
    }

    const votePayload = {
      voterId: voterIdInput,
      candidateId: selectedCandidate
    };

    try {
      await electionAPI.createVote(votePayload);
      window.alert('Vote cast successfully!');
      // Clear selected items
      setSelectedCandidate('');
      setVoterIdInput('');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        window.alert('Voter has already cast a vote.');
      } else {
        window.alert(`Error casting vote: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <button className="candidates-button" onClick={handleViewCandidates}>
        {showCandidates ? 'Hide Candidates' : 'View Candidates'}
      </button>

      <div className="cast-votes-container">
        {/* Candidate Table on Left */}
        {showCandidates && (
          <div className="candidate-table">
            <h2 className="candidate-title">Candidates List</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Qualifications</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => (
                  <tr key={candidate.cid}>
                    <td>{candidate.cid}</td>
                    <td>{candidate.cname}</td>
                    <td>{candidate.experience}</td>
                    <td>{candidate.qualifications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Vote Form on Right */}
        <div className="vote-box">
          <h2 className="vote-title">CAST VOTES</h2>
          <div className="input-group">
            <label className="voter-label">Enter your NIC:</label>
            <input
              type="text"
              className="voter-input"
              value={voterIdInput}
              onChange={e => setVoterIdInput(e.target.value)}
              placeholder="NIC"
            />
          </div>
          <div className="input-group">
            <label className="candidate-label">Preferred Candidate:</label>
            <select
              className="candidate-input"
              value={selectedCandidate}
              onChange={e => setSelectedCandidate(e.target.value)}
            >
              <option value="">Select Candidate</option>
              {candidates.length > 0 ? (
                candidates.map(candidate => (
                  <option key={candidate.cid} value={candidate.cid}>
                    {candidate.cid}
                  </option>
                ))
              ) : (
                <option value="">No candidates available</option>
              )}
            </select>
          </div>
          <button className="cast-button" onClick={handleVote}>
            Cast
          </button>
        </div>
      </div>
    </div>
  );
}

export default Election;
