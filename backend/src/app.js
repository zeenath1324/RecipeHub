import express from 'express';
import cors from 'cors';
import { getHealth } from './controllers/recipeController.js';
import recipeRoutes from './routes/recipeRoutes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', getHealth);

// Recipe REST APIs
app.use('/api/recipes', recipeRoutes);

export default app;
