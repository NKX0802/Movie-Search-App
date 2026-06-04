# 🎬 Movie Search App

A simple web app to search for movies and see what is trending right now.

---

## 🏷️ Built With

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

- 🔎 **Live Search** — Results appear as user type.
- ↕️ **Sorting** — Browse movies by popularity, rating, or release date.
- 🔥 **Trending** — See the most-searched movies from all users.
- 🎴 **Movie Cards** — View each movie's poster, rating, language, and year.
- ⬆️ **Back to Top** — One click to return to the top of the page.
- 📱 **Responsive** — Works smoothly on both phone and computer.

---

## 🖱️ How to Use

| Action           | What to do                     |
| ---------------- | ------------------------------ |
| Search a movie   | Type in the search bar         |
| Clear the search | Click the ✖ button             |
| Change the order | Use the sort dropdown          |
| Return to top    | Click the "Back to Top" button |

---

## 🧠 How I Built It

I built this app with React and styled it using Tailwind CSS. Movie information comes from the TMDB movie service, and a cloud database (Appwrite) counts every search to show which movies are trending.

Along the way I learned to:

- Delay search requests by debouncing the input so the app only loads results after the user stops typing.
- Connect a website to a live movie database and a cloud database.
- Handle loading and error messages so the app always feels smooth.
- Design a layout that looks good on any screen size.

---

## 🚀 Future Improvements

- 🎬 A detail page for each movie (cast, trailer, and summary).
- 📜 Load more results with pagination or infinite scroll.
- ⭐ A favourites list to save movies.
