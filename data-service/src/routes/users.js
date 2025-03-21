const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { validateUserCreate, validateUserUpdate } = require('../utils/validators');

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Create new user
router.post('/', validateUserCreate, async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Update user
router.put('/:id', validateUserUpdate, async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Delete user
router.delete('/:id', async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Get users by role
router.get('/role/:roleId', async (req, res, next) => {
  try {
    const users = await userService.getUsersByRole(req.params.roleId);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;