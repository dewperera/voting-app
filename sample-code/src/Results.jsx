import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [winner, setWinner] = useState(null); // State to hold the winner's information
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch vote results from the backend
  const fetchVoteResults = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/votes/countByCandidate');
      
      // Log the response data for debugging
      console.log('Response data:', response.data);

      if (response.data && Object.keys(response.data).length > 0) {
        const formattedResults = Object.entries(response.data).map(([candidateId, voterCount]) => ({
          candidateId,
          voterCount
        }));
        setResults(formattedResults);
        setError(null); // Clear error if fetch is successful

        // Find the candidate with the most votes
        const highestVote = Math.max(...formattedResults.map(result => result.voterCount));
        const winningCandidate = formattedResults.find(result => result.voterCount === highestVote);
        setWinner(winningCandidate); // Set the winner's information
      } else {
        console.log('No vote data found.');
        setResults([]);
        setError('No results available.'); // Update error message
        setWinner(null); // Clear winner if no results
      }
    } catch (error) {
      console.error('Error fetching election results:', error);
      setResults([]); // Clear results on error
      setError('Error fetching election results.'); // Set error message
      setWinner(null); // Clear winner on error
    }
  };

  // Fetch results when component loads
  useEffect(() => {
    fetchVoteResults();
  }, []);

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

      <button className="navigate-button" onClick={() => navigate('/election')}>
        Go to Election
      </button>
    </div>
  );
}

export default Results;
