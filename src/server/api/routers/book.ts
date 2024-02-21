import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const bookRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        subject: z.string(),
        author: z.string(),
        price: z.number(),
        publishedAt: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { title, subject, author, price, publishedAt } = input;
      await ctx.db.book.create({
        data: {
          title,
          subject,
          author,
          price,
          publishedAt,
        },
      });
    }),
  books: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.book.findMany({});
  }),
});
