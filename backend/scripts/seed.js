import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initialRecipes } from './seedData.js';
import { MongooseRecipe, slugify } from '../src/models/Recipe.js';

dotenv.config();

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('your_mongodb_connection_string') || uri.trim() === '') {
    console.error('\n❌ [RecipeHub Seeder Error]');
    console.error('Cannot seed external MongoDB Atlas: MONGODB_URI is not configured in .env.');
    console.error('Please configure MONGODB_URI=mongodb+srv://... in your backend/.env or root .env file.');
    console.error('Note: When running without MONGODB_URI, RecipeHub automatically pre-seeds in-memory.\n');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas for seeding...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log('✅ Connected to MongoDB Atlas.');

    let insertedCount = 0;
    let skippedCount = 0;

    for (const recipeData of initialRecipes) {
      const existing = await MongooseRecipe.findOne({ title: recipeData.title });
      if (existing) {
        skippedCount++;
        console.log(`⏩ Skipped existing recipe: "${recipeData.title}"`);
      } else {
        const slug = slugify(recipeData.title) + '-' + Math.random().toString(36).substring(2, 7);
        await MongooseRecipe.create({
          ...recipeData,
          slug,
        });
        insertedCount++;
        console.log(`✨ Seeded new recipe: "${recipeData.title}"`);
      }
    }

    console.log(`\n🎉 Seeding completed successfully!`);
    console.log(`   - New recipes inserted: ${insertedCount}`);
    console.log(`   - Existing recipes preserved: ${skippedCount}`);
    console.log(`   - Total demonstration recipes: ${initialRecipes.length}\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder failed with error:', err.message);
    process.exit(1);
  }
}

seedDatabase();
