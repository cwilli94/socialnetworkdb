const mongoose = require('mongoose');
const { Thought } = require('../models/thought');

const thoughtData = [
  { thoughtText: 'Thought 1', username: 'user1' },
  { thoughtText: 'Thought 2', username: 'user2' },
  { thoughtText: 'Thought 3', username: 'user3' },
  { thoughtText: 'Thought 4', username: 'user4' },
  { thoughtText: 'Thought 5', username: 'user5' },
  { thoughtText: 'Thought 6', username: 'user1', reactions: [{ reactionBody: 'Reaction 1', username: 'user2' }] },
  { thoughtText: 'Thought 7', username: 'user2', reactions: [{ reactionBody: 'Reaction 2', username: 'user1' }] },
  { thoughtText: 'Thought 8', username: 'user3' },
  { thoughtText: 'Thought 9', username: 'user4', reactions: [{ reactionBody: 'Reaction 3', username: 'user5' }] },
  { thoughtText: 'Thought 10', username: 'user5', reactions: [{ reactionBody: 'Reaction 4', username: 'user3' }] },
];

const seedThoughts = async (users) => {
  try {
    const thoughtsWithUsers = thoughtData.map((thought) => {
      const user = users.find((user) => user.username === thought.username);
      return {
        ...thought,
        username: user._id,
      };
    });

    await Thought.insertMany(thoughtsWithUsers);
  } catch (error) {
    console.error('Error seeding thoughts:', error);
    throw error;
  }
};

module.exports = seedThoughts;
