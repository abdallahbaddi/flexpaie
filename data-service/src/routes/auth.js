const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { validateLogin } = require('../utils/validators');

// Route de connexion
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const auth = await authService.login(email, password);
    res.json(auth);
  } catch (error) {
    next(error);
  }
});

// Route pour vérifier si un token est valide
router.get('/verify', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant ou format incorrect' });
    }
    
    const token = authHeader.split(' ')[1];
    const userData = authService.verifyToken(token);
    
    res.json({ valid: true, user: userData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;