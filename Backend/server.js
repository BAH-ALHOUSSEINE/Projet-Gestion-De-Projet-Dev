/**
 * @file server.js
 * @description Main server file for the project. Sets up the Express server, connects to the database, and defines routes.
 */

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRouter');
const projectRoutes = require('./routes/projetRouter');
const taskRoutes = require('./routes/taskRouter');
const userRoutes = require('./routes/userRouter');
const sprintRoutes = require('./routes/routerSprint');

require('dotenv').config();

/**
 * Connect to the database.
 */
connectDB();

const app = express();
app.use(express.json());

const cors = require('cors');

/**
 * Enable CORS with specific options.
 */
app.use(cors({
  origin: 'http://localhost:4200', // Allow access only from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(cors());

/**
 * Define routes for the application.
 */
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projet', sprintRoutes);

/**
 * Start the server and listen on the specified port.
 * @constant {number} PORT - The port on which the server will listen.
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));