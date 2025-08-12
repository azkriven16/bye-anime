export interface SpotlightAnimeType {
  description: string;
  episodes: {
    dub: number;
    sub: number;
  };
  id: string;
  jname: string;
  name: string;
  otherInfo: string[];
  poster: string;
  rank: number;
  type: string;
}
