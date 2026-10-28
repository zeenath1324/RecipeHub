export const CATEGORIES = [
  {
    name: 'Breakfast',
    description: 'Golden French toasts, vibrant shakshukas, and morning staples.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    count: '12+ Recipes',
  },
  {
    name: 'Lunch',
    description: 'Fresh harvest bowls, tartines, and energizing mid-day plates.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    count: '18+ Recipes',
  },
  {
    name: 'Dinner',
    description: 'Slow-simmered ragus, crispy skin salmon, and artisanal mains.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    count: '24+ Recipes',
  },
  {
    name: 'Desserts',
    description: 'Basque burnt cheesecakes, berry tarts, and velvety pastries.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    count: '14+ Recipes',
  },
  {
    name: 'Vegetarian',
    description: 'Garlic herb pastas, spiced tagines, and plant-forward feasts.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    count: '16+ Recipes',
  },
  {
    name: 'Quick Meals',
    description: 'Ready in under 20 minutes with maximum flavor and minimal fuss.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    count: '20+ Recipes',
  },
];

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'alphabetical', label: 'Alphabetical (A–Z)' },
  { value: 'prepTime', label: 'Fastest Prep Time' },
  { value: 'cookTime', label: 'Fastest Cook Time' },
  { value: 'totalTime', label: 'Shortest Total Time' },
];

export const TIME_FILTERS = [
  { label: 'Any Duration', value: '' },
  { label: 'Under 20 Mins', value: '20' },
  { label: 'Under 30 Mins', value: '30' },
  { label: 'Under 45 Mins', value: '45' },
  { label: 'Under 60 Mins', value: '60' },
];

export const DEFAULT_RECIPE_IMAGE =
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80';
