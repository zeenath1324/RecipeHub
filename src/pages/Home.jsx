import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChefHat, Heart, Compass, BookOpen } from 'lucide-react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import RecipeGrid from '../components/RecipeGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import recipeApi from '../api/recipeApi';

export default function Home() {
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch trending (newest 6) and editor's picks (featured 3) from real backend API
      const [trendingRes, featuredRes] = await Promise.all([
        recipeApi.getRecipes({ limit: 6, sort: 'newest' }),
        recipeApi.getRecipes({ featured: true, limit: 3 }),
      ]);

      if (trendingRes.success) {
        setTrendingRecipes(trendingRes.data);
      }
      if (featuredRes.success) {
        setFeaturedRecipes(featuredRes.data);
      }
    } catch (err) {
      console.error('Error loading home data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* SECTION A — CINEMATIC HERO */}
      <Hero />

      {/* SECTION B — DISCOVER BY CATEGORY */}
      <CategorySection />

      {/* SECTION C — TRENDING RECIPES */}
      <section className="py-20 bg-white border-y border-[#234B38]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C87852]">
                Fresh From The Kitchen
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142A20] mt-1.5 tracking-tight">
                Trending Recipes
              </h2>
            </div>
            <Link
              to="/recipes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#234B38] hover:text-[#C87852] transition-colors"
            >
              <span>View All Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchHomeData} />
          ) : (
            <RecipeGrid recipes={trendingRecipes} />
          )}
        </div>
      </section>

      {/* SECTION D — EDITOR'S PICKS */}
      <section className="py-20 bg-[#F8F5ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C87852]">
              Chef's Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#142A20] mt-2 tracking-tight">
              Editor's Curated Picks
            </h2>
            <p className="text-sm text-[#777A70] mt-3 leading-relaxed">
              Hand-tested recipes celebrated for extraordinary balance, culinary depth, and
              unforgettable flavor profiles.
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchHomeData} />
          ) : (
            <RecipeGrid recipes={featuredRecipes} />
          )}
        </div>
      </section>

      {/* SECTION E — SHARE YOUR RECIPE PROMOTIONAL CALLOUT */}
      <section className="py-20 bg-[#142A20] text-white relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#234B38]/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#C87852]/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#A7B8A0]">
            <ChefHat className="w-7 h-7 text-[#C87852]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Have a signature dish worth sharing?
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Join thousands of passionate home chefs and culinary artists. Document your family
            classics, write down secret ingredients, and inspire dinner tables everywhere.
          </p>

          <Link
            to="/recipes/new"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C87852] hover:bg-[#b56944] text-white font-medium text-base rounded-xl shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ChefHat className="w-5 h-5 text-white" />
            <span>Share Your Recipe</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
