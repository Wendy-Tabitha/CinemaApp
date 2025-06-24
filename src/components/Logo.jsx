import Link from "next/link";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold font-headline text-primary transition-opacity hover:opacity-80", className)}>
      <Film className="h-7 w-7 text-accent" />
      Cinema
    </Link>
  );
}
