require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Required to resolve the build directory

const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app's build directory
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // If a route doesn't match an API, serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
