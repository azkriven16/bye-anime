"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BaseAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: {
    sub: number | null;
    dub: number | null;
  };
  type: string;
}

interface AnimeGridSectionProps {
  topAiringAnimes: BaseAnime[];
  mostPopularAnimes: BaseAnime[];
  mostFavoriteAnimes: BaseAnime[];
  latestCompletedAnimes: BaseAnime[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

interface AnimeCardProps {
  anime: BaseAnime;
  rank?: number;
}

const AnimeCard = ({ anime, rank }: AnimeCardProps) => {
  return (
    <Link
      href={`/info/${anime.id}`}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-all duration-200 group cursor-pointer border border-transparent hover:border-border"
    >
      <div className="relative flex-shrink-0">
        <img
          src={anime.poster || "/placeholder.svg"}
          alt={anime.name}
          className="w-16 h-24 object-cover rounded-md shadow-sm"
        />
        {rank && (
          <div className="absolute -top-1 -left-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
            {rank}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-foreground font-semibold text-sm leading-tight truncate group-hover:text-primary transition-colors mb-2">
          {anime.name}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5">
          {anime.episodes.sub && (
            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded font-medium">
              SUB {anime.episodes.sub}
            </span>
          )}

          {anime.episodes.dub && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-medium">
              DUB {anime.episodes.dub}
            </span>
          )}

          <span className="text-muted-foreground text-xs uppercase font-medium bg-secondary px-2 py-0.5 rounded">
            {anime.type}
          </span>
        </div>
      </div>
    </Link>
  );
};

interface GridSectionProps {
  title: string;
  animes: BaseAnime[];
  showRanking?: boolean;
}

const GridSection = ({
  title,
  animes,
  showRanking = false,
}: GridSectionProps) => {
  const displayAnimes = animes.slice(0, 5);

  return (
    <div>
      <h2 className="text-card-foreground font-bold text-lg mb-3 border-b border-border pb-2">
        {title}
      </h2>

      <div className="space-y-2">
        {displayAnimes.map((anime, index) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            rank={showRanking ? index + 1 : undefined}
          />
        ))}
      </div>

      <button className="cursor-pointer text-primary hover:text-primary/80 text-sm font-semibold mt-4 flex items-center gap-2 transition-all hover:gap-3 group">
        View more
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-card border border-border rounded-xl p-3 shadow-sm animate-pulse">
    <div className="h-6 bg-muted rounded-md mb-3 w-32"></div>
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-16 h-24 bg-muted rounded-md"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded-md w-3/4"></div>
            <div className="flex gap-2">
              <div className="h-3 bg-muted rounded-md w-16"></div>
              <div className="h-3 bg-muted rounded-md w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="h-4 bg-muted rounded-md mt-4 w-20"></div>
  </div>
);

export const AnimeGridSection = ({
  isError,
  isLoading,
  latestCompletedAnimes,
  mostFavoriteAnimes,
  mostPopularAnimes,
  refetch,
  topAiringAnimes,
}: AnimeGridSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isError) {
    return (
      <section className="w-full px-4 py-6">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <p className="text-destructive font-semibold mb-4 text-base sm:text-lg">
              Failed to load anime data
            </p>
            <button
              onClick={refetch}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {!isMounted || isLoading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            <>
              <GridSection
                title="Top Airing"
                animes={topAiringAnimes}
                showRanking={true}
              />
              <GridSection
                title="Most Popular"
                animes={mostPopularAnimes}
                showRanking={true}
              />
              <GridSection
                title="Most Favorite"
                animes={mostFavoriteAnimes}
                showRanking={true}
              />
              <GridSection
                title="Latest Completed"
                animes={latestCompletedAnimes}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
