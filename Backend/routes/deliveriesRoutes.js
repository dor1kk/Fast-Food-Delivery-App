// routes/deliveriesRoutes.js
const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();

router.get('/active-deliveries', authenticateToken, (req, res) => {
    const driverId = req.user.id;
    db.query(`
        SELECT d.Status AS delivery_status, o.status AS order_status, d.*, o.*
        FROM deliveries d 
        INNER JOIN orders o ON o.id = d.order_id 
        WHERE d.Status = "Assigned" AND d.driver_id = ?;
    `, [driverId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Server error');
        }
        console.log('Raw Query Results:', results); 
        res.json(results);
    });
});

router.get('/completed-deliveries', authenticateToken, (req, res) => {
    const driverId = req.user.id;
    db.query(`
        SELECT d.Status AS delivery_status, o.status AS order_status, d.*, o.*
        FROM deliveries d 
        INNER JOIN orders o ON o.id = d.order_id 
        WHERE d.Status = "Delivered" AND d.driver_id = ?;
    `, [driverId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Server error');
        }
        console.log('Raw Query Results:', results); 
        res.json(results);
    });
});

router.patch('/:orderId', authenticateToken, (req, res) => {
    const { orderId } = req.params;
    const { delivered_time, delivery_status } = req.body;

    const validStatuses = ['Assigned', 'Out for Delivery', 'Delivered'];
    if (!validStatuses.includes(delivery_status)) {
        return res.status(400).send('Invalid status');
    }

    db.query(`
        UPDATE deliveries
        SET delivered_time = ?, status = ?
        WHERE order_id = ?;
    `, [delivered_time, delivery_status, orderId], (err, result) => {
        if (err) {
            console.error('Database update error:', err);
            return res.status(500).send('Server error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Delivery not found');
        }

        res.status(200).send('Delivery updated successfully');
    });
});

module.exports = router;
