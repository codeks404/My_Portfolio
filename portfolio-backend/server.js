require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*'
  })
);

// --- Connect to MongoDB ---
connectDB();

// --- Routes ---
app.use('/api', portfolioRoutes);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio API is running.');
});

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
