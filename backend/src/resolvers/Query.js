const Query = {
  async messages(parent, { chatId }, ctx, info) {
    const messages = await ctx.db.query.messages(
      { where: { chatId, chat: { users_some: { id: ctx.userId } } } },
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
    const users = await ctx.db.query.users()
    console.log(users[0])
    return users
  }
};

module.exports = Query;
