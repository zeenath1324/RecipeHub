import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import recipeApi from '../api/recipeApi';
import { ChefHat } from 'lucide-react';

export default function AddRecipe() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  const handleSubmit = async (recipeData) => {
    setIsSubmitting(true);
    setServerErrors([]);
    try {
      const res = await recipeApi.createRecipe(recipeData);
      if (res.success && res.data) {
        const id = res.data._id || res.data.id || res.data.slug;
        navigate(`/recipes/${id}`);
      }
    } catch (err) {
      console.error('Failed to create recipe:', err);
      const errors = err.response?.data?.errors || [err.response?.data?.message || err.message];
      setServerErrors(errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5ED] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-[#234B38]/10 text-[#234B38] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <ChefHat className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C87852]">
            Culinary Contribution
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#142A20] mt-1 tracking-tight">
            Share Your Recipe
          </h1>
          <p className="text-sm text-[#777A70] mt-2">
            Contribute to the RecipeHub community. All fields marked with an asterisk are required.
          </p>
        </div>

        <RecipeForm
          isEdit={false}
          isSubmitting={isSubmitting}
          serverErrors={serverErrors}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
