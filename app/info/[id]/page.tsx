import { AnimeInfoSectionError } from "@/modules/info/ui/anime-info-section-error";
import { AnimeInfoSectionLoader } from "@/modules/info/ui/anime-info-section-loader";
import { AnimeInfoView } from "@/modules/info/views/anime-info-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function AnimeInfo({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  if (!id) {
    return <AnimeInfoSectionError />;
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.info.queryOptions({ animeId: id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AnimeInfoSectionError />}>
        <Suspense fallback={<AnimeInfoSectionLoader />}>
          <AnimeInfoView animeId={id} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
