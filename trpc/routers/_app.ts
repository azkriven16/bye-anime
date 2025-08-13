import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedures";
export const appRouter = createTRPCRouter({
  home: homeRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
