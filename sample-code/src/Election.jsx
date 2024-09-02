import React from 'react';
import './Election.css';

function Election() {
  return (
    <div className="cast-votes-container">
      <div className="header"><h3><b>CANDIDATES</b></h3></div>
      <div className="button-group">
      <label className="candidate-label1 pink">01</label>
        <label className="candidate-label1 green">02</label>
        <label className="candidate-label1 dark-green">03</label>
        <label className="candidate-label1 red">04</label>
      </div>
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
