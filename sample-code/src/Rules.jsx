import React from 'react';
import './Rules.css';

const Rules = () => {
  const rules = [
    "All voters must be registered with valid identification to participate in the election.",
    "Each voter is allowed to cast only one vote per election.",
    "Voting must be conducted fairly, without any form of coercion or manipulation.",
    "The use of electronic devices for recording or transmitting votes is strictly prohibited.",
    "Campaigning is not allowed within a specified distance from the polling station.",
    "All candidates must adhere to ethical campaigning practices, avoiding any form of defamation or false statements.",
    "Votes will be counted in the presence of official observers to ensure transparency and fairness.",
    "The election results are final and cannot be challenged except in cases of proven fraud.",
    "Any violation of these rules will result in disqualification or other penalties as determined by the election committee."
  ];

  return (
    <div className="rules-regulations-container">
      {/* <h2 className="rules-title">Election Rules & Regulations</h2> */}
      <ul className="rules-list">
        {rules.map((rule, index) => (
          <li key={index} className="rule-item">
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rules;


