import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-8 max-w-xl mx-auto text-center my-8">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-serif font-bold text-red-900 mb-2">Unable to Load Recipes</h3>
      <p className="text-sm text-red-700 leading-relaxed mb-6">
        {message || 'A network error occurred while communicating with the RecipeHub server.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#234B38] text-white rounded-xl text-sm font-medium hover:bg-[#142A20] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
