"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show only first 6 items on mobile, 12 on tablet+
  const getVisibleItems = () => {
    if (!isExpanded) {
      return window.innerWidth < 640 ? 6 : 12;
    }
    return data.length;
  };

  const visibleGenres = data.slice(
    0,
    isExpanded
      ? data.length
      : typeof window !== "undefined" && window.innerWidth < 640
      ? 6
      : 12
  );
  const hasMore =
    data.length >
    (typeof window !== "undefined" && window.innerWidth < 640 ? 6 : 12);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <section className="px-4 md:px-12 lg:px-16 py-4 md:py-8">
        <div className="mb-3 md:mb-6">
          <div className="h-6 md:h-8 bg-muted rounded w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-muted rounded w-64 animate-pulse" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 md:h-10 bg-muted rounded animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="px-4 md:px-12 lg:px-16 py-4 md:py-8">
        <div className="mb-3 md:mb-6">
          <div className="h-6 md:h-8 bg-muted rounded w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-muted rounded w-64 animate-pulse" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 md:h-10 bg-muted rounded animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 md:px-12 lg:px-16 py-4 md:py-8">
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
      <section className="px-4 md:px-12 lg:px-16 py-4 md:py-8">
        <div className="text-center">
          <p className="text-muted-foreground">No genres available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-12 lg:px-16 py-4 md:py-8">
      <div className="mb-3 md:mb-6">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground mb-1">
          Browse by Genre
        </h2>
        <p className="text-sm text-muted-foreground">
          Discover anime by your favorite genres
        </p>
      </div>

      <div className="overflow-hidden">
        <div
          className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-none" : "max-h-32 md:max-h-40"
          }`}
        >
          {data.map((genre, index) => {
            const genreSlug = genre.toLowerCase().replace(/\s+/g, "-");
            const isVisible =
              index <
              (isExpanded
                ? data.length
                : typeof window !== "undefined" && window.innerWidth < 640
                ? 6
                : 12);

            return (
              <div
                key={genre}
                className={`transition-all duration-500 ease-in-out transform ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95"
                } ${
                  !isExpanded &&
                  index >=
                    (typeof window !== "undefined" && window.innerWidth < 640
                      ? 6
                      : 12)
                    ? "hidden"
                    : ""
                }`}
                style={{
                  transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
                }}
              >
                <Link
                  href={`/genre/${genreSlug}`}
                  className="group relative overflow-hidden rounded bg-card border border-border px-2 py-2 md:px-3 md:py-2 text-center transition-all duration-200 hover:scale-105 hover:shadow-md hover:border-primary/50 block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <span className="text-xs md:text-sm font-medium text-card-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                      {genre}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200 hover:scale-105 group"
            >
              <span>{isExpanded ? "Show Less" : "See More"}</span>
              <div
                className={`transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
