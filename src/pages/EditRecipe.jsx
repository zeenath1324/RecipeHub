import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import recipeApi from '../api/recipeApi';
import { Edit3 } from 'lucide-react';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await recipeApi.getRecipeById(id);
        if (res.success && res.data) {
          setInitialData(res.data);
        }
      } catch (err) {
        console.error('Failed to load recipe for edit:', err);
        setFetchError(err.response?.data?.message || err.message || 'Could not load recipe.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadRecipe();
    }
  }, [id]);

  const handleSubmit = async (updatedData) => {
    setIsSubmitting(true);
    setServerErrors([]);
    try {
      const editId = initialData._id || initialData.id || id;
      const res = await recipeApi.updateRecipe(editId, updatedData);
      if (res.success) {
        navigate(`/recipes/${editId}`);
      }
    } catch (err) {
      console.error('Failed to update recipe:', err);
      const errors = err.response?.data?.errors || [err.response?.data?.message || err.message];
      setServerErrors(errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-6 animate-pulse" />
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (fetchError || !initialData) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <ErrorMessage
          message={fetchError || 'Recipe could not be found for editing.'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5ED] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-[#234B38]/10 text-[#234B38] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Edit3 className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C87852]">
            Recipe Modification
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#142A20] mt-1 tracking-tight">
            Edit Recipe
          </h1>
          <p className="text-sm text-[#777A70] mt-2">
            Refine ingredients, adjust cooking instructions, or update prep and cook times.
          </p>
        </div>

        <RecipeForm
          initialData={initialData}
          isEdit={true}
          isSubmitting={isSubmitting}
          serverErrors={serverErrors}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/recipes/${id}`)}
        />
      </div>
    </div>
  );
}
