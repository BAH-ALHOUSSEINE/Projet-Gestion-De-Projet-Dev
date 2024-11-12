const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRouter');
const projectRoutes = require('./routes/projetRouter');
const taskRoutes = require('./routes/taskRouter');
require('dotenv').config();

connectDB();

const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200', // Permet uniquement l'accès depuis cette origine
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  }));

  app.use(cors());

  
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
