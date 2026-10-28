# RecipeHub — Cinematic Recipe Sharing Platform

> **Discover. Cook. Share.**  
> A premium editorial food magazine and cinematic recipe-sharing platform where culinary lovers discover curated dishes, follow step-by-step cooking checklists, and publish their own creations.

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Screenshots & UI Preview](#screenshots--ui-preview)
5. [Architecture & Folder Structure](#architecture--folder-structure)
6. [Prerequisites](#prerequisites)
7. [Beginner-Friendly Windows Setup (PowerShell)](#beginner-friendly-windows-setup-powershell)
8. [MongoDB Atlas Setup Guide](#mongodb-atlas-setup-guide)
9. [REST API Documentation](#rest-api-documentation)
10. [Automated Testing](#automated-testing)
11. [Production Build & Deployment](#production-build--deployment)
12. [Git & GitHub Publishing Commands](#git--github-publishing-commands)
13. [License](#license)

---

## 1. Project Overview

**RecipeHub** is an industry-level full-stack web application designed with an editorial aesthetic inspired by high-end culinary journals. It blends an immersive video hero header with server-side recipe discovery, real-time checklist tracking, recipe CRUD operations, and persistent MongoDB Atlas data modeling via Mongoose.

The platform provides a dual-mode database engine:
- **MongoDB Atlas Mode**: Directly connects to your cloud MongoDB Atlas database using standard Mongoose ODM schemas, indexes, and validation.
- **Resilient Embedded Mode**: When `MONGODB_URI` is not yet configured, RecipeHub automatically boots with a pre-seeded culinary dataset, allowing immediate zero-configuration local testing without database crashes.

---

## 2. Key Features

- **Cinematic Video Hero**:
  - Autoplay, muted, loop video stream featuring fresh ingredient preparations and steam rises.
  - Video play/pause toggle widget and automatic graceful fallback to high-resolution poster.
  - Staggered word reveals and editorial typography.
- **Curated Category Discovery**:
  - Filter by Breakfast, Lunch, Dinner, Desserts, Vegetarian, and Quick Meals.
  - Category cards with zoom-on-hover and dish counts.
- **Server-Side Recipe Discovery & Search**:
  - Real-time search by title, description, or ingredient name.
  - Category and difficulty filter controls.
  - Maximum cooking time slider (e.g. Under 20m, 30m, 45m, 60m).
  - Multi-attribute sorting: Newest, Oldest, Title (A–Z), Fastest Prep Time, Shortest Cook Time.
  - Backend pagination with total counts and next/prev controls.
  - Full URL synchronization (`/recipes?category=Dinner&sort=newest&page=1`) for shareable search links.
- **Interactive Recipe Detail Experience**:
  - Large photography presentation with metrics strip (Prep Time, Cook Time, Total Time, Yield).
  - **Interactive Cooking Checklist**: Tick off ingredients as they are measured and steps as they are completed.
  - **Live Cooking Progress Meter**: Visual completion bar showing percentage finished.
  - Print-friendly layout (via `window.print()` with custom `@media print` styling that hides navigation, headers, and controls).
  - Share link button with one-click clipboard copying.
- **Complete Recipe CRUD**:
  - **Create**: Add new recipes with dynamic ingredient and instruction step rows, live image preview, and comprehensive schema validation.
  - **Read**: View single recipes by MongoDB ObjectId or URL-friendly slug.
  - **Update**: Edit existing recipes with prepopulated form fields.
  - **Delete**: Safe deletion protected by an accessible confirmation dialog modal.
- **Centralized REST API**:
  - Express.js architecture with clean routes, controllers, middleware, and standard error handling.

---

## 3. Technology Stack

### Frontend
- **React.js 19** with **Vite**
- **JavaScript & TypeScript**
- **Tailwind CSS v4** (`@import "tailwindcss"`)
- **React Router DOM v7** (SPA client-side routing)
- **Axios** (Centralized HTTP client)
- **Lucide React** (Crisp vector icons)
- **Google Fonts** (*Playfair Display* for editorial headings, *Plus Jakarta Sans* for clean body prose)

### Backend
- **Node.js** (LTS)
- **Express.js** (REST API endpoints)
- **Mongoose ODM** (Schema modeling, indexes, pre-save slug hooks, validation)
- **Cors** & **dotenv** (Security and environment configuration)

### Database
- **MongoDB Atlas** (Cloud document database)
- **Built-in Resilient Fallback Engine** (Zero-crash out-of-the-box local development)

### Testing
- **Node.js Test Runner** (`backend/tests/recipeApi.test.js`) with 12 automated test cases.

---

## 4. Screenshots & UI Preview

| Homepage & Video Hero | Explore & Search Grid |
| :---: | :---: |
| `[Screenshot Placeholder: Hero Section]` | `[Screenshot Placeholder: Filter & Search Page]` |

| Interactive Recipe Details | Add / Edit Recipe Form |
| :---: | :---: |
| `[Screenshot Placeholder: Cooking Checklist]` | `[Screenshot Placeholder: Recipe Editor]` |

---

## 5. Architecture & Folder Structure

```
recipehub-recipe-sharing-platform/
├── backend/
│   ├── scripts/
│   │   ├── seed.js             # Standalone MongoDB Atlas seed CLI script
│   │   └── seedData.js         # 8 rich demonstration culinary recipes
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Mongoose Atlas connection & fallback adapter
│   │   ├── controllers/
│   │   │   └── recipeController.js # Health, CRUD, filtering, & pagination
│   │   ├── middleware/
│   │   │   ├── errorHandler.js # Centralized Mongoose error formatting
│   │   │   └── notFound.js     # 404 handler
│   │   ├── models/
│   │   │   └── Recipe.js       # Mongoose Schema & hybrid persistence adapter
│   │   ├── routes/
│   │   │   └── recipeRoutes.js # /api/recipes router
│   │   ├── app.js              # Express app setup
│   │   └── server.js           # Standalone Express listener (port 5000)
│   ├── tests/
│   │   └── recipeApi.test.js   # Automated API test suite
│   ├── .env.example            # Backend environment template
│   ├── .gitignore              # Backend ignore rules
│   └── package.json            # Backend package scripts
├── public/
│   └── videos/
│       ├── hero-food.mp4       # Optional local high-bitrate video asset
│       └── README.txt
├── src/
│   ├── api/
│   │   └── recipeApi.js        # Centralized Axios client
│   ├── components/
│   │   ├── CategorySection.jsx # Category cards with image zoom
│   │   ├── ConfirmDialog.jsx   # Accessible modal for deletion confirmation
│   │   ├── ErrorMessage.jsx    # Error state container with retry action
│   │   ├── Footer.jsx          # Clean editorial footer
│   │   ├── Hero.jsx            # Moving food video hero with fallback
│   │   ├── LoadingSkeleton.jsx # Pulse skeleton loaders
│   │   ├── Navbar.jsx          # Top Bar Contract header with mobile drawer
│   │   ├── RecipeCard.jsx      # Rounded card with unboxed metadata
│   │   ├── RecipeForm.jsx      # Reusable Add/Edit form with dynamic rows
│   │   ├── RecipeGrid.jsx      # Responsive 3-col recipe grid with empty state
│   │   └── SearchBar.jsx       # Search input with clear button
│   ├── pages/
│   │   ├── AddRecipe.jsx       # Route: /recipes/new
│   │   ├── EditRecipe.jsx      # Route: /recipes/:id/edit
│   │   ├── ExploreRecipes.jsx  # Route: /recipes
│   │   ├── Home.jsx            # Route: /
│   │   ├── NotFound.jsx        # Route: 404 fallback
│   │   └── RecipeDetails.jsx   # Route: /recipes/:id
│   ├── utils/
│   │   └── constants.js        # Categories, difficulties, sort options
│   ├── App.tsx                 # Client routing & layout wrapper
│   ├── index.css               # Tailwind CSS theme & print styles
│   └── main.tsx                # React DOM mount point
├── .env.example                # Root environment template
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point with Google Fonts
├── metadata.json               # Applet metadata
├── package.json                # Full-stack root scripts & dependencies
├── server.ts                   # Full-stack server (Express + Vite middlewares)
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite bundling & alias configuration
```

---

## 6. Prerequisites

Before running the project on Windows:
1. **Node.js (v18.x or v20.x LTS)**: Download and install from [nodejs.org](https://nodejs.org).
2. **Git**: Download from [git-scm.com](https://git-scm.com).
3. **MongoDB Atlas Account** (Optional for cloud database, or use the pre-seeded built-in mode).

---

## 7. Beginner-Friendly Windows Setup (PowerShell)

Follow these step-by-step commands in **Windows PowerShell**.

### Step 1: Open PowerShell and Clone/Navigate to the Project
```powershell
# Check Node.js and npm versions
node -v
npm -v

# Navigate to your project folder
cd C:\path\to\recipehub-recipe-sharing-platform
```

### Step 2: Install Dependencies
```powershell
# Install all required packages (Express, Mongoose, React, Axios, Tailwind, etc.)
npm install
```

### Step 3: Configure Environment Variables
```powershell
# Copy the example environment file to .env
Copy-Item .env.example .env

# (Optional) Open .env in Notepad to configure your MongoDB connection string:
notepad .env
```
Inside `.env`, you can set:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipehub?retryWrites=true&w=majority
```
*(If you leave `MONGODB_URI` as-is, RecipeHub automatically starts in resilient mode with 8 pre-seeded recipes!)*

### Step 4: Run the Automated Test Suite
```powershell
# Run the 12 automated API tests
npm test
```
You will see:
```
  ✅ PASS: GET /api/health returns 200 and healthy status
  ✅ PASS: GET /api/recipes returns paginated recipe list
  ✅ PASS: GET /api/recipes?category=Breakfast filters by category
  ✅ PASS: POST /api/recipes creates a new recipe and returns 201
  ...
  🏁 Test Summary: 12 Passed, 0 Failed
```

### Step 5: Start the Full-Stack Application
```powershell
# Starts Express API + Vite Frontend together on http://localhost:3000
npm run dev
```

Open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 8. MongoDB Atlas Setup Guide

To connect a free production MongoDB Atlas cloud cluster:

1. **Sign Up**: Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. **Create Cluster**: Select **M0 Free Tier** (shared cluster in your nearest region).
3. **Create Database User**:
   - Go to **Security > Database Access**.
   - Click **Add New Database User**.
   - Choose **Password** authentication (e.g., username `recipe_admin` and a strong password).
   - Set privileges to **Read and write to any database**.
4. **Configure Network Access**:
   - Go to **Security > Network Access**.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) or enter your current IP.
5. **Get Connection String**:
   - Go to **Deployments > Database**.
   - Click **Connect > Drivers > Node.js**.
   - Copy the connection URI:
     ```
     mongodb+srv://recipe_admin:<password>@cluster0.mongodb.net/recipehub?retryWrites=true&w=majority
     ```
6. **Set `.env`**:
   Replace `<password>` with your real user password and paste the string into `.env`:
   ```env
   MONGODB_URI=mongodb+srv://recipe_admin:MySecurePass123@cluster0.mongodb.net/recipehub?retryWrites=true&w=majority
   ```
7. **Seed the Atlas Database**:
   ```powershell
   npm run seed
   ```
   This will insert 8 demonstration recipes into your MongoDB Atlas collection.

---

## 9. REST API Documentation

Base URL: `http://localhost:3000/api`

### Endpoints:

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Check API & database health | None |
| `GET` | `/recipes` | Retrieve paginated recipes | `search`, `category`, `difficulty`, `maxTime`, `sort`, `page`, `limit`, `featured` |
| `GET` | `/recipes/:id` | Fetch single recipe by ID or slug | None |
| `POST` | `/recipes` | Create a new recipe | None (JSON Body required) |
| `PUT` | `/recipes/:id` | Update an existing recipe | None (JSON Body required) |
| `DELETE` | `/recipes/:id` | Delete recipe by ID | None |

### Example Recipe JSON Payload (POST / PUT):
```json
{
  "title": "Creamy Tuscan Garlic Herb Fettuccine",
  "description": "Silky egg fettuccine tossed in a rich sun-dried tomato and garlic cream sauce.",
  "imageUrl": "https://images.unsplash.com/photo-1621996346565-e3d5d6281223",
  "category": "Vegetarian",
  "prepTime": 15,
  "cookTime": 20,
  "servings": 4,
  "difficulty": "Easy",
  "featured": true,
  "ingredients": [
    { "name": "Fresh egg fettuccine", "quantity": "400g" },
    { "name": "Heavy whipping cream", "quantity": "1 cup" },
    { "name": "Sun-dried tomatoes", "quantity": "1/2 cup" }
  ],
  "instructions": [
    { "stepNumber": 1, "description": "Boil salted water and cook pasta al dente." },
    { "stepNumber": 2, "description": "Sauté minced garlic in olive oil, stir in cream and sun-dried tomatoes." }
  ]
}
```

---

## 10. Automated Testing

Run the automated test suite directly using:
```powershell
npm test
```
The suite spins up an isolated ephemeral server, tests all health and CRUD routes, tests category/difficulty/search filtering, asserts pagination limits, tests input rejection with HTTP 400, and verifies 404 responses for nonexistent resources.

---

## 11. Production Build & Deployment

### Build the Frontend
```powershell
npm run build
```
This produces an optimized production bundle in `/dist`.

### Run in Production Mode
```powershell
# Set NODE_ENV to production and launch
$env:NODE_ENV="production"
npm start
```

### Hosting Recommendations
- **Full-Stack on Render / Railway / Google Cloud Run**:
  - Build command: `npm install && npm run build`
  - Start command: `node server.ts`
  - Environment variables: `MONGODB_URI`, `PORT`, `NODE_ENV=production`.
- **Frontend on Vercel + Backend on Render**:
  - Point `VITE_API_URL` to your remote Express service URL (e.g. `https://recipehub-api.onrender.com/api`).

---

## 12. Git & GitHub Publishing Commands

Publish this repository to your GitHub account using **Windows PowerShell**:

```powershell
# 1. Initialize Git in the project root
git init

# 2. Add all project files
git add .

# 3. Create your initial commit
git commit -m "feat: complete RecipeHub cinematic recipe sharing platform"

# 4. Rename main branch
git branch -M main

# 5. Create a new repository on github.com named 'recipehub-recipe-sharing-platform'
# 6. Link your local repository to GitHub (replace with your GitHub username)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/recipehub-recipe-sharing-platform.git

# 7. Push the codebase to GitHub
git push -u origin main
```

---

## 13. License

Distributed under the Apache-2.0 License.
Built for the CodeCT Technologies Full-Stack Technical Assessment.
