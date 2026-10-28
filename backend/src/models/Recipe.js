import mongoose from 'mongoose';
import { memoryStore, isMongoDBConnected } from '../config/db.js';

export const VALID_CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Desserts',
  'Vegetarian',
  'Quick Meals'
];

export const VALID_DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ingredient name is required'],
    trim: true,
  },
  quantity: {
    type: String,
    required: [true, 'Ingredient quantity is required'],
    trim: true,
  },
}, { _id: false });

const instructionSchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    required: [true, 'Step number is required'],
  },
  description: {
    type: String,
    required: [true, 'Step description is required'],
    trim: true,
  },
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Recipe description is required'],
    trim: true,
    maxlength: [600, 'Description cannot exceed 600 characters'],
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: VALID_CATEGORIES,
      message: '{VALUE} is not a valid category',
    },
  },
  ingredients: {
    type: [ingredientSchema],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: 'Recipe must have at least one ingredient',
    },
  },
  instructions: {
    type: [instructionSchema],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: 'Recipe must have at least one instruction step',
    },
  },
  prepTime: {
    type: Number,
    required: [true, 'Preparation time is required'],
    min: [0, 'Preparation time cannot be negative'],
  },
  cookTime: {
    type: Number,
    required: [true, 'Cooking time is required'],
    min: [0, 'Cooking time cannot be negative'],
  },
  servings: {
    type: Number,
    required: [true, 'Servings count is required'],
    min: [1, 'Servings must be at least 1'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: VALID_DIFFICULTIES,
      message: '{VALUE} is not a valid difficulty level',
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Generate URL slug from title
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

recipeSchema.pre('save', function (next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title) + '-' + Math.random().toString(36).substring(2, 7);
  }
  next();
});

// Indexes for query performance
recipeSchema.index({ category: 1, difficulty: 1, createdAt: -1 });
recipeSchema.index({ title: 'text', description: 'text' });

const MongooseRecipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

// Hybrid Model Adapter: Works seamlessly with real MongoDB Atlas OR in-memory fallback
class RecipeService {
  static async find(filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 20) {
    if (isMongoDBConnected()) {
      return await MongooseRecipe.find(filter).sort(sort).skip(skip).limit(limit).lean();
    }

    // In-memory filter implementation
    let results = [...memoryStore.recipes];

    if (filter.category) {
      results = results.filter((r) => r.category.toLowerCase() === filter.category.toLowerCase());
    }

    if (filter.difficulty) {
      results = results.filter((r) => r.difficulty.toLowerCase() === filter.difficulty.toLowerCase());
    }

    if (filter.featured !== undefined) {
      results = results.filter((r) => r.featured === filter.featured);
    }

    if (filter.maxTime) {
      results = results.filter((r) => (Number(r.prepTime) + Number(r.cookTime)) <= Number(filter.maxTime));
    }

    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter((r) => {
        const inTitle = r.title.toLowerCase().includes(q);
        const inDesc = r.description.toLowerCase().includes(q);
        const inIngredients = r.ingredients?.some((ing) => ing.name.toLowerCase().includes(q));
        return inTitle || inDesc || inIngredients;
      });
    }

    // Sorting
    const sortField = Object.keys(sort)[0] || 'createdAt';
    const sortDir = sort[sortField] || -1;

    results.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === 'totalTime') {
        valA = Number(a.prepTime || 0) + Number(a.cookTime || 0);
        valB = Number(b.prepTime || 0) + Number(b.cookTime || 0);
      }
      if (valA < valB) return sortDir === 1 ? -1 : 1;
      if (valA > valB) return sortDir === 1 ? 1 : -1;
      return 0;
    });

    const paginated = results.slice(skip, skip + limit);
    return paginated;
  }

  static async countDocuments(filter = {}) {
    if (isMongoDBConnected()) {
      return await MongooseRecipe.countDocuments(filter);
    }

    let results = [...memoryStore.recipes];
    if (filter.category) {
      results = results.filter((r) => r.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.difficulty) {
      results = results.filter((r) => r.difficulty.toLowerCase() === filter.difficulty.toLowerCase());
    }
    if (filter.featured !== undefined) {
      results = results.filter((r) => r.featured === filter.featured);
    }
    if (filter.maxTime) {
      results = results.filter((r) => (Number(r.prepTime) + Number(r.cookTime)) <= Number(filter.maxTime));
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter((r) => {
        const inTitle = r.title.toLowerCase().includes(q);
        const inDesc = r.description.toLowerCase().includes(q);
        const inIngredients = r.ingredients?.some((ing) => ing.name.toLowerCase().includes(q));
        return inTitle || inDesc || inIngredients;
      });
    }
    return results.length;
  }

  static async findById(id) {
    if (isMongoDBConnected()) {
      if (mongoose.isValidObjectId(id)) {
        return await MongooseRecipe.findById(id).lean();
      }
      return await MongooseRecipe.findOne({ slug: id }).lean();
    }

    return memoryStore.recipes.find((r) => r._id === id || r.id === id || r.slug === id) || null;
  }

  static async create(data) {
    if (isMongoDBConnected()) {
      const doc = new MongooseRecipe(data);
      return await doc.save();
    }

    const newId = 'rec_' + Date.now() + Math.random().toString(36).substring(2, 6);
    const slug = slugify(data.title) + '-' + Math.random().toString(36).substring(2, 7);
    const now = new Date().toISOString();

    const newRecipe = {
      _id: newId,
      id: newId,
      ...data,
      slug,
      createdAt: now,
      updatedAt: now,
    };

    memoryStore.recipes.unshift(newRecipe);
    return newRecipe;
  }

  static async findByIdAndUpdate(id, data, options = {}) {
    if (isMongoDBConnected()) {
      if (mongoose.isValidObjectId(id)) {
        return await MongooseRecipe.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
      }
      return await MongooseRecipe.findOneAndUpdate({ slug: id }, data, { new: true, runValidators: true }).lean();
    }

    const index = memoryStore.recipes.findIndex((r) => r._id === id || r.id === id || r.slug === id);
    if (index === -1) return null;

    const existing = memoryStore.recipes[index];
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    if (data.title && data.title !== existing.title) {
      updated.slug = slugify(data.title) + '-' + Math.random().toString(36).substring(2, 7);
    }

    memoryStore.recipes[index] = updated;
    return updated;
  }

  static async findByIdAndDelete(id) {
    if (isMongoDBConnected()) {
      if (mongoose.isValidObjectId(id)) {
        return await MongooseRecipe.findByIdAndDelete(id).lean();
      }
      return await MongooseRecipe.findOneAndDelete({ slug: id }).lean();
    }

    const index = memoryStore.recipes.findIndex((r) => r._id === id || r.id === id || r.slug === id);
    if (index === -1) return null;

    const deleted = memoryStore.recipes.splice(index, 1)[0];
    return deleted;
  }
}

export default RecipeService;
export { MongooseRecipe };
