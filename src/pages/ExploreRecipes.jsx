import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import recipeApi from '../api/recipeApi';
import { CATEGORIES, DIFFICULTIES, SORT_OPTIONS, TIME_FILTERS } from '../utils/constants';

export default function ExploreRecipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters read from URL
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'All';
  const currentDifficulty = searchParams.get('difficulty') || 'All';
  const currentMaxTime = searchParams.get('maxTime') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Local search input buffer for debounced typing
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Sync search input if URL changes externally
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // Update query params helper
  const updateQuery = useCallback((updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '' || value === 'All') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value.toString());
      }
    });

    // Reset to page 1 whenever any filter other than page changes
    if (!('page' in updates)) {
      nextParams.delete('page');
    }

    setSearchParams(nextParams);
  }, [searchParams, setSearchParams]);

  // Fetch recipes from Express backend
  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: 9,
        sort: currentSort,
      };

      if (currentSearch.trim()) params.search = currentSearch.trim();
      if (currentCategory && currentCategory !== 'All') params.category = currentCategory;
      if (currentDifficulty && currentDifficulty !== 'All') params.difficulty = currentDifficulty;
      if (currentMaxTime) params.maxTime = currentMaxTime;

      const response = await recipeApi.getRecipes(params);

      if (response.success) {
        setRecipes(response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setError(err.response?.data?.message || err.message || 'Could not load recipes from server.');
    } finally {
      setLoading(false);
    }
  }, [currentSearch, currentCategory, currentDifficulty, currentMaxTime, currentSort, currentPage]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Handlers
  const handleSearchSubmit = () => {
    updateQuery({ search: searchInput });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateQuery({ search: '' });
  };

  const handleCategoryChange = (category) => {
    updateQuery({ category });
  };

  const handleDifficultyChange = (difficulty) => {
    updateQuery({ difficulty });
  };

  const handleTimeChange = (e) => {
    updateQuery({ maxTime: e.target.value });
  };

  const handleSortChange = (e) => {
    updateQuery({ sort: e.target.value });
  };

  const handlePageChange = (newPage) => {
    updateQuery({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAllFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    Boolean(currentSearch) ||
    currentCategory !== 'All' ||
    currentDifficulty !== 'All' ||
    Boolean(currentMaxTime) ||
    currentSort !== 'newest';

  return (
    <div className="min-h-screen bg-[#F8F5ED] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C87852]">
            Culinary Archives
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#142A20] mt-2 tracking-tight">
            Explore All Recipes
          </h1>
          <p className="text-sm text-[#777A70] mt-3">
            Search our library of chef-crafted recipes, filter by preparation constraints, or browse
            by time and difficulty.
          </p>
        </div>

        {/* Search Bar Centerpiece */}
        <div className="flex justify-center mb-10">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSearchSubmit}
            onClear={handleClearSearch}
            placeholder="Search by title, description, or ingredients..."
          />
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white rounded-2xl p-6 border border-[#234B38]/10 shadow-sm mb-10 space-y-6">
          {/* Categories Segmented Bar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#142A20] uppercase tracking-wider">
                Categories
              </span>
              {currentCategory !== 'All' && (
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="text-xs text-[#C87852] hover:underline"
                >
                  Reset category
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', ...CATEGORIES.map((c) => c.name)].map((cat) => {
                const isSelected = currentCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#234B38] text-white shadow-sm'
                        : 'bg-[#F8F5ED] text-[#252922] hover:bg-[#234B38]/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Filters: Difficulty, Max Time, Sorting */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Difficulty Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#777A70] mr-1">Difficulty:</span>
                {['All', ...DIFFICULTIES].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => handleDifficultyChange(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      currentDifficulty === diff
                        ? 'bg-[#142A20] text-white'
                        : 'bg-slate-100 text-[#777A70] hover:bg-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Max Time Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="timeFilter" className="text-xs font-medium text-[#777A70]">
                  Max Time:
                </label>
                <select
                  id="timeFilter"
                  value={currentMaxTime}
                  onChange={handleTimeChange}
                  className="bg-[#F8F5ED] border border-slate-200 text-xs rounded-lg px-3 py-1.5 text-[#252922] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
                >
                  {TIME_FILTERS.map((tf) => (
                    <option key={tf.value} value={tf.value}>
                      {tf.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="sortFilter" className="text-xs font-medium text-[#777A70]">
                Sort by:
              </label>
              <select
                id="sortFilter"
                value={currentSort}
                onChange={handleSortChange}
                className="bg-[#F8F5ED] border border-slate-200 text-xs rounded-lg px-3 py-1.5 text-[#252922] focus:outline-none focus:ring-1 focus:ring-[#234B38]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Clear All Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleClearAllFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#C87852] hover:bg-[#C87852]/10 rounded-lg transition-colors font-medium ml-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-8 text-xs text-[#777A70]">
          <div>
            Showing{' '}
            <span className="font-semibold text-[#142A20] tabular-nums">
              {pagination.total > 0 ? (currentPage - 1) * pagination.limit + 1 : 0}
            </span>
            –
            <span className="font-semibold text-[#142A20] tabular-nums">
              {Math.min(currentPage * pagination.limit, pagination.total)}
            </span>{' '}
            of <span className="font-semibold text-[#142A20] tabular-nums">{pagination.total}</span>{' '}
            recipes
          </div>

          {currentSearch && (
            <div>
              Search results for{' '}
              <span className="font-semibold text-[#142A20]">"{currentSearch}"</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        {loading ? (
          <LoadingSkeleton count={9} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchRecipes} />
        ) : (
          <RecipeGrid recipes={recipes} onClearFilters={handleClearAllFilters} />
        )}

        {/* Server-Side Pagination Bar */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="p-2.5 rounded-xl border border-[#234B38]/20 bg-white text-[#252922] hover:bg-[#234B38]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-xl text-sm font-medium tabular-nums transition-all ${
                  pageNum === currentPage
                    ? 'bg-[#234B38] text-white shadow-sm'
                    : 'bg-white border border-[#234B38]/20 text-[#252922] hover:bg-[#234B38]/10'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="p-2.5 rounded-xl border border-[#234B38]/20 bg-white text-[#252922] hover:bg-[#234B38]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
