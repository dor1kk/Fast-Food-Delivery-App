import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Products from './components/Customer-Pages/Products';
import MyOrders from './components/Customer-Pages/MyOrders';
import Payments from './components/forms/PaymentForm';
import Wishlist from './components/Customer-Pages/Wishlist';
import PaymentHistory from './components/Customer-Pages/PaymentHistory';
import RoleBasedRoute from './components/layout/RoleBasedRoute';
import DriverDashboard from './components/Driver-Pages/DriverDashboard';
import ActiveDeliveries from './components/Driver-Pages/ActiveDeliveries';
import CompletedDeliveries from './components/Driver-Pages/CompletedDeliveries';

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
                  <Route path='active-deliveries' element={<ActiveDeliveries />}></Route>
                  <Route path='completed-deliveries' element={<CompletedDeliveries />}></Route>
                  
                  </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
