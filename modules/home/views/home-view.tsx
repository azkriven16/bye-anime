"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CarouselSection } from "../ui/carousel-section";
import { TrendingSection } from "../ui/trending-section";

export function HomeView() {
  const trpc = useTRPC();
  const { data, isLoading, isError, refetch } = useQuery(
    trpc.home.queryOptions()
  );
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
    </main>
  );
}
