import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit, onClear, placeholder = 'Search recipes by title or ingredient...' }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-[#777A70] pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#234B38]/20 rounded-xl text-sm text-[#252922] placeholder-[#777A70] focus:outline-none focus:ring-2 focus:ring-[#234B38] focus:border-transparent transition-all shadow-sm"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 p-1 rounded-full text-[#777A70] hover:text-[#252922] hover:bg-slate-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
