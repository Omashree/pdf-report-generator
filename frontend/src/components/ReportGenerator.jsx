import React, { useState } from 'react';

function ReportGenerator({ token }) {
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');

  const baseUrl = 'http://localhost:5000';

  const handleGenerate = async (e) => {
    e.preventDefault();
    setMessage('Generating report...');

    try {
      const response = await fetch(baseUrl+'/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="report-generator space-y-4">
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Session ID</label>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="e.g., session_001"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Generate Report
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}

export default ReportGenerator;