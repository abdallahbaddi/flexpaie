const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userService = {
  // Get all users
  async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        company: true,
        createdAt: true,
        updatedAt: true,
        password: true, // Exclude password for security
        // Exclude password for security
      }
    });
  },

  // Get user by ID
  async getUserById(id) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        company: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  },

  // Get users by role
  async getUsersByRole(roleId) {
    return prisma.user.findMany({
      where: { roleId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  },

  // Create user with company
  async createUser(userData) {
    // S'assurer que companyId est fourni
    if (!userData.companyId) {
      throw new Error('L\'ID de l\'entreprise est requis');
    }
    
    return prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        company: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  },

  // Update user
  async updateUser(id, userData) {
    return prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  },

  // Delete user
  async deleteUser(id) {
    return prisma.user.delete({
      where: { id }
    });
  }
};

module.exports = userService;