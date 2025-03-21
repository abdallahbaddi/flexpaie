const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const roleService = {
  // Get all roles
  async getAllRoles() {
    return prisma.role.findMany();
  },

  // Get role by ID
  async getRoleById(id) {
    return prisma.role.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });
  },

  // Get role by name
  async getRoleByName(name) {
    return prisma.role.findUnique({
      where: { name }
    });
  },

  // Create role
  async createRole(roleData) {
    return prisma.role.create({
      data: roleData
    });
  },

  // Update role
  async updateRole(id, roleData) {
    return prisma.role.update({
      where: { id },
      data: roleData
    });
  },

  // Delete role
  async deleteRole(id) {
    return prisma.role.delete({
      where: { id }
    });
  }
};

module.exports = roleService;