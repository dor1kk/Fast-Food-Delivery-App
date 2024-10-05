import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './components/Home';
import Products from './components/Customer-Pages/Products';
import MyOrders from './components/Customer-Pages/MyOrders';
import Payments from './components/forms/PaymentForm';
import PaymentHistory from './components/Customer-Pages/PaymentHistory';
import DriverDashboard from './components/Driver-Pages/DriverDashboard';
import ActiveDeliveries from './components/Driver-Pages/ActiveDeliveries';
import CompletedDeliveries from './components/Driver-Pages/CompletedDeliveries';
import Dashboard from './components/Admin/Dashboard';
import AdminHome from './components/Admin';
import Profile from './components/Customer-Pages/Profile';
import Login from './components/auth/login';
import Register from './components/auth/register';
import ProtectedRoute from './components/layout/protectedRoute';
import Favorites from './components/Customer-Pages/Favorites';

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect routes that require authentication */}
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} >
            <Route path="my-orders" element={<ProtectedRoute element={<MyOrders />} />} />
            <Route path="products" element={<ProtectedRoute element={<Products />} />} />
            <Route path="payments" element={<ProtectedRoute element={<Payments />} />} />
            <Route path="payments-history" element={<ProtectedRoute element={<PaymentHistory />} />} />
            <Route path="driver-dashboard" element={<ProtectedRoute element={<DriverDashboard />} />} />
            <Route path="active-deliveries" element={<ProtectedRoute element={<ActiveDeliveries />} />} />
            <Route path="completed-deliveries" element={<ProtectedRoute element={<CompletedDeliveries />} />} />
            <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path='favorites' element={<Favorites />}></Route>

          </Route>

          {/* Protect admin routes */}
          <Route path="/admin" element={<ProtectedRoute element={<AdminHome />} />} >
            <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Route>

          {/* Default home route */}
          <Route path="/" element={<Home />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
