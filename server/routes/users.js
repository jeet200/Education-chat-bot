const express = require('express');
const router = express.Router();

// Simple in-memory user storage for demo
let users = {};

// Create or get user profile
router.post('/profile', (req, res) => {
  const { userId, name, grade, preferredLanguage, subjects } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const user = {
    userId,
    name: name || `Student ${userId}`,
    grade: grade || 6,
    preferredLanguage: preferredLanguage || 'en',
    subjects: subjects || ['math', 'science', 'technology'],
    createdAt: users[userId]?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users[userId] = user;

  res.json({
    success: true,
    user,
    timestamp: new Date().toISOString()
  });
});

// Get user profile
router.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;

  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    user: users[userId],
    timestamp: new Date().toISOString()
  });
});

// Update user preferences
router.put('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[userId] = {
    ...users[userId],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    user: users[userId],
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 