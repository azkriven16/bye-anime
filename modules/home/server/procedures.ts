import { baseProcedure } from "@/trpc/init";
import { HiAnimeHomeResponse } from "../types";
import { TRPCError } from "@trpc/server";

export const homeRouter = baseProcedure.query(
  async (): Promise<HiAnimeHomeResponse> => {
    const BASE_URL = process.env.API;

    if (!BASE_URL) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "API base URL is not configured",
      });
    }

    try {
      const response = await fetch(`${BASE_URL}/api/v2/hianime/home`);

      if (!response.ok) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Failed to fetch anime data: HTTP ${response.status}`,
          cause: response.statusText,
        });
      }

      const data: HiAnimeHomeResponse = await response.json();

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
  }
);
