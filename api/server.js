const express = require("express");
const server = express();

server.use("/", express.json());

const mw = require("./middleware/middleware");
server.use("/", mw.logger);
server.use("/api/users/:id", mw.validateUserId);
server.use("/api/users", mw.validateUser);

server.use("/api/users/:id/posts", mw.validatePost);
server.use("/api/posts", mw.validatePost);

const userRouter = require("./users/users-router");
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
