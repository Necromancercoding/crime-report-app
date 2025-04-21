// backend/addPredefinedUsers.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');  // Path to your User model

// Function to add predefined users
const addPredefinedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Predefined user
    const user1 = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',  // This will be hashed
    });

    // Save the user to the database
    await user1.save();
    console.log('Predefined users added');
  } catch (err) {
    console.error('Error adding predefined users:', err);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Call the function to add users
addPredefinedUsers();
