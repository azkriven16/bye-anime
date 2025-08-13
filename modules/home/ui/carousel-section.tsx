import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { SpotlightAnime } from "../types";

interface CarouselSectionProps {
  data: SpotlightAnime[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const CarouselSection = ({
  data = [],
  isLoading,
  isError,
  refetch,
}: CarouselSectionProps) => {
  // State to handle client-side rendering hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return <CarouselSkeleton />;
  }

  if (isError) {
    return <CarouselError onRetry={refetch} />;
  }

  if (!data || data.length === 0) {
    return <CarouselEmpty />;
  }

  return (
    <section className="max-w-[100vw] mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          containScroll: "trimSnaps",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((anime, index) => (
            <AnimeCarouselCard
              data={data}
              index={index}
              anime={anime}
              key={anime.id}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex absolute border-none md:size-12 md:bg-black [&_svg:not([class*='size-'])]:size-8 text-white cursor-pointer bottom-30 md:top-1/2 left-auto right-24 -translate-y-1/2" />
        <CarouselNext className="hidden sm:flex absolute border-none md:size-12 md:bg-black [&_svg:not([class*='size-'])]:size-8 text-white cursor-pointer bottom-30 md:top-1/2 right-5 -translate-y-1/2" />
      </Carousel>
    </section>
  );
};

interface AnimeCarouselCardProps {
  anime: SpotlightAnime;
  index: number;
  data: SpotlightAnime[];
}

function AnimeCarouselCard({ anime, index, data }: AnimeCarouselCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <CarouselItem className="relative h-[90vh] sm:h-[100vh]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {!imageLoaded && !imageError && (
          <Skeleton className="w-full h-full bg-background" />
        )}
        <div className="relative w-full h-[80vh] sm:h-full">
          {/* Background blurred image */}
          <img
            src={
              imageError
                ? "/placeholder.svg?height=1080&width=1920&query=anime poster"
                : anime.poster
            }
            alt={anime.name}
            className={`absolute inset-0 w-full h-full object-cover blur-sm transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />

          {/* Foreground sharp image - top center on small screens, center right on large screens */}
          <div className="absolute inset-0 flex items-start justify-center pt-8 md:items-center md:justify-end lg:pr-16 lg:pt-0">
            <img
              src={
                imageError
                  ? "/placeholder.svg?height=1080&width=1920&query=anime poster"
                  : anime.poster
              }
              alt={anime.name}
              className={`w-4/5 h-4/5 sm:w-3/5 sm:h-3/5 object-cover rounded-lg shadow-lg transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          </div>
        </div>
        {/* Gradient overlays */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-end sm:items-center px-4 sm:px-8 lg:px-16 pb-20 sm:pb-0">
        <div className="max-w-full sm:max-w-2xl text-white w-full">
          {/* Rank Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
            <div className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mr-0 sm:mr-4 w-fit shadow-lg">
              #{anime.rank}
            </div>
            <div className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300">
              <span className="bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded text-xs border border-gray-600">
                {anime.type}
              </span>
              {anime.otherInfo.slice(0, 2).map((info, i) => (
                <span
                  key={i}
                  className="bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded text-xs border border-gray-600"
                >
                  {info}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight drop-shadow-lg">
            {anime.name}
          </h1>

          {/* Japanese Title */}
          {anime.jname !== anime.name && (
            <h2 className="text-sm sm:text-base lg:text-2xl text-gray-300 mb-2 sm:mb-4 font-light drop-shadow-sm">
              {anime.jname}
            </h2>
          )}

          {/* Episode Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-lg">
            {anime.episodes.sub && (
              <span className="flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 shadow-sm"></span>
                <span className="text-xs sm:text-base">
                  {anime.episodes.sub} Episodes (Sub)
                </span>
              </span>
            )}
            {anime.episodes.dub && (
              <span className="flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 shadow-sm"></span>
                <span className="text-xs sm:text-base">
                  {anime.episodes.dub} Episodes (Dub)
                </span>
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="bg-white text-black px-4 sm:px-8 py-2 sm:py-3 rounded-md sm:rounded-lg font-bold text-sm sm:text-lg hover:bg-gray-200 transition-all flex items-center flex-1 sm:flex-none justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play
            </button>
            <button className="bg-gray-600/70 backdrop-blur-sm text-white px-3 sm:px-8 py-2 sm:py-3 rounded-md sm:rounded-lg font-bold text-sm sm:text-lg hover:bg-gray-600/90 transition-all flex items-center border border-gray-500 shadow-lg hover:shadow-xl transform hover:scale-105">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2"
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
              <span className="hidden sm:inline">My List</span>
              <span className="sm:hidden">List</span>
            </button>
            <button className="bg-gray-600/70 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-gray-600/90 transition-all border border-gray-500 shadow-lg hover:shadow-xl transform hover:scale-105">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Maturity Rating */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
        <div className="bg-background/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs sm:text-sm font-bold border border-gray-600 shadow-lg">
          HD
        </div>
      </div>
    </CarouselItem>
  );
}

const CarouselSkeleton = () => {
  return (
    <section className="max-w-[100vw] mx-auto">
      <div className="relative h-[90vh] sm:h-[100vh] bg-background">
        {/* Background skeleton */}
        <Skeleton className="absolute inset-0 bg-background" />

        {/* Content skeleton */}
        <div className="relative z-10 h-full flex items-end sm:items-center px-4 sm:px-8 lg:px-16 pb-20 sm:pb-0">
          <div className="max-w-full sm:max-w-2xl w-full space-y-4">
            {/* Rank and tags skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Skeleton className="h-6 w-12 rounded-full bg-secondary" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded bg-secondary" />
                <Skeleton className="h-6 w-20 rounded bg-secondary" />
                <Skeleton className="h-6 w-14 rounded bg-secondary" />
              </div>
            </div>

            {/* Title skeleton */}
            <Skeleton className="h-12 sm:h-16 w-3/4 bg-secondary" />

            {/* Japanese title skeleton */}
            <Skeleton className="h-6 sm:h-8 w-1/2 bg-secondary" />

            {/* Episode info skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-5 w-32 bg-secondary" />
              <Skeleton className="h-5 w-32 bg-secondary" />
            </div>

            {/* Description skeleton - hidden on mobile */}
            <div className="hidden sm:block space-y-2">
              <Skeleton className="h-4 w-full bg-secondary" />
              <Skeleton className="h-4 w-4/5 bg-secondary" />
              <Skeleton className="h-4 w-3/5 bg-secondary" />
            </div>

            {/* Buttons skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-10 sm:h-12 w-24 sm:w-32 bg-secondary" />
              <Skeleton className="h-10 sm:h-12 w-20 sm:w-28 bg-secondary" />
              <Skeleton className="h-10 sm:h-12 w-10 sm:w-12 rounded-full bg-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CarouselError = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <section className="max-w-[100vw] mx-auto h-[90vh] sm:h-[100vh] flex items-center justify-center bg-background">
      <div className="text-center space-y-4 px-4">
        <div className="text-red-400 text-6xl mb-4">(╥﹏╥)</div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold">
          Failed to load content
        </h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          We're having trouble loading the anime carousel. Please check your
          connection and try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </section>
  );
};

const CarouselEmpty = () => {
  return (
    <section className="max-w-[100vw] mx-auto h-[90vh] sm:h-[100vh] flex items-center justify-center bg-background">
      <div className="text-center space-y-4 px-4">
        <div className="text-gray-400 text-6xl mb-4">(╥_╥)</div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold">
          No content available
        </h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          There are no anime to display at the moment. Check back later for new
          content!
        </p>
      </div>
    </section>
  );
};
