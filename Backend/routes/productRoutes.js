const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
});

router.post('/favorite', authenticateToken, (req, res) => {
  const { productId } = req.body;
  const date = new Date();
  const customerId = req.user.id;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  // Check if the product is already in the user's wishlist
  db.query(
    'SELECT * FROM wishlists WHERE user_id = ? AND product_id = ?',
    [customerId, productId],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Server error');
      }

      if (results.length > 0) {
        return res.status(200).json({ error: "Product is already in favorites" });
      }

      db.query(
        'INSERT INTO wishlists (user_id, product_id, added_date) VALUES (?, ?, ?)',
        [customerId, productId, date],
        (err, results) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Server error');
          }
          return res.status(200).json({ message: "Product added successfully" });
        }
      );
    }
  );
});


router.get('/favorites', authenticateToken, (req, res) => {
  const customerId = req.user.id;

  db.query(
    'SELECT p.id AS product_id, p.name, p.price, p.image FROM wishlists w JOIN products p ON w.product_id = p.id WHERE w.user_id = ?',
    [customerId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No favorites found' });
      }
      res.json(results);
    }
  );
});



module.exports = router;
