const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import individual route files
const usersRoutes = require('./users');
const thoughtsRoutes = require('./thoughts');

// Register the routes
router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;
