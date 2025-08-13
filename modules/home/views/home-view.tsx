"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CarouselSection } from "../ui/carousel-section";
import { TrendingSection } from "../ui/trending-section";
import { AnimeGridSection } from "../ui/anime-grid-section";
import { LatestEpisodesSection } from "../ui/latest-episodes-section";
import { GenreSection } from "../ui/genre-section";
import { UpcomingSection } from "../ui/upcoming-section";

export function HomeView() {
  const trpc = useTRPC();
  const { data, isLoading, isError, refetch } = useQuery(
    trpc.home.queryOptions()
  );
  console.log(data?.data.top10Animes);
  return (
    <main>
      <CarouselSection
        data={data?.data.spotlightAnimes || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      <TrendingSection
        data={data?.data.trendingAnimes || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      <LatestEpisodesSection
        data={data?.data.latestEpisodeAnimes || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      <AnimeGridSection
        topAiringAnimes={data?.data.topAiringAnimes || []}
        mostPopularAnimes={data?.data.mostPopularAnimes || []}
        mostFavoriteAnimes={data?.data.mostFavoriteAnimes || []}
        latestCompletedAnimes={data?.data.latestCompletedAnimes || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      <GenreSection
        data={data?.data.genres || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      <UpcomingSection
        data={data?.data.topUpcomingAnimes || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    </main>
  );
}
