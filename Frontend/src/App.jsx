import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Products from './components/pages/Products';
import MyOrders from './components/pages/MyOrders';
import Payments from './components/forms/PaymentForm';
import Wishlist from './components/pages/Wishlist';
import PaymentHistory from './components/pages/PaymentHistory';
import RoleBasedRoute from './components/layout/RoleBasedRoute';
import DriverDashboard from './components/Dashboard';

function App() {




  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<Home />} >
                  <Route path="my-orders" element={<MyOrders />} />
                  <Route path="products" element={<Products />} />
                  <Route path='payments' element={<Payments />}></Route>
                  <Route path='payments-history' element={<PaymentHistory />}></Route>
                  <Route path='driver-dashboard' element={<DriverDashboard />}></Route>
                  
                  </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
