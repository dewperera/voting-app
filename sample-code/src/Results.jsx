import React, { useState } from 'react';
import './results.css';
import Election from './Election'; // Import the Election component

function Results() {
  const [candidate1, setCandidate1] = useState('');
  const [candidate2, setCandidate2] = useState('');
  const [candidate3, setCandidate3] = useState('');
  const [candidate4, setCandidate4] = useState('');
  
  // State to control the navigation to Election component
  const [showElection, setShowElection] = useState(false);

  // Function to handle the "Election" button click
  const handleElectionClick = () => {
    setShowElection(true);
  };

  // If showElection is true, render the Election component
  if (showElection) {
    return <Election />;
  }

  return (
    <div className="container">
      <div className="header"><h1><b>ELECTION RESULTS</b></h1></div>

      <div className="results-row">
        <div className="result candidate-1">01</div>
        <div className="equal-sign">=</div>
        <input 
          type="text" 
          className="result candidate-1 input-box" 
          value={candidate1} 
          onChange={(e) => setCandidate1(e.target.value)} 
        />
        <div className="result candidate-1">%</div>
      </div>

      <div className="results-row">
        <div className="result candidate-2">02</div>
        <div className="equal-sign">=</div>
        <input 
          type="text" 
          className="result candidate-2 input-box" 
          value={candidate2} 
          onChange={(e) => setCandidate2(e.target.value)} 
        />
        <div className="result candidate-2">%</div>
      </div>

      <div className="results-row">
        <div className="result candidate-3">03</div>
        <div className="equal-sign">=</div>
        <input 
          type="text" 
          className="result candidate-3 input-box" 
          value={candidate3} 
          onChange={(e) => setCandidate3(e.target.value)} 
        />
        <div className="result candidate-3">%</div>
      </div>

      <div className="results-row">
        <div className="result candidate-4">04</div>
        <div className="equal-sign">=</div>
        <input 
          type="text" 
          className="result candidate-4 input-box" 
          value={candidate4} 
          onChange={(e) => setCandidate4(e.target.value)} 
        />
        <div className="result candidate-4">%</div>
      </div>

      <button className="election-button" onClick={handleElectionClick}>Election</button>
    </div>
  );
}

export default Results;
