import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangleIcon,
  InfoIcon,
  PlayIcon,
  RefreshCwIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const StaticLoadingCard = () => (
  <div className="bg-zinc-900/50 rounded-lg overflow-hidden relative">
    <div className="aspect-[3/4] bg-zinc-800"></div>
    <div className="p-3 space-y-2">
      <div className="h-4 bg-zinc-700 rounded"></div>
      <div className="h-3 bg-zinc-800 rounded w-2/3"></div>
    </div>
  </div>
);

export const LoadingCard = () => (
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

export const ErrorState = ({ refetch }: { refetch: () => void }) => (
  <div className="text-center py-20 px-4">
    <div className="max-w-md mx-auto">
      <AlertTriangleIcon className="w-20 h-20 text-red-500 mx-auto mb-6 opacity-80" />
      <h3 className="text-2xl font-bold text-white mb-3">
        Something went wrong
      </h3>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        We're having trouble loading the list. Please try again.
      </p>
      <button
        onClick={refetch}
        className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-zinc-200 transition-all duration-200 flex items-center gap-3 mx-auto group"
      >
        <RefreshCwIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        Try Again
      </button>
    </div>
  </div>
);

export const AnimeCard = ({ anime }: { anime: any }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const safeName = anime.name || "Unknown Title";
  const safePoster = anime.poster || "/placeholder.svg";
  const safeEpisodes = anime.episodes || {};

  return (
    <Link href={`/info/${anime.id}`} className="group relative h-full">
      <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-black/50 transform-gpu group-hover:scale-105 origin-center h-full flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
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
            {!imageLoaded && (
              <div className="absolute inset-0 bg-zinc-700 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

          {/* Hover controls */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors group/play">
                <PlayIcon className="w-5 h-5 text-black ml-0.5 group-hover/play:scale-110 transition-transform" />
              </button>
              <button className="w-10 h-10 bg-zinc-800/80 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors border-2 border-zinc-600">
                <InfoIcon className="w-4 h-4 text-white" />
              </button>
            </div>
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

          <div className="flex items-center gap-3 text-xs mb-2 flex-shrink-0">
            {safeEpisodes.sub && (
              <span className="text-green-400 flex items-center gap-1 font-medium">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                SUB {safeEpisodes.sub}
              </span>
            )}
            {safeEpisodes.dub && (
              <span className="text-blue-400 flex items-center gap-1 font-medium">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                DUB {safeEpisodes.dub}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
