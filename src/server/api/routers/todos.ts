import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todosRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todoItem.findMany();
  }),
});
