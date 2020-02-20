const Subscription = {
  message: {
    async subscribe(parent, args, ctx, info) {
      const message = await ctx.db.subscription.message(
        {
          where: {
            node: {
              chatId: args.chatId,
              chat: {
                users_some: { id: ctx.userId }
              }
            },
            mutation_in: ["CREATED", "UPDATED"]
          }
        },
        info
      );
      return message;
    }
  },
  chat: {
    async subscribe(parent, args, ctx, info) {
      const chat = await ctx.db.subscription.chat(
        {
          where: {
            node: {
              users_some: { id: ctx.userId }
            },
            mutation_in: ["CREATED", "UPDATED"]
          }
        },
        info
      );
      return chat;
    }
  }
};

module.exports = Subscription;
