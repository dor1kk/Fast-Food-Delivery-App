const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes=require('./routes/paymentRoutes')
const deliveryRoutes=require('./routes/deliveriesRoutes')

app.use('/api', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/deliveries',deliveryRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
