"use client";

import { useWatchlist } from '@/hooks/useWatchlist';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export function WatchlistButton({ item }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(item.id);

  return (
    <Button
      variant={inWatchlist ? 'default' : 'outline'}
      onClick={() => (inWatchlist ? removeFromWatchlist(item.id) : addToWatchlist(item))}
      aria-pressed={inWatchlist}
      className="flex items-center gap-2"
    >
      <Star className={inWatchlist ? 'fill-current text-yellow-400' : ''} />
    </Button>
  );
}
