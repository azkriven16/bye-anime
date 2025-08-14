// Main API Response Type
export interface AnimeApiResponse {
  status: number;
  data: AnimeData;
}

export interface AnimeData {
  anime: AnimeInfo;
  seasons: Season[];
  mostPopularAnimes: PopularAnime[];
  relatedAnimes: RelatedAnime[];
  recommendedAnimes: RecommendedAnime[];
}

// Core Anime Information
export interface AnimeInfo {
  info: AnimeBasicInfo;
  moreInfo: AnimeMoreInfo;
}

export interface AnimeBasicInfo {
  id: string;
  anilistId: number;
  malId: number;
  name: string;
  poster: string;
  description: string;
  stats: AnimeStats;
  promotionalVideos: PromotionalVideo[];
  charactersVoiceActors: CharacterVoiceActor[];
}

export interface AnimeStats {
  rating: string;
  quality: string;
  episodes: EpisodeCount;
  type: string;
  duration: string;
}

export interface EpisodeCount {
  sub: number | null;
  dub: number | null;
}

export interface PromotionalVideo {
  title: string;
  source: string;
  thumbnail: string;
}

export interface CharacterVoiceActor {
  character: Character;
  voiceActor: VoiceActor;
}

export interface Character {
  id: string;
  poster: string;
  name: string;
  cast: string;
}

export interface VoiceActor {
  id: string;
  poster: string;
  name: string;
  cast: string;
}

export interface AnimeMoreInfo {
  japanese: string;
  synonyms: string;
  aired: string;
  premiered: string;
  duration: string;
  status: string;
  malscore: string;
  genres: string[];
  studios: string;
  producers: string[];
}

// Related Content Types
export interface Season {
  // Define season structure when available
  [key: string]: any;
}

export interface PopularAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: EpisodeCount;
  type: string;
}

export interface RelatedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  episodes: EpisodeCount;
  type: string;
}

export interface RecommendedAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string | null;
  episodes: EpisodeCount;
}

// Utility Types
export type AnimeType = "TV" | "Movie" | "OVA" | "ONA" | "Special";
export type AnimeRating = "PG-13" | "18+" | string;
export type AnimeQuality = "HD" | "SD" | string;
export type AnimeStatus =
  | "Currently Airing"
  | "Completed"
  | "Upcoming"
  | string;
export type CastRole = "Main" | "Supporting" | string;
export type VoiceActorLanguage = "Japanese" | "English" | string;
