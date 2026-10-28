import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  // 404 and Error Middlewares for standalone backend
  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🍲 [RecipeHub Express API] Running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Recipes API:  http://localhost:${PORT}/api/recipes\n`);
  });
}

startServer();
