import { createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedures";
import { infoRouter } from "@/modules/info/server/procedures";
import { watchRouter } from "@/modules/watch/server/procedures";

export const appRouter = createTRPCRouter({
  home: homeRouter,
  info: infoRouter,
  watch: watchRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
