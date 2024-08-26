import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setAuthToken, setUser } = useContext(AuthContext); // Retrieve setAuthToken and setUser from context
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
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        setAuthToken(token);  
        setUser(user);  
        alert('Login successful!');
        navigate('/home', { state: { email: formData.email } });
      } else {
        alert('Login failed: ' + await response.text());
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="modal">
      <h2>Login</h2>
      <label>
        Email:
        <input
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
