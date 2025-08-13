"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface GenreSectionProps {
  data: string[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const GenreSection = ({
  data = [],
  isLoading,
  isError,
  refetch,
}: GenreSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <section className="px-4 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="px-4 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 md:px-12 lg:px-16 py-12">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load genres</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="px-4 md:px-12 lg:px-16 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">No genres available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-12 lg:px-16 py-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Browse by Genre
        </h2>
        <p className="text-muted-foreground">
          Discover anime by your favorite genres
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {data.map((genre) => {
          const genreSlug = genre.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={genre}
              href={`/genre/${genreSlug}`}
              className="group relative overflow-hidden rounded-lg bg-card border border-border p-4 text-center transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl hover:shadow-primary/25 hover:border-primary/50 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/10 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />

              <div className="absolute inset-0 rounded-lg bg-primary/20 scale-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-0" />

              {/* Content */}
              <div className="relative z-10">
                <span className="text-sm md:text-base font-medium text-card-foreground group-hover:text-primary transition-all duration-300 group-hover:font-semibold group-hover:tracking-wide">
                  {genre}
                </span>
              </div>

              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]" />

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12" />
              <div className="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-700 delay-200 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
