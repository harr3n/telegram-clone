require("dotenv").config({ path: ".env" });
const http = require('http');
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const createServer = require("./createServer");
const db = require("./db");

console.log(process.env.PRISMA_ENDPOINT)

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(" ")[1]
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

httpServer.listen(process.env.PORT, () => console.log(`🚀 Server ready on port ${process.env.PORT} prisma endpoint ${process.env.PRISMA_ENDPOINT}`));
