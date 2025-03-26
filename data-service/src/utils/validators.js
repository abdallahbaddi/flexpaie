const Joi = require('joi');

// Validation middleware factory
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// User validation schemas
const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().allow(null, ''),
  roleId: Joi.string().required()
});

const userUpdateSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8),
  name: Joi.string().allow(null, ''),
  roleId: Joi.string(),
  companyId: Joi.string(),
}).min(1);

// Role validation schemas
const roleCreateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, '')
});

const roleUpdateSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(null, '')
}).min(1);

// Schéma de validation pour le login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Schéma de validation pour la création d'entreprise
const companyCreateSchema = Joi.object({
  name: Joi.string().required(),
  iceNumber: Joi.string().allow(null, ''),
  registryNumber: Joi.string().allow(null, ''),
  address: Joi.string().allow(null, ''),
  activitySector: Joi.string().allow(null, ''),
  employeeCount: Joi.number().integer().min(1).allow(null)
});

// Schéma de validation pour la mise à jour d'entreprise
const companyUpdateSchema = Joi.object({
  name: Joi.string(),
  iceNumber: Joi.string().allow(null, ''),
  registryNumber: Joi.string().allow(null, ''),
  address: Joi.string().allow(null, ''),
  activitySector: Joi.string().allow(null, ''),
  employeeCount: Joi.number().integer().min(1).allow(null)
}).min(1);

// Validation middleware
const validateUserCreate = validate(userCreateSchema);
const validateUserUpdate = validate(userUpdateSchema);
const validateRoleCreate = validate(roleCreateSchema);
const validateRoleUpdate = validate(roleUpdateSchema);
const validateLogin = validate(loginSchema);
const validateCompanyCreate = validate(companyCreateSchema);
const validateCompanyUpdate = validate(companyUpdateSchema);

module.exports = {
  validateLogin,
  validateUserCreate,
  validateUserUpdate,
  validateRoleCreate,
  validateRoleUpdate,
  validateCompanyCreate,
  validateCompanyUpdate
};