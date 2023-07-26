import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todosRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todoItem.findMany({
      where: {
        deleted: false,
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todoItem.create({
        data: {
          content: input.content,
        },
      });
      return todo;
    }),
  complete: publicProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todoItem.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todoItem.update({
        where: {
          id: input.id,
        },
        data: {
          deleted: true,
        },
      });
    }),
});
