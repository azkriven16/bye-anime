"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import ReactAllPlayer from "react-all-player";
import { Source } from "react-all-player/dist/types";
import { EpisodeListSection } from "../ui/episode-list-section";
import { useState } from "react";

export const AnimeWatchView = ({ animeId }: { animeId: string }) => {
  const trpc = useTRPC();
  const {
    data: episodes,
    isLoading: episodesLoading,
    isError: episodesIsError,
    refetch: episodesRefetch,
  } = useQuery(
    trpc.watch.episodes.queryOptions({
      animeId: animeId,
    })
  );

  const [episodeId, setEpisodeId] = useState<string>(
    episodes?.data.episodes[0]?.episodeId ?? ""
  );

  const {
    data: streamingLinks,
    isLoading: streamingLinksLoading,
    isError: streamingLinksIsError,
    refetch: streamingLinksRefetch,
  } = useQuery(
    trpc.watch.episodesStreamingLinks.queryOptions({
      animeEpisodeId: episodeId,
    })
  );

  const sources: Source[] =
    streamingLinks?.data.sources.map((source) => ({
      file: source.url,
      label: source.type.toUpperCase(),
      type: source.type,
    })) || [];

  return (
    <main className="grid grid-cols-3 gap-4">
      <EpisodeListSection
        data={episodes}
        isError={episodesIsError}
        isLoading={episodesLoading}
        refetch={episodesRefetch}
      />
      {JSON.stringify(sources)}
      {/* <ReactAllPlayer sources={sources} /> */}
    </main>
  );
};
