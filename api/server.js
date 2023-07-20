const express = require("express");
const server = express();

server.use("/", express.json());

const mw = require("./middleware/middleware");
server.use("/", mw.logger);

const userRouter = require("./users/users-router");
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`Server Live`);
});

module.exports = server;
