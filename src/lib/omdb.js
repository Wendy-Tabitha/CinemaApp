if (!process.env.NEXT_PUBLIC_OMDB_API_KEY) {
  throw new Error('NEXT_PUBLIC_OMDB_API_KEY environment variable is not set');
}

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com';

async function fetcher(params = {}) {
  const url = new URL(BASE_URL);
  url.searchParams.append('apikey', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`OMDB API error: ${res.statusText}`);
  }
  const data = await res.json();
  if (data.Response === 'False') {
    throw new Error(`OMDB API error: ${data.Error}`);
  }
  return data;
}

export async function getMovieByImdbId(imdbId) {
  return fetcher({ i: imdbId });
}

export async function searchByTitle(title, year) {
  const params = { t: title };
  if (year) {
    params.y = year;
  }
  return fetcher(params);
} 