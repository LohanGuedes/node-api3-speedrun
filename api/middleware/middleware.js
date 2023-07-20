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
    }
  } catch (error) {
    console.log(error);
  }
  next();
}

function validateUser(req, res, next) {
  console.log(req);
  if (req.method == "GET") {
    next();
    return;
  }

  const body = req.body;
  if (!body || !body.name) {
    res.status(400);
    res.json({ message: "missing required name field" });
  }

  next();
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ message: "missing required text field" });
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
