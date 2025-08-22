// src/types/hianime.ts

export type SortOption =
  | "all"
  | "other"
  | "0-9"
  | (Lowercase<string> & { length: 1 }); // supports "a"–"z"

export interface HiAnimeAZAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  duration: string;
  type: string;
  rating: string;
  episodes: {
    sub: number;
    dub: number;
  };
}

export interface HiAnimeAZListResponse {
  success: boolean;
  data: {
    sortOption: SortOption;
    animes: HiAnimeAZAnime[];
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
  };
}
