import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';

export default function CategorySection() {
  const navigate = useNavigate();

  const handleSelectCategory = (categoryName) => {
    navigate(`/recipes?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section id="categories" className="py-20 bg-[#F8F5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C87852]">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142A20] mt-1.5 tracking-tight">
              Discover by Category
            </h2>
          </div>
          <p className="text-sm text-[#777A70] max-w-md">
            Whether preparing a quick weekday breakfast or slow-simmering an artisanal dinner,
            explore hand-crafted culinary ideas.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleSelectCategory(cat.name)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#234B38]/10"
            >
              {/* Category Background Image with Zoom on Hover */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />

              {/* Styled Fallback Pattern */}
              <div className="absolute inset-0 bg-[#234B38] -z-10" />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:via-black/45 transition-colors" />

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#A7B8A0] tracking-wide">
                    {cat.count}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-[#C87852] transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-1.5 tracking-tight group-hover:text-[#F8F5ED] transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
