import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  // Fetch vote results from the backend
  const fetchVoteResults = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/votes/countByCandidate');
      if (response.data && Object.keys(response.data).length > 0) {
        const formattedResults = Object.entries(response.data).map(([candidateId, voterCount]) => ({
          candidateId,
          voterCount,
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

  // Clear votes and reset the results
  const clearVotes = async () => {
    try {
      await axios.delete('http://localhost:8082/api/votes/clear');
      window.alert('Votes cleared successfully!');
      // Reset results and winner after clearing votes
      setResults([]);
      setWinner(null);
      setMessage('Votes have been cleared. Ready for a new election.');
    } catch (error) {
      console.error('Error clearing votes:', error.response ? error.response.data : error.message);
      setError('Error clearing votes.');
    }
  };

  // Fetch results when component loads
  useEffect(() => {
    fetchVoteResults();
  }, []);

  // Function to handle new election
  const handleNewElection = async () => {
    try {
      await clearVotes();
      console.log('Navigating to /results');
      navigate('/results');
    } catch (error) {
      console.error('Error during new election process:', error);
      setError('Error initiating new election.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1><b>ELECTION RESULTS</b></h1>
      </div>

      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}

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
        <button className="new-election-button" onClick={handleNewElection}>
          New Election
        </button>
      </div>
    </div>
  );
}

export default Results;

