const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const companyService = {
  // Récupérer toutes les entreprises
  async getAllCompanies() {
    return prisma.company.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
  },

  // Récupérer une entreprise par ID
  async getCompanyById(id) {
    return prisma.company.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
  },

  // Récupérer une entreprise par numéro ICE
  async getCompanyByIce(iceNumber) {
    return prisma.company.findUnique({
      where: { iceNumber },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
  },

  // Créer une nouvelle entreprise
  async createCompany(companyData) {
    return prisma.company.create({
      data: companyData
    });
  },

  // Mettre à jour une entreprise existante
  async updateCompany(id, companyData) {
    return prisma.company.update({
      where: { id },
      data: companyData
    });
  },

  // Supprimer une entreprise
  async deleteCompany(id) {
    return prisma.company.delete({
      where: { id }
    });
  },

  // Obtenir tous les utilisateurs d'une entreprise
  async getCompanyUsers(companyId) {
    return prisma.user.findMany({
      where: { companyId },
      include: {
        role: true
      }
    });
  }
};

module.exports = companyService;