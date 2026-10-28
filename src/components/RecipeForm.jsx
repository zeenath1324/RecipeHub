import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, ArrowLeft, Save, Sparkles, Check } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES } from '../utils/constants';

export default function RecipeForm({
  initialData = {},
  isEdit = false,
  onSubmit,
  onCancel,
  isSubmitting = false,
  serverErrors = [],
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    imageUrl: initialData.imageUrl || '',
    category: initialData.category || 'Dinner',
    prepTime: initialData.prepTime ?? 15,
    cookTime: initialData.cookTime ?? 25,
    servings: initialData.servings ?? 4,
    difficulty: initialData.difficulty || 'Easy',
    featured: initialData.featured ?? false,
    ingredients:
      initialData.ingredients && initialData.ingredients.length > 0
        ? initialData.ingredients
        : [
            { name: '', quantity: '' },
            { name: '', quantity: '' },
          ],
    instructions:
      initialData.instructions && initialData.instructions.length > 0
        ? initialData.instructions
        : [
            { stepNumber: 1, description: '' },
            { stepNumber: 2, description: '' },
          ],
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [imagePreviewError, setImagePreviewError] = useState(false);

  // Field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'imageUrl') {
      setImagePreviewError(false);
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Ingredients handlers
  const handleIngredientChange = (index, field, value) => {
    const nextIngredients = [...formData.ingredients];
    nextIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: nextIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '' }],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  // Instructions handlers
  const handleInstructionChange = (index, value) => {
    const nextInstructions = [...formData.instructions];
    nextInstructions[index].description = value;
    setFormData((prev) => ({ ...prev, instructions: nextInstructions }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        { stepNumber: prev.instructions.length + 1, description: '' },
      ],
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length <= 1) return;
    const filtered = formData.instructions.filter((_, i) => i !== index);
    const renumbered = filtered.map((step, idx) => ({
      ...step,
      stepNumber: idx + 1,
    }));
    setFormData((prev) => ({ ...prev, instructions: renumbered }));
  };

  // Client-side validation
  const validate = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Recipe title is required';
    } else if (formData.title.length > 120) {
      errors.title = 'Title must be 120 characters or less';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length > 600) {
      errors.description = 'Description must be 600 characters or less';
    }

    if (Number(formData.prepTime) < 0) {
      errors.prepTime = 'Prep time cannot be negative';
    }

    if (Number(formData.cookTime) < 0) {
      errors.cookTime = 'Cook time cannot be negative';
    }

    if (Number(formData.servings) < 1) {
      errors.servings = 'Servings must be at least 1';
    }

    const validIngredients = formData.ingredients.filter(
      (ing) => ing.name.trim() && ing.quantity.trim()
    );
    if (validIngredients.length === 0) {
      errors.ingredients = 'Please add at least one complete ingredient (name and quantity)';
    }

    const validInstructions = formData.instructions.filter((step) => step.description.trim());
    if (validInstructions.length === 0) {
      errors.instructions = 'Please add at least one cooking instruction step';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Server Errors Notice */}
      {serverErrors && serverErrors.length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
          <p className="font-semibold mb-1">Please correct the following errors:</p>
          <ul className="list-disc pl-5 space-y-0.5 text-xs">
            {serverErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#234B38]/10 shadow-sm space-y-6">
        <h2 className="text-xl font-serif font-bold text-[#142A20] pb-3 border-b border-slate-100">
          Recipe Overview
        </h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
            Recipe Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Creamy Tuscan Garlic Herb Fettuccine"
            maxLength={120}
            className={`w-full px-4 py-3 bg-[#FBF9F4] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#234B38] ${
              fieldErrors.title ? 'border-red-400' : 'border-slate-200'
            }`}
          />
          {fieldErrors.title && <p className="text-xs text-red-600 mt-1">{fieldErrors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
            Short Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the flavors, texture, aromas, and story behind this dish..."
            maxLength={600}
            className={`w-full px-4 py-3 bg-[#FBF9F4] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#234B38] ${
              fieldErrors.description ? 'border-red-400' : 'border-slate-200'
            }`}
          />
          <div className="flex justify-between items-center mt-1 text-xs text-[#777A70]">
            <span>{fieldErrors.description && <span className="text-red-600">{fieldErrors.description}</span>}</span>
            <span>{formData.description.length}/600</span>
          </div>
        </div>

        {/* Image URL & Live Preview */}
        <div>
          <label htmlFor="imageUrl" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
            Image URL (Optional)
          </label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 bg-[#FBF9F4] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#234B38]"
              />
              <p className="text-xs text-[#777A70] mt-1">
                Provide a high-quality link to showcase your finished dish.
              </p>
            </div>

            {/* Thumbnail Preview */}
            <div className="w-24 h-24 rounded-xl border border-slate-200 bg-[#F8F5ED] overflow-hidden shrink-0 flex items-center justify-center">
              {formData.imageUrl && !imagePreviewError ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  onError={() => setImagePreviewError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2 text-slate-400">
                  <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-[10px]">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4-Item Grid: Category, Difficulty, Prep Time, Cook Time, Servings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs font-medium text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#234B38]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
              Difficulty *
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs font-medium text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#234B38]"
            >
              {DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>

          {/* Prep Time */}
          <div>
            <label htmlFor="prepTime" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
              Prep (Mins) *
            </label>
            <input
              id="prepTime"
              name="prepTime"
              type="number"
              min="0"
              value={formData.prepTime}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs font-medium text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#234B38]"
            />
          </div>

          {/* Cook Time */}
          <div>
            <label htmlFor="cookTime" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
              Cook (Mins) *
            </label>
            <input
              id="cookTime"
              name="cookTime"
              type="number"
              min="0"
              value={formData.cookTime}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs font-medium text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#234B38]"
            />
          </div>

          {/* Servings */}
          <div>
            <label htmlFor="servings" className="block text-xs font-semibold uppercase tracking-wider text-[#142A20] mb-2">
              Servings *
            </label>
            <input
              id="servings"
              name="servings"
              type="number"
              min="1"
              value={formData.servings}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs font-medium text-[#252922] focus:outline-none focus:ring-2 focus:ring-[#234B38]"
            />
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#234B38]/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#142A20]">Ingredients</h2>
            <p className="text-xs text-[#777A70]">List every ingredient along with its measurement.</p>
          </div>
          <button
            type="button"
            onClick={addIngredient}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#234B38]/10 hover:bg-[#234B38]/20 text-[#234B38] text-xs font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Ingredient</span>
          </button>
        </div>

        {fieldErrors.ingredients && (
          <p className="text-xs text-red-600">{fieldErrors.ingredients}</p>
        )}

        <div className="space-y-3 pt-2">
          {formData.ingredients.map((ing, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs text-[#777A70] w-6 text-center tabular-nums">{idx + 1}.</span>
              <input
                type="text"
                placeholder="Ingredient name (e.g., Heavy whipping cream)"
                value={ing.name}
                onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#234B38]"
              />
              <input
                type="text"
                placeholder="Quantity (e.g., 1 cup)"
                value={ing.quantity}
                onChange={(e) => handleIngredientChange(idx, 'quantity', e.target.value)}
                className="w-36 sm:w-48 px-3.5 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#234B38]"
              />
              <button
                type="button"
                onClick={() => removeIngredient(idx)}
                disabled={formData.ingredients.length <= 1}
                className="p-2 text-slate-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                aria-label={`Remove ingredient ${idx + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cooking Instructions Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#234B38]/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#142A20]">Step-by-Step Instructions</h2>
            <p className="text-xs text-[#777A70]">Break down the cooking technique in clear sequential steps.</p>
          </div>
          <button
            type="button"
            onClick={addInstruction}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#234B38]/10 hover:bg-[#234B38]/20 text-[#234B38] text-xs font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>
        </div>

        {fieldErrors.instructions && (
          <p className="text-xs text-red-600">{fieldErrors.instructions}</p>
        )}

        <div className="space-y-4 pt-2">
          {formData.instructions.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-xs font-semibold text-[#C87852] mt-3 w-16 uppercase tracking-wider shrink-0">
                Step {step.stepNumber || idx + 1}
              </span>
              <textarea
                rows={2}
                placeholder="Describe this step in detail..."
                value={step.description}
                onChange={(e) => handleInstructionChange(idx, e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-[#FBF9F4] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#234B38]"
              />
              <button
                type="button"
                onClick={() => removeInstruction(idx)}
                disabled={formData.instructions.length <= 1}
                className="p-2 mt-2 text-slate-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                aria-label={`Remove step ${idx + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Submission Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl border border-slate-300 text-sm font-medium text-[#252922] hover:bg-white transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#234B38] text-white text-sm font-semibold hover:bg-[#142A20] active:scale-[0.98] transition-all shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? 'Saving Recipe...' : isEdit ? 'Save Changes' : 'Publish Recipe'}</span>
        </button>
      </div>
    </form>
  );
}
