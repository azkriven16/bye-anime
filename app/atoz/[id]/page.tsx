import { AtoZView } from "@/modules/atoz/views/atoz-view";
import { AnimeInfoSectionError } from "@/modules/info/ui/anime-info-section-error";
import { AnimeInfoSectionLoader } from "@/modules/info/ui/anime-info-section-loader";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function AtoZResults({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <AnimeInfoSectionError />;
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.aToZ.queryOptions({ option: id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AnimeInfoSectionError />}>
        <Suspense fallback={<AnimeInfoSectionLoader />}>
          <AtoZView option={id} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
