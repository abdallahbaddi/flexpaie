const express = require('express');
const router = express.Router();
const companyService = require('../services/companyService');
const { validateCompanyCreate, validateCompanyUpdate } = require('../utils/validators');

// Récupérer toutes les entreprises
router.get('/', async (req, res, next) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

// Récupérer une entreprise par ID
router.get('/:id', async (req, res, next) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// Récupérer une entreprise par numéro ICE
router.get('/ice/:iceNumber', async (req, res, next) => {
  try {
    const company = await companyService.getCompanyByIce(req.params.iceNumber);
    if (!company) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// Créer une nouvelle entreprise
router.post('/', validateCompanyCreate, async (req, res, next) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    next(error);
  }
});

// Mettre à jour une entreprise
router.put('/:id', validateCompanyUpdate, async (req, res, next) => {
  try {
    const company = await companyService.updateCompany(req.params.id, req.body);
    if (!company) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// Supprimer une entreprise
router.delete('/:id', async (req, res, next) => {
  try {
    await companyService.deleteCompany(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Récupérer tous les utilisateurs d'une entreprise
router.get('/:id/users', async (req, res, next) => {
  try {
    const users = await companyService.getCompanyUsers(req.params.id);
    res.json(users);
  } catch (error) {
    next(error);
  }
});



module.exports = router;