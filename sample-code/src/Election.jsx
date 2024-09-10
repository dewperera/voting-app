import React, { useState, useEffect } from 'react';
import './Election.css';

function Election() {
  const [showCandidates, setShowCandidates] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedVoter, setSelectedVoter] = useState('');

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

  const handleVote = () => {
    console.log('Casting vote for:', selectedCandidate, 'by voter:', selectedVoter);
  };

  return (
    <div className="cast-votes-container">
      <div className="vote-box">
        <h2 className="vote-title">CAST VOTES</h2>
        <div className="input-group">
          <label className="voter-label">Voter ID =</label>
          <select
            className="voter-input"
            value={selectedVoter}
            onChange={e => setSelectedVoter(e.target.value)}
          >
            <option value="">Select Voter ID</option>
            {voters.length > 0 ? (
              voters.map(voter => (
                <option key={voter.vid} value={voter.vid}>
                  {voter.vid} {/* Display only voter ID */}
                </option>
              ))
            ) : (
              <option value="">No voters available</option>
            )}
          </select>
        </div>
        <div className="input-group">
          <label className="candidate-label">Preferred Candidate =</label>
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
        <button className="cast-button" onClick={handleVote}>Cast</button>
      </div>

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
                <th>Experience</th> {/* Changed to 'Experience' */}
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr key={candidate.cid}>
                  <td>{candidate.cid}</td>
                  <td>{candidate.cname}</td>
                  <td>{candidate.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Election;
