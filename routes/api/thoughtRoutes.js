const express = require('express');
const Thought = require('../../models/thought');
const mongoose = require('mongoose');

const router = express.Router();

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndRemove(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reaction = thought.reactions.create(req.body);
    thought.reactions.push(reaction);
    await thought.save();
    res.status(201).json(reaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reactionId = req.params.reactionId;
    thought.reactions.pull(reactionId);
    await thought.save();
    res.json({ message: 'Reaction removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
