const express = require('express');
const router = express.Router();
const roleService = require('../services/roleService');
const { validateRoleCreate, validateRoleUpdate } = require('../utils/validators');

// Get all roles
router.get('/', async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});

// Get role by ID
router.get('/:id', async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
});

// Create new role
router.post('/', validateRoleCreate, async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
});

// Update role
router.put('/:id', validateRoleUpdate, async (req, res, next) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
});

// Delete role
router.delete('/:id', async (req, res, next) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;