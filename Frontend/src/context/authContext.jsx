import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    // Retrieve token from localStorage
    return localStorage.getItem('authToken');
  });
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    // Save token and user to localStorage whenever they change
    if (authToken) localStorage.setItem('authToken', authToken);
    else localStorage.removeItem('authToken');
    
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [authToken, user]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
