const express = require('express');
const router = express.Router();
const employeeService = require('../services/employeeService');
const { validateEmployeeCreate, validateEmployeeUpdate } = require('../utils/validators');

// Récupérer tous les employés
router.get('/', async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

// Récupérer un employé par ID
router.get('/:id', async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
});

// Créer un nouvel employé
router.post('/', validateEmployeeCreate, async (req, res, next) => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

// Mettre à jour un employé
router.put('/:id', validateEmployeeUpdate, async (req, res, next) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

// Supprimer un employé
router.delete('/:id', async (req, res, next) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Récupérer tous les employés d'une entreprise
router.get('/company/:companyId', async (req, res, next) => {
  try {
    const employees = await employeeService.getCompanyEmployees(req.params.companyId);
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

module.exports = router;