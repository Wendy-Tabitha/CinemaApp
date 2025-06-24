"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6 text-muted-foreground">{error?.message || "An unexpected error occurred."}</p>
      <button
        className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
