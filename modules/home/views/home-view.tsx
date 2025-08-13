"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CarouselSection } from "../ui/carousel-section";

export function HomeView() {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(trpc.home.queryOptions());
  console.log(data);
  return (
    <div>
      <CarouselSection
        data={data?.data.spotlightAnimes || []}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
