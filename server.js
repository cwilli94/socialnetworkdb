const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to the database
mongoose
  .connect('mongodb://127.0.0.1:27017/socialnetworkdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
