export interface EpisodeStreamingLinksResponse {
  status: number;
  data: EpisodeStreamingLinksData;
}

export interface EpisodeStreamingLinksData {
  headers: EpisodeHeaders;
  tracks: EpisodeTrack[];
  intro: EpisodeSegment;
  outro: EpisodeSegment;
  sources: EpisodeSource[];
  anilistID: number;
  malID: number;
}

export interface EpisodeHeaders {
  Referer: string;
}

export interface EpisodeTrack {
  url: string;
  lang: string;
}

export interface EpisodeSegment {
  start: number;
  end: number;
}

export interface EpisodeSource {
  url: string;
  type: "hls" | string;
}

export interface EpisodeServer {
  serverName: string;
  serverId: number;
}

export interface EpisodesServersResponse {
  status: number;
  data: {
    sub: EpisodeServer[];
    dub: EpisodeServer[];
    raw: EpisodeServer[];
    episodeId: string;
    episodeNo: number;
  };
}

export interface Episode {
  title: string;
  episodeId: string;
  number: number;
  isFiller: boolean;
}

export interface EpisodesResponse {
  status: number;
  data: {
    totalEpisodes: number;
    episodes: Episode[];
  };
}
