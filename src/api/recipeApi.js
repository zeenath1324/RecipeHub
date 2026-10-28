import axios from 'axios';

// Base URL: In local development with Vite proxy or server.ts, '/api' is routed to Express.
// In split deployment, VITE_API_URL can specify the remote Express backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const recipeApi = {
  // Check API health and database status
  async getHealth() {
    const res = await apiClient.get('/health');
    return res.data;
  },

  // Fetch paginated recipes with filters and sorting
  async getRecipes(params = {}) {
    const res = await apiClient.get('/recipes', { params });
    return res.data;
  },

  // Fetch single recipe by ID or slug
  async getRecipeById(id) {
    const res = await apiClient.get(`/recipes/${id}`);
    return res.data;
  },

  // Create new recipe
  async createRecipe(payload) {
    const res = await apiClient.post('/recipes', payload);
    return res.data;
  },

  // Update existing recipe
  async updateRecipe(id, payload) {
    const res = await apiClient.put(`/recipes/${id}`, payload);
    return res.data;
  },

  // Delete recipe
  async deleteRecipe(id) {
    const res = await apiClient.delete(`/recipes/${id}`);
    return res.data;
  },
};

export default recipeApi;
