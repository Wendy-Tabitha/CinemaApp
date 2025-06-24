// @/components/Recommendations.tsx
"use client";

import { useEffect, useState } from 'react';
import { recommendMovies } from '@/ai/flows/recommend-movies';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import MediaGrid from './MediaGrid';

export default function Recommendations({ watchlist }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    if (!watchlist || watchlist.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const recs = await recommendMovies({ watchlist });
      setRecommendations(recs);
    } catch (err) {
      setError(err.message || 'Failed to get recommendations');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchlist]);

  const handleGetRecommendations = fetchRecommendations;

  if (!watchlist || watchlist.length === 0) {
    return <p className="text-muted-foreground">Add movies to your watchlist to get recommendations.</p>;
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading recommendations...</p>;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  if (!recommendations || recommendations.length === 0) {
    return <p className="text-muted-foreground">No recommendations found.</p>;
  }

  // This assumes recommendations are movie titles. You may want to fetch full movie data for each title.
  return (
    <Card className="bg-card/50 border-accent/30 border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-accent">
          <Wand2 />
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Get personalized recommendations based on your watchlist.
        </p>
        <Button onClick={handleGetRecommendations} disabled={loading || watchlist.length === 0}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : "Get AI Recommendations"}
        </Button>
        {watchlist.length === 0 && (
            <p className="text-sm text-amber-500 mt-2">Add items to your watchlist to get recommendations.</p>
        )}

        {recommendations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-headline font-semibold mb-3">Here are some suggestions for you:</h3>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-foreground/90">{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
