import React, { useState } from 'react'

const LoginPage = () => {

  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement login logic based on userType, email, and password
    // (e.g., send data to backend for authentication and redirect)
    console.log('User Type:', userType);
    console.log('Email:', email);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userType" className="block text-gray-700 mb-2">
            User Type:
          </label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!userType || !email || !password} // Disable button if required fields are empty
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
