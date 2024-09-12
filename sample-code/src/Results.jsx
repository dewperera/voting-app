import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './LoginForm'; // Import LoginForm component
import './results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // State to control login form visibility
  const navigate = useNavigate();

  // Function to fetch vote results from the backend
  const fetchVoteResults = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/votes/countByCandidate');
      if (response.data && Object.keys(response.data).length > 0) {
        const formattedResults = Object.entries(response.data).map(([candidateId, voterCount]) => ({
          candidateId,
          voterCount
        }));
        setResults(formattedResults);
        setError(null);

        const highestVote = Math.max(...formattedResults.map(result => result.voterCount));
        const winningCandidate = formattedResults.find(result => result.voterCount === highestVote);
        setWinner(winningCandidate);
      } else {
        setResults([]);
        setError('No results available.');
        setWinner(null);
      }
    } catch (error) {
      setResults([]);
      setError('Error fetching election results.');
      setWinner(null);
    }
  };

  // Fetch results when component loads
  useEffect(() => {
    if (!showLogin) {
      fetchVoteResults();
    }
  }, [showLogin]);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setShowLogin(false);
    fetchVoteResults();
  };

  if (showLogin) {
    return <LoginForm onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="container">
      <div className="header">
        <h1><b>ELECTION RESULTS</b></h1>
      </div>

      {error && <p className="error">{error}</p>}

      {winner && (
        <div className="winner-section">
          <h2 className="winner-title">Winner:</h2>
          <div className="winner-card">
            <div className="candidate-id">Candidate ID: {winner.candidateId}</div>
            <div className="voter-count">{winner.voterCount} votes</div>
          </div>
        </div>
      )}

      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <div className="results-grid">
          {results.map((result) => (
            <div className="result-card" key={result.candidateId}>
              <div className="candidate-id">Candidate ID: {result.candidateId}</div>
              <div className="voter-count">{result.voterCount} votes</div>
            </div>
          ))}
        </div>
      )}

      <div className="button-group">
        <button className="navigate-button" onClick={() => navigate('/election')}>
          Go to Election
        </button>
        <button className="new-election-button" onClick={() => navigate('/new-election')}>
          New Election
        </button>
      </div>
    </div>
  );
}

export default Results;
