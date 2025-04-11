import React, { useState } from 'react';  // <-- Import useState here
import logo from './logo.svg';
import './App.css';

function App() {

  // Step 1: Use state for form values and commission results
  const [localSalesCount, setLocalSalesCount] = useState('');
  const [foreignSalesCount, setForeignSalesCount] = useState('');
  const [averageSaleAmount, setAverageSaleAmount] = useState('');
  const [fcamaraCommission, setFcamaraCommission] = useState(null);
  const [competitorCommission, setCompetitorCommission] = useState(null);

  // Step 2: Handle form submission
  const calculate = async (e) => {
    e.preventDefault();  // Prevent form from refreshing

    // Step 3: Send data to backend and handle the response
    const response = await fetch('http://localhost:5000/Commision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        localSalesCount: parseInt(localSalesCount),
        foreignSalesCount: parseInt(foreignSalesCount),
        averageSaleAmount: parseFloat(averageSaleAmount)
      })
    });

    const data = await response.json();  // Get JSON response from backend
    setFcamaraCommission(data.fCamaraCommissionAmount);  // Update FCamara commission state
    setCompetitorCommission(data.competitorCommissionAmount);  // Update Competitor commission state
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {/* Your existing form with state-bound inputs */}
          <form onSubmit={calculate}>
            <label htmlFor="localSalesCount">Local Sales Count</label>  
            <input 
              name="localSalesCount" 
              value={localSalesCount}
              onChange={(e) => setLocalSalesCount(e.target.value)} 
            /><br />

            <label htmlFor="foreignSalesCount">Foreign Sales Count</label>  
            <input 
              name="foreignSalesCount" 
              value={foreignSalesCount}
              onChange={(e) => setForeignSalesCount(e.target.value)} 
            /><br />
            
            <label htmlFor="averageSaleAmount">Average Sale Amount</label>  
            <input 
              name="averageSaleAmount" 
              value={averageSaleAmount}
              onChange={(e) => setAverageSaleAmount(e.target.value)} 
            /><br />

            <button type="submit">Calculate</button>
          </form>
        </div>
      </header>

      {/* Step 4: Display results dynamically */}
      <div>
        <h3>Results</h3>
        <p>Total FCamara commission: {fcamaraCommission !== null ? fcamaraCommission : '—'}</p>
        <p>Total Competitor commission: {competitorCommission !== null ? competitorCommission : '—'}</p>
      </div>
    </div>
  );
}

export default App;
