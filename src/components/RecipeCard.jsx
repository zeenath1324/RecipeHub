import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Flame, Utensils } from 'lucide-react';
import { DEFAULT_RECIPE_IMAGE } from '../utils/constants';

export default function RecipeCard({ recipe }) {
  const [imgError, setImgError] = useState(false);
  const id = recipe._id || recipe.id || recipe.slug;
  const totalTime = (Number(recipe.prepTime) || 0) + (Number(recipe.cookTime) || 0);

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#234B38]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Recipe Image with Subtle Zoom */}
      <Link to={`/recipes/${id}`} className="relative block h-56 sm:h-64 overflow-hidden bg-[#234B38]/10">
        {!imgError && recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#234B38] to-[#142A20] text-white p-6 text-center">
            <Utensils className="w-8 h-8 text-[#A7B8A0] mb-2" />
            <span className="font-serif font-bold text-lg text-white/90">{recipe.title}</span>
            <span className="text-xs text-[#A7B8A0] mt-1">{recipe.category}</span>
          </div>
        )}

        {/* Quiet Difficulty Indicator (No pill box, elegant corner scrim) */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
          {recipe.difficulty}
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#777A70] mb-2">
          <span className="text-[#C87852] font-semibold uppercase tracking-wider">
            {recipe.category}
          </span>
          <span aria-hidden="true" className="text-black/30">·</span>
          <span>{recipe.servings} Servings</span>
        </div>

        {/* Recipe Title */}
        <h3 className="text-xl font-serif font-bold text-[#142A20] group-hover:text-[#234B38] transition-colors line-clamp-1 mb-2">
          <Link to={`/recipes/${id}`}>
            {recipe.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-[#777A70] line-clamp-2 leading-relaxed mb-5 flex-1">
          {recipe.description}
        </p>

        {/* Divider */}
        <div className="pt-4 border-t border-[#234B38]/10 flex items-center justify-between text-xs text-[#777A70]">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#234B38]" />
            <span className="tabular-nums">{totalTime} mins</span>
          </div>

          <Link
            to={`/recipes/${id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#234B38] group-hover:text-[#C87852] group-hover:translate-x-0.5 transition-all"
          >
            <span>View Recipe</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
