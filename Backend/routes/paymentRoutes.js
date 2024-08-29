const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();

router.post('/payment', (req, res) => {
    const { orderId, paymentMethod, amount, status } = req.body;
    console.log('Received payment data:', { orderId, paymentMethod, amount, status }); 
    
    const paymentQuery = `INSERT INTO payments (order_id, payment_method, amount, status) VALUES (?, ?, ?, ?)`;
  
    db.query(paymentQuery, [orderId, paymentMethod, amount, status], (err, paymentResult) => {
      if (err) {
        console.error('Error saving payment:', err);
        return res.status(500).send('Error saving payment');
      } 
  
      const driverId = 1;
      const deliveryStatus = 'Assigned';  
      const assignedTime = new Date();   
  
      const deliveryQuery = `
        INSERT INTO deliveries (order_id, driver_id, status, assigned_time) 
        VALUES (?, ?, ?, ?)
      `;
      
      db.query(deliveryQuery, [orderId, driverId, deliveryStatus, assignedTime], (err, deliveryResult) => {
        if (err) {
          console.error('Error saving delivery:', err);
          return res.status(500).send('Error saving delivery');
        }
  
        res.status(200).send('Payment and delivery saved successfully');
      });
    });
  });
  


  router.get('/payment-history', authenticateToken, (req, res) => {
    const customerId = req.user.id;
    
    console.log("User ID:", customerId);
  
    const query = `
      SELECT p.*
      FROM payments p
      INNER JOIN orders o ON p.order_id = o.id
      WHERE o.customer_id = ?
    `;
  
    db.query(query, [customerId], (err, results) => {
      if (err) {
        console.error('Error fetching payments:', err.message);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(results);
      console.log("Results:", results);
    });
  });
  




  

module.exports = router;
