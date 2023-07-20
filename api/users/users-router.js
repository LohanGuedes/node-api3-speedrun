const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const db = require("./users-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.json(users);
    return;
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ message: "The users information could not be retrieved" });
  }
});

router.get("/:id", async (req, res) => {
  res.json(await db.getById(req.params.id));
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newUser = await db.insert(body);
  console.log(body);
  console.log(newUser);

  res.json();
  return;
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  return;
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  return;
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  return;
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  return;
});

// do not forget to export the router
module.exports = router;
