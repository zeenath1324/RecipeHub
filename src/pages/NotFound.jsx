import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F5ED] px-4 py-16">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-[#234B38]/10 text-[#234B38] rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ChefHat className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest font-semibold text-[#C87852]">
          404 Error
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#142A20] mt-2 mb-3 tracking-tight">
          Dish Not on the Menu
        </h1>

        <p className="text-sm text-[#777A70] leading-relaxed mb-8">
          The page or recipe you are looking for doesn't exist or has been moved to another section.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#234B38] text-white rounded-xl text-sm font-medium hover:bg-[#142A20] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/recipes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-[#234B38]/20 text-[#252922] rounded-xl text-sm font-medium hover:bg-[#234B38]/5 transition-colors"
          >
            <Compass className="w-4 h-4 text-[#234B38]" />
            <span>Explore Recipes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
