import React, { useContext } from 'react';
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
                  <Route path='profile' element={<Profile />}></Route>

                  
          </Route>

          <Route path='/' element={<Home />}></Route>
         
          <Route path="/admin" element={<AdminHome />} >
                  <Route path="dashboard" element={<Dashboard />} /> 
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
