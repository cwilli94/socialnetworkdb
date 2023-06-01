const mongoose = require('mongoose');
const { User } = require('../models/user');

const userData = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' },
  { username: 'user3', email: 'user3@example.com' },
  { username: 'user4', email: 'user4@example.com' },
  { username: 'user5', email: 'user5@example.com' },
];

const seedUsers = async () => {
  try {
    const createdUsers = await User.insertMany(userData);
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
};

module.exports = seedUsers;
