import React, { useState } from 'react';
import axios from 'axios';
import { registerUser } from '../../api/AuthApi';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, username); 
      setMessage('Registration successful!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-800">
      <div className="flex w-full max-w-4xl h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">{message}</p>
          <div className="flex justify-between mt-4 text-sm">
            <a href="/login" className="text-gray-600 hover:underline">
              Already have an account? Login
            </a>
          </div>
        </div>
        <div
          className="w-1/2 bg-cover"
          style={{
            backgroundImage: 'url(https://thumbs.dreamstime.com/b/burger-pattern-hand-drawn-illustration-bright-cartoon-illustration-menu-design-fabric-wallpaper-burger-seamless-pattern-122893291.jpg)',
          }}
        >
          <div className="flex justify-end p-2">
            <button className="text-white text-lg">
              &times;
            </button>
          </div>
          <div className="flex flex-col justify-center h-full p-8">
            <h2 className="text-white text-3xl font-bold">Quick Service Restaurant</h2>
            <p className="text-white mt-4">Your Perfect Place to Taste Delicious Foods</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
