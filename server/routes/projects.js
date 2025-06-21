const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/authmiddleware');

// GET /api/projects - fetch all projects for a tenant
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ tenantId: req.user.tenantId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// POST /api/projects - create a new project
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
      tenantId: req.user.tenantId
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project' });
  }
});

module.exports = router;
