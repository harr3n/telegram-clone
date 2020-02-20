const Query = {
  async messages(parent, { chatId, orderBy, last = 50, before }, ctx, info) {
    const messages = await ctx.db.query.messagesConnection(
      {
        where: { chatId, chat: { users_some: { id: ctx.userId } } },
        orderBy: "createdAt_ASC",
        last,
        before
      },
      info
    );

    return messages;
  },
  me(parent, args, ctx, info) {
    if (!ctx.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: {
          id: ctx.userId
        }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    const users = await ctx.db.query.users();
    return users;
  },
  async chats(parent, { id }, ctx, info) {
    const chats = await ctx.db.query.chats(
      {
        where: { id, users_some: { id: ctx.userId } }
      },
      info
    );
    return chats;
  }
};

module.exports = Query;
