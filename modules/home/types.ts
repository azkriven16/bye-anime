// Base anime interface with common properties
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

// Extended anime interface for spotlight animes
interface SpotlightAnime extends BaseAnime {
  rank: number;
  description: string;
  otherInfo: string[];
}

// Interface for trending animes (minimal info)
interface TrendingAnime {
  rank: number;
  id: string;
  name: string;
  jname: string;
  poster: string;
}

// Interface for latest episode animes
interface LatestEpisodeAnime extends BaseAnime {
  duration: string;
  rating: string | null;
}

// Interface for upcoming animes
interface UpcomingAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string; // Release date for upcoming animes
  type: string;
  rating: string | null;
  episodes: {
    sub: number | null;
    dub: number | null;
  };
}

// Interface for top 10 animes
interface Top10Anime extends BaseAnime {
  rank: number;
}

// Interface for top 10 animes structure
interface Top10Animes {
  today: Top10Anime[];
  week: Top10Anime[];
  month: Top10Anime[];
}

// Main API response interface
interface HiAnimeHomeResponse {
  status: number;
  data: {
    spotlightAnimes: SpotlightAnime[];
    trendingAnimes: TrendingAnime[];
    latestEpisodeAnimes: LatestEpisodeAnime[];
    topUpcomingAnimes: UpcomingAnime[];
    top10Animes: Top10Animes;
    topAiringAnimes: BaseAnime[];
    mostPopularAnimes: BaseAnime[];
    mostFavoriteAnimes: BaseAnime[];
    latestCompletedAnimes: BaseAnime[];
    genres: string[];
  };
}

// Export the main type for use in your tRPC procedure
export type { HiAnimeHomeResponse };

// You can also export individual interfaces if needed
export type {
  BaseAnime,
  SpotlightAnime,
  TrendingAnime,
  LatestEpisodeAnime,
  UpcomingAnime,
  Top10Anime,
  Top10Animes,
};
