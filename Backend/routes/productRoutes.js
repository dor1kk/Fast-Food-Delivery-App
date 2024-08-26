const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.json(results);
  });
});

module.exports = router;
