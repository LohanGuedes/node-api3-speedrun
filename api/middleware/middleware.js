const db = require("../users/users-model");

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await db.getById(req.params.id);
    if (!user) {
      res.status(404);
      res.json({ message: "user not found" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
  next();
}

function validateUser(req, res, next) {
  if (
    req.method === "GET" ||
    req.method === "DELETE" ||
    req.url.includes("posts", 0)
  ) {
    next();
    return;
  }

  const body = req.body;
  if (!body || !body.name) {
    res.status(400);
    res.json({ message: "missing required name field" });
    return;
  }

  next();
}

function validatePost(req, res, next) {
  if (req.method === "GET") {
    next();
    return;
  }
  const body = req.body;
  if (!body || !body.text) {
    res.status(400);
    res.json({ message: "missing required text field" });
    return;
  }
  next();
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
// do not forget to expose these functions to other modules
