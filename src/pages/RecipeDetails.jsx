import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  Users,
  Flame,
  ArrowLeft,
  Edit3,
  Trash2,
  Printer,
  CheckCircle2,
  Circle,
  Utensils,
  Share2,
  Calendar,
} from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import recipeApi from '../api/recipeApi';

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interactive Cooking Checklist state
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Copy share link feedback
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      setError(null);
      try {
        const res = await recipeApi.getRecipeById(id);
        if (res.success) {
          setRecipe(res.data);
        }
      } catch (err) {
        console.error('Failed to load recipe:', err);
        setError(err.response?.data?.message || err.message || 'Recipe could not be found.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadRecipe();
    }
  }, [id]);

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleStep = (idx) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const deleteId = recipe._id || recipe.id || id;
      await recipeApi.deleteRecipe(deleteId);
      setDeleteModalOpen(false);
      navigate('/recipes', { replace: true });
    } catch (err) {
      console.error('Failed to delete recipe:', err);
      alert(err.response?.data?.message || 'Failed to delete recipe. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="h-8 bg-slate-200 rounded w-1/4 mb-6 animate-pulse" />
        <div className="h-96 bg-slate-200 rounded-2xl mb-8 animate-pulse" />
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
            <Utensils className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#142A20] mb-2">Recipe Not Found</h2>
          <p className="text-sm text-[#777A70] leading-relaxed mb-6">
            The culinary creation you're looking for may have been removed or the link is incorrect.
          </p>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#234B38] text-white rounded-xl text-sm font-medium hover:bg-[#142A20] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Recipes</span>
          </Link>
        </div>
      </div>
    );
  }

  const totalTime = (Number(recipe.prepTime) || 0) + (Number(recipe.cookTime) || 0);
  const totalIngredientsCount = recipe.ingredients?.length || 0;
  const checkedIngredientsCount = Object.values(checkedIngredients).filter(Boolean).length;
  const totalStepsCount = recipe.instructions?.length || 0;
  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const totalCheckItems = totalIngredientsCount + totalStepsCount;
  const totalCompletedItems = checkedIngredientsCount + completedStepsCount;
  const progressPercent = totalCheckItems > 0 ? Math.round((totalCompletedItems / totalCheckItems) * 100) : 0;

  const formattedDate = recipe.createdAt
    ? new Date(recipe.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <article className="min-h-screen bg-[#F8F5ED] pb-24 print-area">
      {/* Top Navigation & Action Controls Bar */}
      <div className="border-b border-[#234B38]/10 bg-white no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#777A70] hover:text-[#234B38] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Recipes</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-[#777A70] hover:bg-slate-100 transition-colors text-xs font-medium inline-flex items-center gap-1.5"
              title="Share Recipe Link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg text-[#777A70] hover:bg-slate-100 transition-colors text-xs font-medium inline-flex items-center gap-1.5"
              title="Print Recipe"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <Link
              to={`/recipes/${recipe._id || recipe.id || id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#234B38]/20 text-xs font-medium text-[#234B38] hover:bg-[#234B38]/5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>

            <button
              onClick={() => setDeleteModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Header Metadata */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#C87852] mb-3">
            <span>{recipe.category}</span>
            <span aria-hidden="true" className="text-black/30">·</span>
            <span>{recipe.difficulty} Level</span>
            {formattedDate && (
              <>
                <span aria-hidden="true" className="text-black/30">·</span>
                <span className="text-[#777A70] normal-case flex items-center gap-1 font-normal">
                  <Calendar className="w-3 h-3 text-[#777A70]" />
                  {formattedDate}
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#142A20] tracking-tight leading-tight mb-4 text-balance">
            {recipe.title}
          </h1>

          <p className="text-base sm:text-lg text-[#777A70] leading-relaxed max-w-3xl font-light">
            {recipe.description}
          </p>
        </div>

        {/* Large Hero Image */}
        {recipe.imageUrl && (
          <div className="mb-10 rounded-3xl overflow-hidden shadow-md max-h-[500px] border border-[#234B38]/10 bg-slate-900">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-[500px]"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Key Metrics Strip (Contiguous 4-Column Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#234B38]/10 shadow-sm mb-12">
          <div className="border-r border-slate-100 last:border-none pr-4">
            <span className="text-xs text-[#777A70] uppercase tracking-wider font-medium block mb-1">
              Prep Time
            </span>
            <span className="text-xl font-serif font-bold text-[#142A20] tabular-nums">
              {recipe.prepTime} mins
            </span>
          </div>

          <div className="border-r border-slate-100 last:border-none pr-4">
            <span className="text-xs text-[#777A70] uppercase tracking-wider font-medium block mb-1">
              Cook Time
            </span>
            <span className="text-xl font-serif font-bold text-[#142A20] tabular-nums">
              {recipe.cookTime} mins
            </span>
          </div>

          <div className="border-r border-slate-100 last:border-none pr-4">
            <span className="text-xs text-[#777A70] uppercase tracking-wider font-medium block mb-1">
              Total Time
            </span>
            <span className="text-xl font-serif font-bold text-[#142A20] tabular-nums">
              {totalTime} mins
            </span>
          </div>

          <div>
            <span className="text-xs text-[#777A70] uppercase tracking-wider font-medium block mb-1">
              Yield
            </span>
            <span className="text-xl font-serif font-bold text-[#142A20] tabular-nums">
              {recipe.servings} Servings
            </span>
          </div>
        </div>

        {/* Interactive Cooking Progress Bar (Screen only) */}
        <div className="no-print mb-12 p-4 bg-[#234B38]/5 rounded-2xl border border-[#234B38]/15">
          <div className="flex items-center justify-between text-xs font-semibold text-[#142A20] mb-2">
            <span className="flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-[#C87852]" />
              <span>Cooking Assistant Checklist</span>
            </span>
            <span className="tabular-nums font-bold text-[#234B38]">
              {totalCompletedItems} of {totalCheckItems} completed ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#234B38] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Split: Ingredients & Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Column 1: Ingredients (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#234B38]/10 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#142A20]">Ingredients</h2>
                <span className="text-xs text-[#777A70] font-medium">
                  {recipe.ingredients?.length} items
                </span>
              </div>

              <ul className="space-y-3">
                {recipe.ingredients?.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors text-sm ${
                        isChecked
                          ? 'bg-slate-50 text-slate-400 line-through'
                          : 'hover:bg-[#F8F5ED] text-[#252922]'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={`Toggle ${ing.name}`}
                        className="mt-0.5 text-[#234B38] shrink-0"
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-[#234B38]" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                      <div className="flex-1 flex justify-between gap-2">
                        <span className="font-medium">{ing.name}</span>
                        <span className="text-xs text-[#777A70] shrink-0 tabular-nums">
                          {ing.quantity}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Column 2: Step-by-Step Instructions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#234B38]/10 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <h2 className="text-xl font-serif font-bold text-[#142A20]">
                  Cooking Instructions
                </h2>
                <span className="text-xs text-[#777A70] font-medium">
                  {recipe.instructions?.length} steps
                </span>
              </div>

              <div className="space-y-6">
                {recipe.instructions?.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200/60'
                          : 'bg-[#FBF9F4] border-black/5 hover:border-[#234B38]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#C87852]">
                          Step {step.stepNumber || idx + 1}
                        </span>
                        <button
                          type="button"
                          className="text-xs text-[#234B38] font-medium flex items-center gap-1"
                        >
                          {isDone ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Done</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-3.5 h-3.5 text-slate-300" />
                              <span className="text-[#777A70]">Mark Done</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p
                        className={`text-sm leading-relaxed ${
                          isDone ? 'text-slate-400 line-through' : 'text-[#252922]'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        title="Delete Recipe"
        message={`Are you sure you want to permanently delete "${recipe.title}"? This action cannot be reversed.`}
        confirmText="Yes, Delete"
        cancelText="Keep Recipe"
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </article>
  );
}
