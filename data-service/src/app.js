const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./utils/errorHandler');

// Routes
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const authRoutes = require('./routes/auth'); // Nouvelle route
const companyRoutes = require('./routes/companies');
const employeeRoutes = require('./routes/employees');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes); // Ajout des routes d'authentification
app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

module.exports = app;