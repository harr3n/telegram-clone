const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutation = {
  async createMessage(parent, args, ctx, info) {
    try {
      const message = await ctx.db.mutation.createMessage(
        {
          data: {
            chat: {
              connect: { id: args.chatId }
            },
            from: {
              connect: { id: ctx.userId }
            },
            ...args
          }
        },
        info
      );

      return message;
    } catch (err) {
      console.log(err);
    }
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return token;
  },
  async signin(parent, { name, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { name } });
    if (!user) {
      throw new Error("No such user");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    return token
  },
  signout(parent, args, ctx, info) {
    ctx.res.clearCookie("token");
    return "Bye";
  },
  async createChat(parent, args, ctx, info) {
    if (ctx.userId === args.id) throw new Error("You can't add yourself")
    
    const [exists] = await ctx.db.query.chats({
      where: {
        AND: [
          {
            users_some: {
              id: ctx.userId
            }
          },
          {
            users_some: {
              id: args.id
            }
          }
        ]
      }
    });

    if (exists) return { id: exists.id };

    const chat = await ctx.db.mutation.createChat(
      {
        data: {
          users: {
            connect: [{ id: ctx.userId }, { id: args.id }]
          }
        }
      },
      info
    );
    return chat;
  },
};

module.exports = Mutation;
