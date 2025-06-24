import { getTrending, getMoviesByGenre } from '@/lib/tmdb';
import MediaGrid from '@/components/MediaGrid';
import { GenreFilter } from '@/components/GenreFilter';
import { Suspense } from 'react';

export const revalidate = 3600; // Revalidate every hour

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedGenre = resolvedSearchParams?.genre || undefined;
  const media = await (selectedGenre
    ? getMoviesByGenre(selectedGenre)
    : getTrending('all'));

  const title = selectedGenre ? `Movies` : 'Trending This Week';

  return (
    <div className="container mx-auto px-4 space-y-12">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-4 text-accent">Discover</h1>
        <p className="text-lg text-muted-foreground">Browse movies by genre.</p>
        <Suspense fallback={<div>Loading genres...</div>}>
          <GenreFilter selectedGenre={selectedGenre} />
        </Suspense>
      </div>

      <div>
        <h2 className="text-3xl font-headline font-semibold mb-6">{title}</h2>
        <Suspense fallback={<div>Loading media...</div>}>
          {media.results.length > 0 ? (
            <MediaGrid media={media.results} />
          ) : (
            <p>No content found for this genre.</p>
          )}
        </Suspense>
      </div>
    </div>
  );
}
