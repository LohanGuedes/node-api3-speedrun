const db = require("../users/users-model");

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url} ${Date.now()}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    if (!(await db.getById(req.params.id))) {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not check if user exists" });
  }
  next();
}

function validateUser(req, res, next) {
  const body = req.body;
  if (!body || !body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }

  next();
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body || !body.text) {
    return res.status(400).json({ message: "missing required text field" });
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
