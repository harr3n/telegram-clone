require("dotenv").config({ path: ".env" });
const http = require('http');
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const createServer = require("./createServer");
const db = require("./db");

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

const server = createServer();
server.applyMiddleware({
  app,
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  },
  path: "/graphql",
  introspection: true
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(process.env.PORT, () => console.log(`🚀 Server ready at http://localhost:4444`));
// server.start(
//   {
//     cors: {
//       credentials: true,
//       origin: process.env.FRONTEND_URL
//     },
//     subscriptions: {
//       onConnect: async (connectionParams, webSocket) => {
//         const token = cookieParser.JSONCookie(webSocket.upgradeReq.headers.cookie)

//         if (token) {
//           const { userId } = jwt.verify(token, process.env.APP_SECRET)
//           return userId
//         }
//       },
//     },
//   },
//   res => {
//     console.log(`Running on localhost:${res.port}`);
//   }
// );
