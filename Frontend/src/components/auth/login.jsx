import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { loginUser } from '../../api/AuthApi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setAuthToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(formData.email, formData.password); 
      
      const { token, user } = data;
      
      setAuthToken(token);
      setUser(user);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex w-full max-w-4xl h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login
          </button>
          <div className="flex justify-between mt-4 text-sm">
            <a href="/forgot-password" className="text-gray-600 hover:underline">
              Forgot Password?
            </a>
            <a href="/register" className="text-gray-600 hover:underline">
              Register
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

export default Login;
