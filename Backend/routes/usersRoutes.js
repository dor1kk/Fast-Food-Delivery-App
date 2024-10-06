const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();



router.get('/drivers', (req, res) => {
  
    db.query('SELECT * from users u inner join delivery_drivers dd on u.id=dd.user_id ', (err, results) => {
      if (err) {
        console.error('Error fetching drivers:', err.message);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(results);
    });
  });


  module.exports = router;
