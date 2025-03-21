const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const authService = {
  /**
   * Authentifie un utilisateur avec son email et mot de passe
   */
  async login(email, password) {
    // Rechercher l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      throw { status: 401, message: 'Email ou mot de passe incorrect' };
    }

    // Dans un environnement de production, vous utiliseriez bcrypt pour comparer les mots de passe hashés
    // Exemple: const isPasswordValid = await bcrypt.compare(password, user.password);
    // Pour simplifier dans cet exemple, nous comparons directement
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      throw { status: 401, message: 'Email ou mot de passe incorrect' };
    }

    // Générer un token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name
      }
    };
  },

  /**
   * Vérifie si un token JWT est valide
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw { status: 401, message: 'Token invalide ou expiré' };
    }
  }
};

module.exports = authService;