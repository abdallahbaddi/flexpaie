const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const employeeService = {
  // Créer un utilisateur et un employé
  async createEmployeeWithUser(userData, employeeData) {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà.');
      }

      // Créer l'utilisateur
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          role: {
            connect: { name: userData.role }, // Associer le rôle
          },
        },
      });

        // Créer l'employé et l'associer à l'utilisateur
        const newEmployee = await prisma.employee.create({
        data: {
            ...employeeData,
            baseSalary: parseFloat(employeeData.baseSalary) || 0, // Assurer que baseSalary est un nombre
            childrenCount: parseInt(employeeData.childrenCount) || 0, // Assurer que childrenCount est un nombre
            birthDate: new Date(employeeData.birthDate), // Convertir en objet Date
            hireDate: new Date(employeeData.hireDate),   // Convertir en objet Date
            userId : newUser.id, // Associer l'utilisateur à l'employé
            companyId : employeeData.company.companyId, // Associer l'employé à l'entreprise
        },
        });

      return { user: newUser, employee: newEmployee };
    } catch (error) {
      console.error('Erreur lors de la création de l\'employé et de l\'utilisateur:', error);
      throw error;
    }
  },
};

module.exports = employeeService;