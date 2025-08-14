import { createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedures";
import { infoRouter } from "@/modules/info/server/procedures";

export const appRouter = createTRPCRouter({
  home: homeRouter,
  info: infoRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
