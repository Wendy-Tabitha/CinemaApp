import Image from 'next/image';
import { getTvDetails } from '@/lib/tmdb';
import { IMAGE_BASE_URL, POSTER_PLACEHOLDER } from '@/lib/tmdb';
import { Badge } from '@/components/ui/badge';
import { WatchlistButton } from '@/components/WatchlistButton';
import { Star, Tv, Calendar } from 'lucide-react';

export async function generateMetadata({ params }) {
  try {
    const show = await getTvDetails(params.id);
    return {
      title: `${show.name} - CinemaApp`,
      description: show.overview,
    };
  } catch (error) {
    return {
      title: 'TV Show Not Found - CinemaApp',
    };
  }
}

export default async function TvShowPage({ params }) {
  const show = await getTvDetails(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Image
            src={show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : POSTER_PLACEHOLDER}
            alt={show.name}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full"
            priority
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{show.name}</h1>
          <p className="text-xl text-muted-foreground mb-6">{show.first_air_date?.substring(0, 4)}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {show.genres.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>{show.vote_average}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="h-5 w-5" />
              <span>{show.number_of_seasons} seasons</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{show.first_air_date}</span>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-muted-foreground">{show.overview}</p>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Cast</h2>
            <p className="text-muted-foreground">
              {show.credits.cast.slice(0, 5).map((member) => member.name).join(', ')}
            </p>
          </div>
          <div className="mb-6">
            <WatchlistButton item={show} />
          </div>
        </div>
      </div>
    </div>
  );
}
