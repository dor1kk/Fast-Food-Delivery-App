import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null); // Define user state

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
