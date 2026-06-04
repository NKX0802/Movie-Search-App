# 🎬 Movie Search App

A fast, clean, and interactive movie discovery app. Search The Movie Database (TMDB) live as you type, sort the catalogue by popularity, rating, or release date, and see what everyone else is searching for through a real-time **Trending Movies** board powered by Appwrite.

> 🔗 **Live Demo:** movie-search-app-weld-phi.vercel.app

---

## 🏷️ Tech Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-FD366E?logo=appwrite&logoColor=white)
![TMDB API](https://img.shields.io/badge/TMDB-API-01B4E4?logo=themoviedatabase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)

- **React 19** — UI and component state
- **Vite 8** — dev server and build tooling
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite`)
- **Appwrite** — cloud database that tracks search counts and powers trending
- **TMDB API** — movie search and discovery data
- **react-use** — `useDebounce` for efficient, typing-aware search

---

## ✨ Features

- **🔎 Live search** — results update automatically as you type, debounced by 500 ms so the app isn't hammering the API on every keystroke.
- **↕️ Smart sorting** — when you're not searching, browse the full catalogue sorted by **Popularity**, **Rating**, or **Release Date**.
- **🔥 Trending movies** — the top 5 most-searched titles across all users, ranked live from an Appwrite database.
- **🎴 Rich movie cards** — each card shows the poster, average rating (to one decimal), original language, and release year, with graceful fallbacks when data or artwork is missing.
- **⏳ Loading & error states** — an animated spinner while fetching and clear, friendly messages when something goes wrong or no results are found.
- **⬆️ Back to top** — a floating button appears after you scroll down and smoothly returns you to the top.
- **📱 Responsive design** — a modern layout that adapts cleanly from phone to desktop, with smooth hover and scale interactions.

---

## 🖱️ Interactions & Controls

This is a pointer/touch-driven app — here's how to drive it:

| Action | How |
| --- | --- |
| Search for a movie | Start typing in the search bar — results load automatically (no Enter needed) |
| Clear the search | Click the **✖** button inside the search bar |
| Change sort order | Use the **sort dropdown** (Popularity / Rating / Release Date) — only shown when the search bar is empty |
| See trending titles | Scroll to the **Trending Movies** section near the top |
| Jump back to top | Click the floating **Back to top** button (appears after scrolling ~300 px) |

> ℹ️ The sort dropdown is intentionally hidden while you have an active search, since search results come straight from TMDB's relevance ranking.

---

## 🛠️ How It Works

A quick tour of the moving parts:

- **`src/App.jsx`** — the heart of the app. Holds all state (search term, movie list, sort order, trending list, loading/error flags) and orchestrates data fetching.
  - Builds two different TMDB endpoints depending on context: `/search/movie` when there's a query, `/discover/movie?sort_by=…` when browsing.
  - `useDebounce` delays the actual request until you've stopped typing for 500 ms.
  - A scroll listener toggles the "Back to top" button and is cleaned up on unmount.
- **`src/appwrite.js`** — talks to Appwrite Cloud.
  - `updateSearchCount()` increments a counter for each searched term (or creates it on first search), storing the top result's poster.
  - `getTrendingMovies()` returns the 5 highest-count documents to build the trending board.
- **`src/components/`**
  - `SearchBar.jsx` — controlled input with a conditional clear button.
  - `MovieCard.jsx` — presentational card with safe fallbacks (`N/A`, placeholder poster).
  - `Spinner.jsx` — accessible animated SVG loader.

---

## 🧠 Process & What I Learned

This project started as a simple "search a movie API" idea and grew into a small full-stack experience. Some of the things I worked through while building it:

- **Debouncing API calls** — my first version fired a request on every keystroke, which was wasteful and made the UI feel jittery. Switching to `useDebounce` (500 ms) taught me how to balance responsiveness with API efficiency.
- **Two-mode data fetching** — handling the difference between *searching* (TMDB `search/movie`) and *browsing* (TMDB `discover/movie` with a sort parameter) pushed me to think about conditional endpoints and how `useEffect` dependencies (`debouncedSearchTerm`, `sortBy`) drive re-fetching.
- **Adding a backend with Appwrite** — wiring up a cloud database to count searches and surface trending movies was my introduction to persisting data without writing my own server. I learned about collections, documents, queries (`orderDesc`, `limit`), and keeping credentials in environment variables.
- **Defensive UI states** — early on I only handled the "happy path." Adding explicit loading, error, and empty states (and poster/rating fallbacks in `MovieCard`) made the app feel far more finished.
- **Responsive styling with Tailwind v4** — using utility classes plus a custom `@theme` block, I got comfortable with breakpoints, gradients, and subtle `hover:scale` / `transition` polish that works across mobile and desktop.

---

## 🚀 Improvements / Roadmap

Ideas for where this could go next:

- **Movie detail pages** — click a card to see overview, cast, trailer, and runtime.
- **Pagination / infinite scroll** — currently only the first page of results is shown.
- **Genre & year filters** — combine with the existing sort options for finer discovery.
- **Keyboard shortcuts** — e.g. `/` to focus search, `Esc` to clear, arrow keys to navigate cards.
- **Favourites / watchlist** — let users save movies (persisted in Appwrite).
- **Skeleton loaders** — replace the single spinner with card-shaped placeholders.
- **Accessibility pass** — focus styles, ARIA labels, and full keyboard navigation.
- **Tests** — add component and integration tests (e.g. Vitest + React Testing Library).

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- A free [TMDB API key](https://www.themoviedb.org/settings/api) (use the **API Read Access Token / v4 Bearer token**)
- A free [Appwrite Cloud](https://cloud.appwrite.io/) project with a database and collection

### 1. Clone the repository
```bash
git clone https://github.com/NKX0802/Movie-Search-App.git
cd Movie-Search-App
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_read_access_token
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

> The Appwrite collection should have these attributes: `searchTerm` (string), `count` (integer), `movie_id` (integer), and `poster_url` (string). The app uses the Singapore endpoint (`https://sgp.cloud.appwrite.io/v1`) — adjust in `src/appwrite.js` if your project is in another region.

### 4. Run the development server
```bash
npm run dev
```
Then open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts
```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

---

## 📺 Demo

> 🎥 _Demo video / live walkthrough goes here._

[![Watch the demo](https://img.shields.io/badge/▶_Watch-Demo-FD366E?style=for-the-badge)](https://your-live-url.example.com)

---

## 📄 License

This project is open source and available for learning and personal use.
Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/) — this product uses the TMDB API but is not endorsed or certified by TMDB.
