import RecipeService, { VALID_CATEGORIES, VALID_DIFFICULTIES } from '../models/Recipe.js';
import { isMongoDBConnected, memoryStore } from '../config/db.js';

// Health check endpoint
export async function getHealth(req, res) {
  const dbConnected = isMongoDBConnected();
  return res.status(200).json({
    success: true,
    message: 'RecipeHub API is running smoothly',
    data: {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbConnected ? 'MongoDB Atlas (connected)' : 'Embedded Persistent Store (atlas ready)',
      storageMode: dbConnected ? 'mongodb' : 'memory',
      recipeCount: await RecipeService.countDocuments(),
    },
  });
}

// List recipes with search, filtering, sorting, and pagination
export async function getRecipes(req, res, next) {
  try {
    const {
      search,
      category,
      difficulty,
      maxTime,
      featured,
      sort = 'newest',
      page = 1,
      limit = 9,
    } = req.query;

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(50, Math.max(1, parseInt(limit, 10) || 9));
    const skip = (parsedPage - 1) * parsedLimit;

    // Build filter
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }
    if (featured !== undefined) {
      filter.featured = featured === 'true' || featured === true;
    }
    if (maxTime) {
      const parsedMaxTime = parseInt(maxTime, 10);
      if (!isNaN(parsedMaxTime) && parsedMaxTime > 0) {
        filter.maxTime = parsedMaxTime;
      }
    }
    if (search && search.trim() !== '') {
      filter.search = search.trim();
    }

    // Determine sort
    let sortObj = { createdAt: -1 };
    switch (sort) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'alphabetical':
      case 'title':
        sortObj = { title: 1 };
        break;
      case 'prepTime':
        sortObj = { prepTime: 1 };
        break;
      case 'cookTime':
        sortObj = { cookTime: 1 };
        break;
      case 'totalTime':
        sortObj = { totalTime: 1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    const [recipes, total] = await Promise.all([
      RecipeService.find(filter, sortObj, skip, parsedLimit),
      RecipeService.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / parsedLimit) || 1;

    return res.status(200).json({
      success: true,
      message: 'Recipes retrieved successfully',
      data: recipes,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages,
        hasNextPage: parsedPage < totalPages,
        hasPrevPage: parsedPage > 1,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get single recipe by ID or slug
export async function getRecipeById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || id.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'A valid recipe ID or slug must be provided',
      });
    }

    const recipe = await RecipeService.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with identifier: "${id}"`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Recipe retrieved successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
}

// Validate recipe payload
function validateRecipePayload(body) {
  const errors = [];

  if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
    errors.push('Recipe title is required');
  } else if (body.title.trim().length > 120) {
    errors.push('Recipe title cannot exceed 120 characters');
  }

  if (!body.description || typeof body.description !== 'string' || body.description.trim().length === 0) {
    errors.push('Recipe description is required');
  } else if (body.description.trim().length > 600) {
    errors.push('Recipe description cannot exceed 600 characters');
  }

  if (!body.category || !VALID_CATEGORIES.includes(body.category)) {
    errors.push(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (!body.difficulty || !VALID_DIFFICULTIES.includes(body.difficulty)) {
    errors.push(`Difficulty must be one of: ${VALID_DIFFICULTIES.join(', ')}`);
  }

  const prepTime = Number(body.prepTime);
  if (isNaN(prepTime) || prepTime < 0) {
    errors.push('Preparation time must be a non-negative number');
  }

  const cookTime = Number(body.cookTime);
  if (isNaN(cookTime) || cookTime < 0) {
    errors.push('Cooking time must be a non-negative number');
  }

  const servings = Number(body.servings);
  if (isNaN(servings) || servings < 1) {
    errors.push('Servings must be a positive number of at least 1');
  }

  if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) {
    errors.push('At least one ingredient is required');
  } else {
    body.ingredients.forEach((ing, i) => {
      if (!ing.name || ing.name.trim() === '') {
        errors.push(`Ingredient #${i + 1} is missing a name`);
      }
      if (!ing.quantity || ing.quantity.trim() === '') {
        errors.push(`Ingredient #${i + 1} is missing a quantity`);
      }
    });
  }

  if (!Array.isArray(body.instructions) || body.instructions.length === 0) {
    errors.push('At least one cooking instruction step is required');
  } else {
    body.instructions.forEach((step, i) => {
      if (!step.description || step.description.trim() === '') {
        errors.push(`Instruction step #${i + 1} description is empty`);
      }
    });
  }

  return errors;
}

// Create new recipe
export async function createRecipe(req, res, next) {
  try {
    const errors = validateRecipePayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for recipe creation',
        errors,
      });
    }

    const {
      title,
      description,
      imageUrl = '',
      category,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      featured = false,
    } = req.body;

    // Sanitize ingredients & instructions
    const cleanIngredients = ingredients.map((ing) => ({
      name: ing.name.trim(),
      quantity: ing.quantity.trim(),
    }));

    const cleanInstructions = instructions.map((step, idx) => ({
      stepNumber: step.stepNumber || idx + 1,
      description: step.description.trim(),
    }));

    const recipeData = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      category,
      ingredients: cleanIngredients,
      instructions: cleanInstructions,
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      servings: Number(servings),
      difficulty,
      featured: Boolean(featured),
    };

    const newRecipe = await RecipeService.create(recipeData);

    return res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: newRecipe,
    });
  } catch (error) {
    next(error);
  }
}

// Update existing recipe
export async function updateRecipe(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || id.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'A valid recipe ID must be provided',
      });
    }

    const errors = validateRecipePayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for recipe update',
        errors,
      });
    }

    const {
      title,
      description,
      imageUrl = '',
      category,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      featured,
    } = req.body;

    const cleanIngredients = ingredients.map((ing) => ({
      name: ing.name.trim(),
      quantity: ing.quantity.trim(),
    }));

    const cleanInstructions = instructions.map((step, idx) => ({
      stepNumber: step.stepNumber || idx + 1,
      description: step.description.trim(),
    }));

    const updateData = {
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      category,
      ingredients: cleanIngredients,
      instructions: cleanInstructions,
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      servings: Number(servings),
      difficulty,
    };

    if (featured !== undefined) {
      updateData.featured = Boolean(featured);
    }

    const updatedRecipe = await RecipeService.findByIdAndUpdate(id, updateData);

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id: "${id}"`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
}

// Delete recipe
export async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || id.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'A valid recipe ID must be provided',
      });
    }

    const deleted = await RecipeService.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id: "${id}"`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: { id, title: deleted.title },
    });
  } catch (error) {
    next(error);
  }
}
