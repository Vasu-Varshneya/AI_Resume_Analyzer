// src/Middle.js
import React from "react"; // Make sure this import matches your file name
import "./Middle.css";
const Middle = () => {
  return (
    <div className="middle-container">
      <div className="middle-header">
        <h1>
          <span className="highlight">Analysing the resume made faster and easier.</span> 
        </h1><br></br>
      </div>
      <div className="content">
        <div className="grid">
          <div className="card_code blue">
            <span className="icon">&lt;/&gt;</span>
            <div>
              <div>Upload Your Resume</div>
              
            </div>
          </div>
          <div className="card_code green">
            <span className="icon">≡</span>
            <div>
              <div>Know your</div>
              <div>ATS Score</div>
            </div>
          </div>
          <div className="card_code teal">
            <span className="icon">⋘</span>
            <div>
              <div>Analyse your</div>
              <div>strengths and weaknesses.</div>
            </div>
          </div>
          <div className="card_code orange">
            <span className="icon">∑</span>
            <div>
              <div>Generate Cover letter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;