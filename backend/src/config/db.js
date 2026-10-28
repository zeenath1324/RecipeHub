import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initialRecipes } from '../../scripts/seedData.js';
import { slugify } from '../models/Recipe.js';

dotenv.config();

// Prepare initial memory store recipes with stable IDs and slugs
const defaultRecipes = initialRecipes.map((r, idx) => {
  const id = `recipe_seed_${idx + 1}`;
  const now = new Date(Date.now() - (initialRecipes.length - idx) * 3600000).toISOString();
  return {
    _id: id,
    id,
    ...r,
    slug: slugify ? slugify(r.title) : r.title.toLowerCase().replace(/\s+/g, '-'),
    createdAt: now,
    updatedAt: now,
  };
});

// In-memory data store used when MongoDB Atlas URI is not yet configured or in offline mode
export const memoryStore = {
  isMemoryMode: false,
  recipes: [...defaultRecipes],
};

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('your_mongodb_connection_string') || uri.trim() === '') {
    console.warn('\n🌿 [RecipeHub Database Advisory]');
    console.warn('MONGODB_URI is not set in .env.');
    console.warn('Running in built-in memory mode with 8 demonstration recipes.');
    console.warn('To connect to MongoDB Atlas: add MONGODB_URI=mongodb+srv://... in your .env file.\n');
    memoryStore.isMemoryMode = true;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [RecipeHub Database] Connected to MongoDB Atlas: ${conn.connection.host}`);
    memoryStore.isMemoryMode = false;
    return true;
  } catch (error) {
    console.error(`❌ [RecipeHub Database] MongoDB connection error: ${error.message}`);
    console.warn('Falling back to embedded in-memory database so RecipeHub remains fully functional.\n');
    memoryStore.isMemoryMode = true;
    return false;
  }
}

export function isMongoDBConnected() {
  return mongoose.connection.readyState === 1 && !memoryStore.isMemoryMode;
}
