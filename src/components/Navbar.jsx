import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus, Menu, X, ChefHat, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore Recipes', path: '/recipes' },
    { label: 'Categories', path: '/#categories' },
    { label: 'Share Recipe', path: '/recipes/new' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F5ED]/95 backdrop-blur-md border-b border-[#234B38]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-2xl font-serif font-bold text-[#142A20] tracking-tight whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#234B38] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ChefHat className="w-5 h-5 text-[#F8F5ED]" />
            </div>
            <span className="tracking-tight">
              Recipe<span className="text-[#C87852] font-serif italic">Hub</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#252922]">
            {navLinks.map((link) => {
              if (link.path.startsWith('/#')) {
                return (
                  <a
                    key={link.label}
                    href={link.path}
                    className="hover:text-[#234B38] transition-colors whitespace-nowrap shrink-0 relative py-1"
                  >
                    {link.label}
                  </a>
                );
              }
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`hover:text-[#234B38] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    active ? 'text-[#234B38] font-semibold' : 'text-[#252922]/80'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#234B38] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search recipes"
              className="p-2.5 rounded-full text-[#252922] hover:bg-[#234B38]/10 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Primary Action Button */}
            <Link
              to="/recipes/new"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#234B38] rounded-xl hover:bg-[#142A20] active:scale-[0.98] transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Share Recipe</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-[#252922] hover:bg-black/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#234B38]/10 bg-[#F8F5ED] px-4 pt-4 pb-6 space-y-3">
            {navLinks.map((link) => {
              if (link.path.startsWith('/#')) {
                return (
                  <a
                    key={link.label}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-[#252922] hover:text-[#234B38]"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg ${
                    isActive(link.path)
                      ? 'bg-[#234B38]/10 text-[#234B38] font-semibold'
                      : 'text-[#252922] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/recipes/new"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-[#234B38] rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>Share Recipe</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-black/10">
            <div className="flex items-center justify-between pb-4 border-b border-black/5">
              <div className="flex items-center gap-2 text-sm font-medium text-[#777A70]">
                <Search className="w-4 h-4 text-[#234B38]" />
                <span>Search RecipeHub</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by recipe title or ingredient (e.g., fettuccine, feta, salmon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-24 py-3.5 text-base border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#234B38] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-4 bg-[#234B38] text-white rounded-lg text-sm font-medium hover:bg-[#142A20] transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#777A70]">
              <span className="font-medium text-[#252922]">Popular:</span>
              {['Tuscan Pasta', 'Shakshuka', 'Cheesecake', 'Wild Salmon', 'Crispy Tofu'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    navigate(`/recipes?search=${encodeURIComponent(term)}`);
                    setSearchOpen(false);
                  }}
                  className="hover:text-[#234B38] underline decoration-dotted transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
