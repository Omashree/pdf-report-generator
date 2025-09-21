import React, { useState } from 'react';

function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const baseUrl = import.meta.env.VITE_baseUrl || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? baseUrl+'/api/auth/login' : baseUrl+'/api/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(data.message || '');
      if (response.ok && data.token) {
        onAuthSuccess(data.token);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={handleToggle} className="text-sm text-blue-500 hover:underline">
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
    </div>
  );
}

export default AuthForm;