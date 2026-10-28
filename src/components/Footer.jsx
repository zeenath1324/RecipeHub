import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Github, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#142A20] text-white border-t border-[#234B38]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-serif font-bold text-white tracking-tight">
              <div className="w-9 h-9 rounded-xl bg-[#234B38] text-white flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-[#A7B8A0]" />
              </div>
              <span>
                Recipe<span className="text-[#C87852] font-serif italic">Hub</span>
              </span>
            </Link>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              A cinematic culinary platform where food enthusiasts discover curated recipes,
              master cooking techniques, and share kitchen triumphs.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A7B8A0] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-white transition-colors">
                  Explore All Recipes
                </Link>
              </li>
              <li>
                <a href="/#categories" className="hover:text-white transition-colors">
                  Recipe Categories
                </a>
              </li>
              <li>
                <Link to="/recipes/new" className="hover:text-white transition-colors">
                  Submit a Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A7B8A0] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <Link to="/recipes?category=Breakfast" className="hover:text-white transition-colors">
                  Breakfast & Brunch
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=Lunch" className="hover:text-white transition-colors">
                  Mid-Day Bowls
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=Dinner" className="hover:text-white transition-colors">
                  Artisanal Dinners
                </Link>
              </li>
              <li>
                <Link to="/recipes?category=Desserts" className="hover:text-white transition-colors">
                  Pastry & Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A7B8A0] mb-4">
              Community
            </h4>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              Built with Node.js, Express, React, and MongoDB. Open to recipe contributions worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/your-username/recipehub-recipe-sharing-platform"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@recipehub.example"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Contact Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for culinary lovers everywhere</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
