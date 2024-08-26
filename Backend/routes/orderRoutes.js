const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { customer_name, delivery_address, total_price, status, special_instructions, delivery_fee, items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Order items are required');
  }

  const connection = db.promise();
  try {
    await connection.query('START TRANSACTION');

    const [orderResult] = await connection.query('INSERT INTO orders (customer_id, order_date, status, total_price, delivery_address) VALUES (?, NOW(), ?, ?, ?)', [
      req.user.id, 
      status || 'Pending',
      total_price || 0,
      delivery_address || ''
    ]);

    const orderId = orderResult.insertId;

    const orderItems = items.map(item => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
      item.total_price
    ]);

    await connection.query('INSERT INTO order_items (order_id, product_id, quantity, price, total_price) VALUES ?', [orderItems]);

    await connection.query('COMMIT');
    res.status(201).send('Order placed successfully');
  } catch (error) {
    await connection.query('ROLLBACK');
    res.status(500).send('Error placing order');
  }
});


router.get('/customer-orders', authenticateToken, (req, res) => {
    const customerId = req.user.id;
  
    db.query('SELECT * FROM orders o inner join order_items oi on o.id=oi.order_id inner join products p on oi.product_id=p.id  WHERE customer_id = ?', [customerId], (err, results) => {
      if (err) {
        console.error('Error fetching orders:', err.message);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(results);
    });
  });

module.exports = router;
