import { AnimeInfoSectionError } from "@/modules/info/ui/anime-info-section-error";
import { AnimeInfoSectionLoader } from "@/modules/info/ui/anime-info-section-loader";
import { AnimeInfoView } from "@/modules/info/views/anime-info-view";
import { AnimeWatchView } from "@/modules/watch/views/anime-watch-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function AnimeInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.watch.episodes.queryOptions({
      animeId: id,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AnimeInfoSectionError />}>
        <Suspense fallback={<AnimeInfoSectionLoader />}>
          <AnimeWatchView animeId={id} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
