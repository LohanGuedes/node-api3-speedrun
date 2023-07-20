const express = require("express");

const db = require("./users-model");
const postDB = require("../posts/posts-model");

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
  const newUser = await db.insert(req.body);
  res.json(newUser);
  return;
});

router.put("/:id", async (req, res) => {
  const newUser = await db.update(req.params.id, req.body);
  res.json(newUser);
  return;
});

router.delete("/:id", async (req, res) => {
  const deletedUser = await db.getById(req.params.id);
  await db.remove(req.params.id);
  res.json(deletedUser);
  return;
});

router.get("/:id/posts", async (req, res) => {
  const userPosts = await db.getUserPosts(req.params.id);
  console.log(userPosts);
  res.json(userPosts);
  return;
});

router.post("/:id/posts", async (req, res) => {
  const newUserPost = await postDB.insert({
    user_id: req.params.id,
    text: req.body.text,
  });
  res.send(newUserPost);
  return;
});

module.exports = router;
