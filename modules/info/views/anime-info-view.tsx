"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { AnimeInfoSection } from "../ui/anime-info-section";
import { AnimeRecommendedSection } from "../ui/anime-recommended-section";

export const AnimeInfoView = ({ animeId }: { animeId: string }) => {
  const trpc = useTRPC();
  const { data, isLoading, isError, refetch } = useQuery(
    trpc.info.queryOptions({
      animeId,
    })
  );
  return (
    <main>
      <AnimeInfoSection
        data={data?.data.anime}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      <AnimeRecommendedSection
        data={data?.data.recommendedAnimes || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    </main>
  );
};
