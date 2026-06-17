<div align="center">

# **🎬 Movie Search App**

### Search any movie, sort by what matters to you, and see what everyone else is watching — powered by TMDB.

🔗 **[Live Demo](https://movie-search-app-weld-phi.vercel.app)**

<br>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## 📖 About

Movie Search App is a web app where users search for movies and browse results pulled live from **The Movie Database (TMDB)**. Every search is counted in the background using **Appwrite**, so the app can surface a "Trending Movies" list based on what people search for most.

---

## ✨ Features

- 🔍 **Search any movie** — Type a title and get instant results from TMDB
- ⏳ **Debounced search** — Waits 500ms after you stop typing to avoid spamming the API
- ↕️ **Sort results** — Order movies by Popularity, Rating, or Release Date
- 🔥 **Trending movies** — A live top-5 list built from the most-searched titles
- 🃏 **Rich movie cards** — Poster, rating, original language, and release year at a glance
- ⬆️ **Back to top** — A floating button appears once you scroll down
- 📱 **Responsive** — Works on both phone and desktop

---

## 🗄️ Database Schema

The app uses a single Appwrite **collection** to track search popularity (this powers the Trending list):

| Field | Type | Description |
|-------|------|-------------|
| `$id` | string | Document ID (auto-generated) |
| `searchTerm` | string | The term the user searched for |
| `count` | integer | How many times this term has been searched |
| `movie_id` | integer | TMDB ID of the top result for that search |
| `poster_url` | string | Full poster image URL from TMDB |
| `$createdAt` | datetime | When the document was created (auto-generated) |

> 🌏 The app connects to the Appwrite **Singapore (`sgp`)** endpoint. Update the endpoint in `src/appwrite.js` if your project lives in a different region.

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [TMDB API key](https://www.themoviedb.org/settings/api) (v4 read access token)
- An [Appwrite](https://appwrite.io/) account with a project, database, and collection

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/NKX0802/Movie-Search-App.git
   cd Movie-Search-App
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables** (see Configuration below)
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`

---

## ⚙️ Configuration

Create a `.env` file in the root folder and add your keys:

```env
VITE_TMDB_API_KEY=your_tmdb_read_access_token
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

> ⚠️ **Never commit your `.env` file to GitHub.** Make sure `.env` is listed in your `.gitignore`.

---

## 🎥 How to Use

1. **Search** — Type any movie title in the search bar to see matching results
2. **Sort** — When you're not searching, use the dropdown to sort by Popularity, Rating, or Release Date
3. **Browse trending** — Check the Trending Movies section to see the most-searched titles
4. **Scroll & jump** — Hit the floating **Back to top** button to return to the top of the page

---

## 🐛 Future Improvements

- 🎞️ **Movie details page** — Click a card to see the synopsis, cast, runtime, and trailer
- 📜 **Pagination / infinite scroll** — Load more than the first page of results
- ⭐ **Favorites / watchlist** — Save movies to revisit later
- 🎭 **Filter by genre** — Narrow results down to specific genres

---

## 📜 License

This project is licensed under the MIT License — feel free to use and modify it.
