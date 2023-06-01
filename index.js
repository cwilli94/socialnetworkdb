const seedUsers = require('./seeds/user-seeds');
const seedThoughts = require('./seeds/thought-seeds');
const mongoose = require('mongoose');
const { User, Thought } = require('./models/models');
const connectDB = require('./config/connection');

const seedAll = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing data
    await Promise.all([User.deleteMany(), Thought.deleteMany()]);

    // Seed users
    const users = await seedUsers();
    console.log('Users seeded successfully');

    // Seed thoughts
    await seedThoughts(users);
    console.log('Thoughts seeded successfully');

    console.log('Data seeded successfully');

    // Disconnect from the database
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Run the seed function
seedAll();
