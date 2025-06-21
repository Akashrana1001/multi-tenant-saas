const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authmiddleware');

// GET: Fetch team members
router.get('/', authMiddleware, async (req, res) => {
  try {
    const teamMembers = await User.find({
      tenantId: req.user.tenantId,
      isAdmin: false
    }).select('-password');
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team' });
  }
});

// ✅ POST: Add a new team member
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Prevent duplicate email
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      tenantId: req.user.tenantId,
      isAdmin: false // Always false for team members
    });

    await newUser.save();
    res.status(201).json({ message: 'Team member created successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating team member' });
  }
});

module.exports = router;

    // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTViNTBmZmNjNjFkNjM4MmVhZTRhYiIsInRlbmFudElkIjoiYW1hem9uIiwiaWF0IjoxNzUwNTE0NDExLCJleHAiOjE3NTA2MDA4MTF9.RBFH9y9abSR2yYh1YyKSDbPfqAsuRJj9T1lI2lyJLlo",
