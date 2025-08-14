import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";
import {
  EpisodesResponse,
  EpisodesServersResponse,
  EpisodeStreamingLinksResponse,
} from "../types";

export const watchRouter = createTRPCRouter({
  episodes: baseProcedure
    .input(
      z.object({
        animeId: z.string(),
      })
    )
    .query(async ({ input }): Promise<EpisodesResponse> => {
      const BASE_URL = process.env.API;

      if (!BASE_URL) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "API base URL is not configured",
        });
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/v2/hianime/anime/${input.animeId}/episodes`
        );

        if (!response.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch anime data: HTTP ${response.status}`,
            cause: response.statusText,
          });
        }

        const data: EpisodesResponse = await response.json();

        return data;
      } catch (error) {
        console.error("Error fetching HiAnime data:", error);

        // If it's already a TRPCError, re-throw it
        if (error instanceof TRPCError) {
          throw error;
        }

        // Handle other types of errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch anime data",
          cause: error,
        });
      }
    }),
  episodesServers: baseProcedure
    .input(
      z.object({
        animeEpisodeId: z.string(),
      })
    )
    .query(async ({ input }): Promise<EpisodesServersResponse> => {
      const BASE_URL = process.env.API;

      if (!BASE_URL) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "API base URL is not configured",
        });
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/v2/hianime/episode/servers?animeEpisodeId=${input.animeEpisodeId}`
        );

        if (!response.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch anime data: HTTP ${response.status}`,
            cause: response.statusText,
          });
        }

        const data: EpisodesServersResponse = await response.json();

        return data;
      } catch (error) {
        console.error("Error fetching HiAnime data:", error);

        // If it's already a TRPCError, re-throw it
        if (error instanceof TRPCError) {
          throw error;
        }

        // Handle other types of errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch anime data",
          cause: error,
        });
      }
    }),
  episodesStreamingLinks: baseProcedure
    .input(
      z.object({
        animeEpisodeId: z.string(),
        server: z.string().default("hd-1"),
        category: z.string().default("sub"),
      })
    )
    .query(async ({ input }): Promise<EpisodeStreamingLinksResponse> => {
      const BASE_URL = process.env.API;

      if (!BASE_URL) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "API base URL is not configured",
        });
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/v2/hianime/episode/sources?animeEpisodeId=${input.animeEpisodeId}&server=${input.server}&category=${input.category}`
        );

        if (!response.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch anime data: HTTP ${response.status}`,
            cause: response.statusText,
          });
        }

        const data: EpisodeStreamingLinksResponse = await response.json();

        return data;
      } catch (error) {
        console.error("Error fetching HiAnime data:", error);

        // If it's already a TRPCError, re-throw it
        if (error instanceof TRPCError) {
          throw error;
        }

        // Handle other types of errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch anime data",
          cause: error,
        });
      }
    }),
});
