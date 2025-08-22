"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  AnimeCard,
  ErrorState,
  LoadingCard,
  StaticLoadingCard,
} from "../ui/atoz-cards";
import { usePathname } from "next/navigation";

export const AtoZView = ({ option }: { option: string }) => {
  const trpc = useTRPC();
  const [page, setPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);

  const { data, isLoading, isError, refetch } = useQuery(
    trpc.aToZ.queryOptions({
      option,
      page,
    })
  );

  if (!isMounted) {
    return (
      <section className="w-full bg-background min-h-screen px-4 md:px-12 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {Array.from({ length: 10 }, (_, i) => (
              <StaticLoadingCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) return <ErrorState refetch={refetch} />;

  const animes = data?.data.animes ?? [];
  const { currentPage, totalPages, hasNextPage } = data?.data ?? {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
  };

  return (
    <TooltipProvider>
      <section className="w-full bg-background min-h-screen px-4 md:px-12 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                A-Z List
              </h2>
              <p className="text-zinc-400 text-lg">
                Browse anime alphabetically, showing results for{" "}
                <span className="text-foreground">
                  " {pathname.match(/\/atoz\/(all|other|0-9|[a-zA-Z])/)?.[1]} "
                </span>
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {isLoading
              ? Array.from({ length: 10 }, (_, i) => <LoadingCard key={i} />)
              : animes.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-zinc-800 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm text-zinc-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage}
              className="bg-zinc-800 text-white px-4 py-2 rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};
