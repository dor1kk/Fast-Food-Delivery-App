import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Orders from './components/home/Order';
import Products from './components/home/Products';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute element={<Dashboard />} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/home" element={<Home />}>
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
