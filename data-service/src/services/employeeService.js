const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const employeeService = {
  // Créer un utilisateur et un employé
  async createEmployeeWithUser(userData, employeeData, companyData) {
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
            companyId : companyData.companyId, // Associer l'employé à l'entreprise
        },
        });

      return { user: newUser, employee: newEmployee };
    } catch (error) {
      console.error('Erreur lors de la création de l\'employé et de l\'utilisateur:', error);
      throw error;
    }
  },
  // récupérer l'employé par ID
  async getEmployeeById(id) {
    try {
      const employee = await prisma.employee.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              createdAt: true,
            },
          },
        },
      });
      return employee;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'employé:', error);
      throw error;
    }
  },
  // Récupérer tous les employés d'une entreprise
  async getCompanyEmployees(companyId) {
    try {
      const employees = await prisma.employee.findMany({
        where: { companyId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              createdAt: true,
            },
          },
        },
      });
      return employees;
    } catch (error) {
      console.error('Erreur lors de la récupération des employés:', error);
      throw error;
    }
  },
};

module.exports = employeeService;