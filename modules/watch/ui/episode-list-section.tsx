"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Play, Search } from "lucide-react";
import { Episode, EpisodesResponse } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  data: EpisodesResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  setEpId: Dispatch<SetStateAction<string>>;
}

export const EpisodeListSection = ({
  data,
  isLoading,
  isError,
  setEpId,
  refetch,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 md:px-8 py-8 md:py-12">
        <div className="h-10 bg-muted animate-pulse rounded-md" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-4 text-center px-4 md:px-8 py-8 md:py-12">
        <p className="text-muted-foreground">Failed to load episodes</p>
        <Button
          variant="outline"
          className="mt-4 bg-transparent"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  const filteredEpisodes = data.data.episodes.filter(
    (episode) =>
      episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.number.toString().includes(searchTerm)
  );

  const handlePlayEpisode = (episodeId: string) => {
    // Handle episode play logic here
    console.log("Playing episode:", episodeId);
    setEpId(episodeId);

    // Open in a new tab (example link with episodeId)
    const url = `https://hianime.to/watch/${episodeId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 space-y-4">
      <div className="text-sm text-muted-foreground text-center">
        Showing {filteredEpisodes.length} of {data.data.totalEpisodes} episodes
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          List of episodes:
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Number of Ep"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-48 bg-muted border-border"
          />
        </div>
      </div>

      {/* Episodes List */}
      <ScrollArea className="h-[200px] md:h-[400px] w-full rounded-md border p-2">
        <div className="space-y-2">
          {filteredEpisodes.map((episode) => (
            <Card
              key={episode.episodeId}
              onClick={() => handlePlayEpisode(episode.episodeId)}
              className="p-4 bg-card border-border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="text-base md:text-lg font-semibold text-primary bg-primary/10 px-3 py-1 rounded-md">
                      {episode.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground line-clamp-1">
                      {episode.title}
                    </h3>
                    {episode.isFiller && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded mt-1 inline-block">
                        Filler
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      {filteredEpisodes.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No episodes found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};
