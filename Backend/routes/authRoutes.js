const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();
const JWT_SECRET = 'mysecretkey';

router.post('/register', (req, res) => {
    const { email, password, username } = req.body;
    
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required' });
    }
  
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ message: 'Error hashing password' });
      }
  
      db.query('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hash, username], (err) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered' });
      });
    });
  });
  

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error logging in' });
      if (results.length === 0) return res.status(401).json({ message: 'User not found' });
  
      const user = results[0];
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) return res.status(500).json({ message: 'Error comparing passwords' });
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user }); // Include user object in response
      });
    });
  });
  

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
