"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Source } from "react-all-player/dist/types";
import { EpisodeListSection } from "../ui/episode-list-section";

export const AnimeWatchView = ({ animeId }: { animeId: string }) => {
  const [epId, setEpId] = useState("");
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

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <EpisodeListSection
        data={episodes}
        isError={episodesIsError}
        isLoading={episodesLoading}
        refetch={episodesRefetch}
        setEpId={setEpId}
      />
      <div className="col-span-2 px-4 md:px-8 py-8 md:py-12 space-y-4">
        {!epId ? (
          <div className="aspect-video bg-secondary relative">
            <div className="absolute inset-0 flex items-center justify-center">
              Please select an episode
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-secondary relative">
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <p>
                This site only scrapes episode data, so we can’t play the actual
                episodes here. <br />
                Instead, you’ll be redirected to the original source:
                <br />
                👉{" "}
                <a
                  href={`https://hianime.to/watch/${epId}`}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://hianime.to/watch/{epId}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
