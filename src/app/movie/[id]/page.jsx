import Image from 'next/image';
import { getMovieDetails } from '@/lib/tmdb';
import { IMAGE_BASE_URL, POSTER_PLACEHOLDER } from '@/lib/tmdb';
import { Badge } from '@/components/ui/badge';
import { WatchlistButton } from '@/components/WatchlistButton';
import { Star, Clock } from 'lucide-react';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  try {
    const movie = await getMovieDetails(resolvedParams.id);
    return {
      title: `${movie.title} - CineScope`,
      description: movie.overview,
    };
  } catch {
    return { title: 'Movie Not Found - CineScope' };
  }
}

function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

export default async function MoviePage({ params }) {
  const resolvedParams = await params;
  const movie = await getMovieDetails(resolvedParams.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : POSTER_PLACEHOLDER}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
            priority
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{movie.release_date?.substring(0, 4)}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>{movie.vote_average}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{movie.runtime} min</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-muted-foreground">{movie.overview}</p>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Cast</h2>
            <p className="text-muted-foreground">
              {movie.credits.cast.slice(0, 5).map((member) => member.name).join(', ')}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Director</h2>
            <p className="text-muted-foreground">
              {movie.credits.crew.filter((member) => member.job === 'Director').map((member) => member.name).join(', ')}
            </p>
          </div>
          <div className="mb-6">
            <WatchlistButton item={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}
