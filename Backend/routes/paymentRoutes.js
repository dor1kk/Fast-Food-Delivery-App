const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();


router.post('/payment', (req, res) => {
  const { orderId, paymentMethod, amount } = req.body;
  const status = 'completed';  // Payment status

  console.log('Received payment data:', { orderId, paymentMethod, amount, status });

  // Insert payment record
  const paymentQuery = `INSERT INTO payments (order_id, payment_method, amount, status) VALUES (?, ?, ?, ?)`;

  db.query(paymentQuery, [orderId, paymentMethod, amount, status], (err, paymentResult) => {
    if (err) {
      console.error('Error saving payment:', err);
      return res.status(500).send('Error saving payment');
    }

    const updateOrderStatusQuery = `UPDATE Orders SET Status = 'Delivered' WHERE id = ?`;

    db.query(updateOrderStatusQuery, [orderId], (err, updateResult) => {
      if (err) {
        console.error('Error updating order status:', err);
        return res.status(500).send('Error updating order status');
      }

      // Fetch drivers by role
      const driversQuery = 'SELECT id FROM users WHERE role = ?';

      db.query(driversQuery, ['driver'], (err, driversResult) => {
        if (err) {
          console.error('Error fetching drivers:', err);
          return res.status(500).send('Error fetching drivers');
        }

        if (driversResult.length === 0) {
          return res.status(404).send('No drivers found');
        }

        // Insert delivery records for all drivers
        const deliveryStatus = 'Assigned';
        const assignedTime = new Date();

        const deliveryQuery = `
          INSERT INTO deliveries (order_id, driver_id, status, assigned_time) 
          VALUES ?
        `;

        // Prepare values for insertion
        const deliveryValues = driversResult.map(driver => [orderId, driver.id, deliveryStatus, assignedTime]);

        db.query(deliveryQuery, [deliveryValues], (err, deliveryResult) => {
          if (err) {
            console.error('Error saving deliveries:', err);
            return res.status(500).send('Error saving deliveries');
          }

          res.status(200).send('Payment and deliveries saved successfully');
        });
      });
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
