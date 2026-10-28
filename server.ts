import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import app from './backend/src/app.js';
import { connectDB } from './backend/src/config/db.js';
import { errorHandler } from './backend/src/middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

async function bootstrap() {
  await connectDB();

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    // Mount Vite dev middleware after /api routes
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  // Error handler middleware
  app.use(errorHandler);

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🍲 RecipeHub running on http://0.0.0.0:${PORT}`);
    console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📋 Recipes:    http://localhost:${PORT}/api/recipes`);
  });
}

bootstrap();
