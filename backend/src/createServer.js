const { GraphQLServer } = require("graphql-yoga");

const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const AuthDirective = require("./directives/auth");
const db = require("./db");

const createServer = () => {
  return new ApolloServer({
    typeDefs: importSchema("src/schema.graphql"),
    resolvers: {
      Mutation,
      Query,
      Subscription
    },
    subscriptions: {
      onConnect: (params, socket) => {
        const { token } = socket.upgradeReq.headers.cookie
          ? cookie.parse(socket.upgradeReq.headers.cookie)
          : {};

        if (!token) throw new Error("Missing token");

        const { userId } = jwt.verify(token, process.env.APP_SECRET);

        if (!userId) throw new Error("Invalid token");
        
        return { userId };
      }
    },
    schemaDirectives: {
      isAuth: AuthDirective
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: ({ req, connection }) => {
      let userId;

      if (connection) {
        userId = connection.context.userId;
      } else {
        userId = req.userId;
      }

      return { ...req, db, userId };
    }
  });
};

module.exports = createServer;
