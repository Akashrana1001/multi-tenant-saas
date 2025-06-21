const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const transporter = require('../config/mailer');
const crypto = require('crypto');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Reset your password',
      html: `
        <p>You requested a password reset.</p>
        <p>Click this link to reset: <a href="${resetUrl}">${resetUrl}</a></p>
      `,
    });

    res.json({ message: 'Reset email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending reset email' });
  }
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, tenantId } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      tenantId,
      isAdmin: true,
    });
    await user.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong in signup" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Wrong email or user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, tenantId: user.tenantId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tenantId: user.tenantId,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong with login" });
  }
});

module.exports = router;
