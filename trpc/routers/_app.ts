import { aToZRouter } from "@/modules/atoz/server/procedures";
import { createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedures";
import { infoRouter } from "@/modules/info/server/procedures";
import { watchRouter } from "@/modules/watch/server/procedures";

export const appRouter = createTRPCRouter({
  home: homeRouter,
  info: infoRouter,
  watch: watchRouter,
  aToZ: aToZRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
