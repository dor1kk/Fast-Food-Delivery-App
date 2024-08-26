const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();

router.post('/payment', (req, res) => {
    const { orderId, paymentMethod, amount, status } = req.body;
    console.log('Received payment data:', { orderId, paymentMethod, amount, status }); // Add this line
    
    const query = `INSERT INTO payments (order_id, payment_method, amount, status) VALUES (?, ?, ?, ?)`;
    db.query(query, [orderId, paymentMethod, amount, status], (err, result) => {
      if (err) {
        console.error('Error saving payment:', err);
        res.status(500).send('Error saving payment');
      } else {
        res.status(200).send('Payment saved successfully');
      }
    });
  });


  router.get('/payment-history', authenticateToken, (req, res) => {
    const customerId = req.user.id;
  
    db.query('SELECT * FROM payments p inner join orders o on o.id=p.order_id inner join users u on o.customer_id=u.id  WHERE customer_id = ?', [customerId], (err, results) => {
      if (err) {
        console.error('Error fetching payments:', err.message);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(results);
    });
  });




  

module.exports = router;
