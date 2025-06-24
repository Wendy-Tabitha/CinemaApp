# CinemaApp

CinemaApp is a modern web application for discovering, searching, and exploring movies and TV shows. It leverages The Movie Database (TMDB) as the primary data source and uses OMDB as a fallback for additional or missing movie information. The app also features an AI-powered recommendation engine using Gemini.

---

## Features

- Browse trending movies and TV shows
- Filter by genre
- Search for movies and TV shows
- View detailed information for each title
- Add/remove items from your watchlist with a single click (toggle)
- AI-powered recommendations based on your watchlist
- Fallback to OMDB for missing movie data
- Responsive, modern UI with compact image grid and aligned header

---

## Codebase Structure

```
CineScope/
  ├── apphosting.yaml           # Hosting configuration (if deploying to cloud)
  ├── components.json           # Component registry/config
  ├── docs/
  │   └── blueprint.md          # Project blueprint and planning docs
  ├── next.config.js            # Next.js configuration
  ├── package.json              # Project dependencies and scripts
  ├── postcss.config.mjs        # PostCSS configuration
  ├── tailwind.config.js        # Tailwind CSS configuration
  ├── tsconfig.json             # TypeScript configuration (legacy, not required for current JSX setup)
  ├── README.md                 # Project documentation
  ├── src/
  │   ├── ai/
  │   │   ├── dev.js
  │   │   ├── flows/
  │   │   │   └── recommend-movies.js   # AI recommendation logic
  │   │   └── genkit.js                 # AI (Gemini) configuration
  │   ├── app/
  │   │   ├── error.jsx
  │   │   ├── favicon.ico
  │   │   ├── globals.css
  │   │   ├── layout.jsx
  │   │   ├── loading.jsx
  │   │   ├── movie/
  │   │   │   └── [id]/
  │   │   │       ├── page.jsx          # Movie details page
  │   │   │       └── not-found.jsx     # OMDB fallback for missing movies
  │   │   ├── page.jsx                  # Home page (trending/genre)
  │   │   ├── search/
  │   │   │   └── page.jsx              # Search results
  │   │   ├── tv/
  │   │   │   └── [id]/
  │   │   │       └── page.jsx          # TV show details page
  │   │   └── watchlist/
  │   │       └── page.jsx              # Watchlist page
  │   ├── components/
  │   │   ├── GenreFilter.jsx           # Genre filter UI
  │   │   ├── Header.jsx
  │   │   ├── Logo.jsx
  │   │   ├── MediaCard.jsx             # Card for each movie/show
  │   │   ├── MediaGrid.jsx             # Grid layout for media
  │   │   ├── PaginationControls.jsx
  │   │   ├── Recommendations.jsx
  │   │   ├── SearchBar.jsx
  │   │   ├── WatchlistButton.jsx
  │   │   └── ui/                       # UI primitives (buttons, cards, etc.)
  │   ├── hooks/                        # Custom React hooks
  │   ├── lib/
  │   │   ├── tmdb.js                   # TMDB API client
  │   │   ├── omdb.js                   # OMDB API client (fallback)
  │   │   ├── types.js                  # (Legacy) TypeScript types
  │   │   └── utils.js                  # Utility functions
  │   └── ...
  └── ...
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Wendy-Tabitha/CinemaApp.git
cd CinemaApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following content:

```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key_here
```

- **TMDB API Key:** [Get it here](https://www.themoviedb.org/settings/api)
- **Gemini API Key:** [Get it here](https://makersuite.google.com/app/apikey)
- **OMDB API Key:** [Get it here](https://www.omdbapi.com/apikey.aspx)

> **Note:** Never commit your `.env` file. Only commit `.env.example` as a template for other developers.

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works

- **Trending & Genre Filtering:**
  - The home page shows trending movies and TV shows from TMDB.
  - Users can filter by genre using the genre filter bar.
- **Search:**
  - Use the search bar to find movies and TV shows by title.
- **Movie/TV Details:**
  - Click on a movie or show to view detailed information.
  - If a movie is not found in TMDB, the app automatically tries to fetch details from OMDB.
- **Watchlist:**
  - Add or remove movies and shows to your personal watchlist with a single click (toggle).
  - The watchlist button is now a compact star icon for a cleaner UI.
- **AI Recommendations:**
  - The app uses Gemini AI to recommend movies and shows based on your watchlist.
- **UI/UX Improvements:**
  - Header, search bar, and watchlist button are aligned with the main content container.
  - Media images are smaller and more compact for a modern look.
  - All main content is spaced away from the screen edges for better readability.

---

## Technologies Used

- [Next.js](https://nextjs.org/) (App Router, Server Components)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [OMDB API](https://www.omdbapi.com/)
- [Google Gemini AI](https://ai.google.dev/gemini-api/docs)

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add new feature' && git push`)
5. Open a pull request

---

## License

[MIT](LICENSE)
