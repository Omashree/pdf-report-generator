import { useState } from 'react'
import AuthForm from './components/Authform';
import ReportGenerator from './components/ReportGenerator';
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleAuth = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {!token ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
            <AuthForm onAuthSuccess={handleAuth} />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Report Generator</h1>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Logout
              </button>
            </div>
            <ReportGenerator token={token} />
          </>
        )}
      </div>
    </div>
  );
}

export default App
