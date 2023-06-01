const express = require('express');
const User = require('../../models/user');
const mongoose = require('mongoose');

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single user by _id and populate thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT to update a user by _id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE to remove a user by _id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST to add a friend for a user
router.post('/:userId/friends', async (req, res) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the friendId to the user's friends array
    user.friends.push(friendId);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE to remove a friend from a user
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the friend from the user's friends array
    user.friends = user.friends.filter((friend) => friend && friend.toString() !== friendId);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
