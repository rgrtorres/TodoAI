const express = require('express');
const connectDB = require('./config/database');
const taskRouter = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conecta com banco
connectDB();

// Rotas
app.use('/tasks', taskRouter);

module.exports = app;
