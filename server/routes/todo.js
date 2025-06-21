const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ tenantId: req.user.tenantId });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { task } = req.body;

    const newTodo = new Todo({
      task,
      completed: false,
      tenantId: req.user.tenantId,
      userId: req.user.id
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating todo' });
  }
});

module.exports = router;
