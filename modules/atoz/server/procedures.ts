import { baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { HiAnimeAZListResponse } from "../types";

export const aToZRouter = baseProcedure
  .input(
    z.object({
      option: z.string(), // could also narrow with z.enum([...]) if you want
      page: z.number().optional().default(1),
    })
  )
  .query(async ({ input }): Promise<HiAnimeAZListResponse> => {
    const BASE_URL = process.env.API;

    if (!BASE_URL) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "API base URL is not configured",
      });
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v2/hianime/azlist/${input.option}?page=${input.page}`
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Failed to fetch anime data: HTTP ${response.status}`,
          cause: response.statusText,
        });
      }

      const data = (await response.json()) as HiAnimeAZListResponse;

      return data;
    } catch (error) {
      console.error("Error fetching HiAnime data:", error);

      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch anime data",
        cause: error,
      });
    }
  });
