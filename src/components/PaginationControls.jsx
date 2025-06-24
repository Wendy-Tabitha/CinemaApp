"use client";

import Link from 'next/link';

export function PaginationControls({ totalPages, currentPage = 1, basePath = '/' }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex justify-center gap-4 mt-8">
      {prevPage && (
        <Link href={`${basePath}?page=${prevPage}`} className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark">
          Previous
        </Link>
      )}
      <span className="px-4 py-2 bg-muted rounded">
        Page {currentPage} of {totalPages}
      </span>
      {nextPage && (
        <Link href={`${basePath}?page=${nextPage}`} className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark">
          Next
        </Link>
      )}
    </div>
  );
}
