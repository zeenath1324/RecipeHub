import React from 'react';
import RecipeCard from './RecipeCard';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export default function RecipeGrid({ recipes = [], onClearFilters }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#234B38]/10 p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
        <div className="w-14 h-14 bg-[#F8F5ED] rounded-full flex items-center justify-center mx-auto mb-4 text-[#234B38]">
          <UtensilsCrossed className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-serif font-bold text-[#142A20] mb-2">No Recipes Found</h3>
        <p className="text-sm text-[#777A70] leading-relaxed mb-6">
          We couldn't find any recipes matching your current filter criteria. Try adjusting your
          search terms or clearing active filters.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-5 py-2.5 bg-[#234B38] text-white text-sm font-medium rounded-xl hover:bg-[#142A20] transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id || recipe.id || recipe.slug}
          recipe={recipe}
        />
      ))}
    </div>
  );
}
