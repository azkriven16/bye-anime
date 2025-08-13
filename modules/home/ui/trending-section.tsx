import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { TrendingAnime } from "../types";

interface TrendingSectionProps {
  data: TrendingAnime[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const TrendingSection = ({
  data = [],
  isLoading,
  isError,
  refetch,
}: TrendingSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return <TrendingSkeleton />;
  }

  if (isError) {
    return <TrendingError onRetry={refetch} />;
  }

  if (!data || data.length === 0) {
    return <TrendingEmpty />;
  }

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 pb-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Trending
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          containScroll: "trimSnaps",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.map((anime) => (
            <CarouselItem
              key={anime.id}
              className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <TrendingAnimeCard anime={anime} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-auto right-10 -top-10 md:bg-black [&_svg:not([class*='size-'])]:size-6 cursor-pointer" />
        <CarouselNext className="-right-4 -top-10 md:bg-black [&_svg:not([class*='size-'])]:size-6 cursor-pointer" />
      </Carousel>
    </section>
  );
};

interface TrendingAnimeCardProps {
  anime: TrendingAnime;
}

function TrendingAnimeCard({ anime }: TrendingAnimeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative cursor-pointer transition-all duration-300 hover:scale-105">
      {/* Main Card Container */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
        {/* Image */}
        {!imageLoaded && !imageError && (
          <Skeleton className="absolute inset-0 bg-gray-700" />
        )}

        <img
          src={
            imageError
              ? "/placeholder.svg?height=400&width=300&query=anime poster"
              : anime.poster
          }
          alt={anime.name}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rank Badge */}
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-red-600 text-white px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-bold shadow-lg">
            #{String(anime.rank).padStart(2, "0")}
          </div>
        </div>

        {/* Large Rank Number */}
        <div className="group-hover:hidden hidden sm:block absolute bottom-0 left-0 right-0 z-10">
          <div className="text-white text-right p-3">
            <span
              className="text-3xl md:text-4xl font-black opacity-80 leading-none drop-shadow-2xl"
              style={{
                fontFamily: "Impact, Arial Black, sans-serif",
                WebkitTextStroke: "2px rgba(0,0,0,0.3)",
              }}
            >
              {String(anime.rank).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="text-white">
            <h3 className="font-bold text-sm md:text-base mb-1 line-clamp-2 drop-shadow-md">
              {anime.name}
            </h3>
            {anime.jname !== anime.name && (
              <p className="text-xs md:text-sm mb-2 line-clamp-1 drop-shadow-md">
                {anime.jname}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              <button className="bg-white text-black px-3 py-1 rounded text-xs font-bold hover:bg-gray-200 transition-colors flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Play
              </button>
              <button className="bg-gray-600/80 text-white p-1 rounded hover:bg-gray-600 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TrendingSkeleton = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="mb-6">
        <Skeleton className="h-8 w-32 bg-gray-700 mb-2" />
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex-shrink-0 w-40 md:w-48">
            <Skeleton className="aspect-[3/4] rounded-lg bg-gray-700 mb-2" />
          </div>
        ))}
      </div>
    </section>
  );
};

const TrendingError = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Trending
        </h2>
      </div>

      <div className="text-center py-12 bg-gray-800/30 rounded-lg">
        <div className="text-red-400 text-4xl mb-4">(╥﹏╥)</div>
        <h3 className="text-white text-xl font-bold mb-2">
          Failed to load trending anime
        </h3>
        <p className="text-gray-400 mb-4">
          We're having trouble loading the trending content.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </section>
  );
};

const TrendingEmpty = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Trending
        </h2>
      </div>

      <div className="text-center py-12 bg-gray-800/30 rounded-lg">
        <div className="text-gray-400 text-4xl mb-4">(╥_╥)</div>
        <h3 className="text-white text-xl font-bold mb-2">
          No trending anime available
        </h3>
        <p className="text-gray-400">Check back later for trending content!</p>
      </div>
    </section>
  );
};
