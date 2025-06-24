import Link from 'next/link';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="flex items-center gap-6 w-full md:w-auto justify-start">
          <Logo />
        </div>
        <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-4">
          <SearchBar />
          <Button asChild variant="default">
            <Link href="/watchlist">Watchlist</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
