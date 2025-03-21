const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedData() {
  try {
    // Créer les rôles par défaut
    const roles = [
      { name: 'SUPER_ADMIN', description: 'Super administrateur avec tous les droits' },
      { name: 'ADMIN', description: 'Administrateur avec droits limités' },
      { name: 'MANAGER', description: 'Gestionnaire d\'équipe ou de département' },
      { name: 'SALARIE', description: 'Employé standard' }
    ];

    console.log('Création des rôles...');
    
    for (const role of roles) {
      await prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role
      });
    }
    
    console.log('Rôles créés avec succès!');

    // Création d'une entreprise par défaut
    console.log('Création de l\'entreprise par défaut...');
    
    const defaultCompany = await prisma.company.upsert({
      where: { iceNumber: 'DEFAULT123' },
      update: {},
      create: {
        name: 'Entreprise Par Défaut',
        iceNumber: 'DEFAULT123',
        registryNumber: 'RC123456',
        address: '123 Rue Principale, Ville, Pays',
        activitySector: 'Technologies',
        employeeCount: 10
      }
    });
    
    console.log('Entreprise par défaut créée avec succès!');

    // Création d'un utilisateur admin par défaut
    const adminRole = await prisma.role.findUnique({
      where: { name: 'ADMIN' }
    });

    if (adminRole) {
      console.log('Création de l\'utilisateur admin par défaut...');
      
      await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
          name: 'Admin',
          email: 'admin@example.com',
          password: 'password123', // À changer en production !
          roleId: adminRole.id,
          companyId: defaultCompany.id
        }
      });
      
      console.log('Utilisateur admin créé avec succès!');
    }

  } catch (error) {
    console.error('Erreur lors de l\'initialisation des données:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la fonction si le script est appelé directement
if (require.main === module) {
  seedData()
    .then(() => console.log('Initialisation des données terminée.'))
    .catch(console.error);
}

module.exports = { seedData };