import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangle,
  Calendar,
  Info,
  Play,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RecommendedAnime } from "../types";
import Link from "next/link";

interface UpcomingSectionProps {
  data: RecommendedAnime[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const AnimeRecommendedSection = ({
  data,
  isError,
  isLoading,
  refetch,
}: UpcomingSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="w-full bg-background min-h-screen">
        <div className="px-4 md:px-8 py-8 md:py-12">
          <div className="mx-auto">
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Upcoming Anime
                  </h2>
                  <p className="text-zinc-400 text-lg">New anime coming soon</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 items-stretch">
              {Array.from({ length: 10 }, (_, i) => (
                <StaticLoadingCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <TooltipProvider>
      <section className="w-full bg-background min-h-screen">
        <div className="px-4 md:px-8 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header - Netflix style */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Recommended for you
                  </h2>
                  <p className="text-zinc-400 text-lg">
                    More anime based on the current anime
                  </p>
                </div>
                {!isError && !isLoading && data.length > 0 && (
                  <button className="text-zinc-300 hover:text-white text-sm font-medium transition-colors hidden md:block">
                    See all →
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            {isError ? (
              <ErrorState refetch={refetch} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 items-stretch">
                {isLoading
                  ? Array.from({ length: 10 }, (_, i) => (
                      <LoadingCard key={i} />
                    ))
                  : data
                      .slice(0, 10)
                      .map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                      ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

// Static loading card for SSR (no animations or interactive elements)
const StaticLoadingCard = () => (
  <div className="bg-zinc-900/50 rounded-lg overflow-hidden relative">
    <div className="aspect-[3/4] bg-zinc-800"></div>
    <div className="p-3 space-y-2">
      <div className="h-4 bg-zinc-700 rounded"></div>
      <div className="h-3 bg-zinc-800 rounded w-2/3"></div>
    </div>
  </div>
);

const LoadingCard = () => (
  <div className="bg-zinc-900/50 rounded-lg overflow-hidden relative">
    <div className="aspect-[3/4] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
    </div>
    <div className="p-3 space-y-2">
      <div className="h-4 bg-zinc-700 rounded animate-pulse"></div>
      <div className="h-3 bg-zinc-800 rounded w-2/3 animate-pulse"></div>
    </div>
  </div>
);

const ErrorState = ({ refetch }: { refetch: () => void }) => (
  <div className="text-center py-20 px-4">
    <div className="max-w-md mx-auto">
      <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6 opacity-80" />
      <h3 className="text-2xl font-bold text-white mb-3">
        Something went wrong
      </h3>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        We're having trouble loading the upcoming anime. Please try again.
      </p>
      <button
        onClick={refetch}
        className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-zinc-200 transition-all duration-200 flex items-center gap-3 mx-auto group"
      >
        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        Try Again
      </button>
    </div>
  </div>
);

const AnimeCard = ({ anime }: { anime: RecommendedAnime }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getRatingColor = (rating: string | null) => {
    if (rating === "18+") return "bg-red-600";
    if (rating) return "bg-orange-500";
    return "bg-green-600";
  };

  const getTypeColor = (type: string) => {
    const cleanType = type.split(" ")[0]; // Extract just "TV", "ONA", "Movie" from "TV (12 eps)"
    switch (cleanType) {
      case "TV":
        return "bg-blue-600";
      case "ONA":
        return "bg-purple-600";
      case "Movie":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const parseTypeAndEpisodes = (typeString: string) => {
    const match = typeString.match(/^(\w+)\s*\(([^)]+)\)$/);
    if (match) {
      return {
        type: match[1],
        episodes: match[2],
      };
    }
    return {
      type: typeString,
      episodes: null,
    };
  };

  const formatReleaseDate = (duration: string) => {
    if (duration === "?" || !duration) return "TBA";
    return duration;
  };

  // Safe fallbacks for data
  const safeName = anime.name || "Unknown Title";
  const safeJName = anime.jname || "";
  const safePoster = anime.poster || "/placeholder.svg";
  const safeReleaseDate = formatReleaseDate(anime.duration);
  const { type: safeType, episodes: episodeCount } = parseTypeAndEpisodes(
    anime.type || "Unknown"
  );

  return (
    <Link
      href={`/info/${anime.id}`}
      className="group cursor-pointer relative h-full"
    >
      <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-black/50 transform-gpu group-hover:scale-105 origin-center h-full flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
          {/* Image with proper error handling */}
          <div className="w-full h-full bg-zinc-800">
            <img
              src={imageError ? "/placeholder.svg" : safePoster}
              alt={safeName}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />

            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-zinc-700 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Netflix-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

          {/* Hover controls - Netflix style */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors group/play">
                <Play className="w-5 h-5 text-black ml-0.5 group-hover/play:scale-110 transition-transform" />
              </button>

              <button className="w-10 h-10 bg-zinc-800/80 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors border-2 border-zinc-600">
                <Info className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Top badges - refined positioning */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span
              className={`px-2 py-0.5 text-xs font-bold text-white rounded-sm backdrop-blur-sm ${getTypeColor(
                safeType
              )}`}
            >
              {safeType}
            </span>
            {anime.rating && (
              <span
                className={`px-2 py-0.5 text-xs font-bold text-white rounded-sm backdrop-blur-sm ${getRatingColor(
                  anime.rating
                )}`}
              >
                {anime.rating}
              </span>
            )}
          </div>

          {/* Release date badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 text-xs rounded-sm flex items-center gap-1 font-medium">
              <Calendar className="w-3 h-3" />
              {safeReleaseDate}
            </span>
          </div>

          {/* Coming Soon overlay for future releases */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-green-600/90 backdrop-blur-sm text-white px-2 py-1 text-xs rounded-sm rounded-r-none font-semibold">
              {anime.episodes.sub} SUB
            </span>
            <span className="bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 text-xs rounded-sm rounded-l-none font-semibold">
              {anime.episodes.dub || 0} DUB
            </span>
          </div>
        </div>

        <div className="p-3 group-hover:p-4 transition-all duration-300 flex-grow flex flex-col">
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="font-bold text-white text-sm mb-1 line-clamp-2 group-hover:text-base transition-all duration-300 cursor-pointer flex-shrink-0">
                {safeName}
              </h3>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-sm">{safeName}</p>
            </TooltipContent>
          </Tooltip>

          {/* Episode count info */}
          {episodeCount && (
            <div className="flex items-center gap-3 text-xs mb-2 flex-shrink-0">
              <span className="text-zinc-400 flex items-center gap-1 font-medium">
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
                {episodeCount}
              </span>
            </div>
          )}

          <div className="flex-grow"></div>

          {safeJName && safeJName !== safeName && (
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-zinc-400 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 line-clamp-1 cursor-pointer flex-shrink-0">
                  {safeJName}
                </p>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p className="text-sm">{safeJName}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </Link>
  );
};
