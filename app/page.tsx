import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { HomeView } from "@/modules/home/views/home-view";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.home.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
