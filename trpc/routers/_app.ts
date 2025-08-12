import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedures";
export const appRouter = createTRPCRouter({
  home: homeRouter,
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
