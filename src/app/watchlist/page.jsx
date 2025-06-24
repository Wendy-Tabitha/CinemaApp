"use client";

import { useWatchlist } from '@/hooks/useWatchlist';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaCard from '@/components/MediaCard';
import Recommendations from '@/components/Recommendations';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function WatchlistPage() {
  const { watchlist, isLoaded, toggleWatched } = useWatchlist();
  const [filter, setFilter] = useState('all');

  if (!isLoaded) {
    return <div className="text-center">Loading watchlist...</div>;
  }

  const filteredWatchlist = watchlist.filter(item => {
    if (filter === 'watched') return item.watched;
    if (filter === 'unwatched') return !item.watched;
    return true;
  });

  const watchlistTitles = watchlist.map(item => item.title);

  return (
    <div className="container mx-auto px-4 space-y-12">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-4">My Watchlist</h1>
        <div className="flex gap-2 mb-8">
            <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'}>All</Button>
            <Button onClick={() => setFilter('unwatched')} variant={filter === 'unwatched' ? 'default' : 'outline'}>To Watch</Button>
            <Button onClick={() => setFilter('watched')} variant={filter === 'watched' ? 'default' : 'outline'}>Watched</Button>
        </div>

        {filteredWatchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {filteredWatchlist.map((item) => (
              <div key={item.id} className="relative group">
                <MediaCard item={item} />
                <button
                    onClick={() => toggleWatched(item.id)}
                    className="absolute bottom-20 right-2 z-10 p-2 rounded-full bg-black/50 hover:bg-primary backdrop-blur-sm text-white"
                    title={item.watched ? "Mark as unwatched" : "Mark as watched"}
                    >
                    {item.watched ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-lg border-dashed border-2">
            <h2 className="text-2xl font-semibold mb-2">Your Watchlist is Empty</h2>
            <p className="text-muted-foreground">Add some movies and shows to get started!</p>
          </div>
        )}
      </div>

      <Recommendations watchlist={watchlistTitles} />
    </div>
  );
}
