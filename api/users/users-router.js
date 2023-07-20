const express = require("express");

const db = require("./users-model");
const postDB = require("../posts/posts-model");

const mw = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

router.get("/:id", mw.validateUserId, async (req, res) => {
  try {
    return res.status(200).json(await db.getById(req.params.id));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

router.post("/", mw.validateUser, async (req, res) => {
  try {
    return res.status(201).json(await db.insert(req.body));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "The user could not be created" });
  }
});

router.put("/:id", mw.validateUserId, mw.validateUser, async (req, res) => {
  try {
    return res.status(200).json(await db.update(req.params.id, req.body));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "The user could not be updated" });
  }
});

router.delete("/:id", mw.validateUserId, async (req, res) => {
  try {
    const deletedUser = await db.getById(req.params.id);
    console.log(deletedUser);
    await db.remove(deletedUser.id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "The user could not be deleted" });
  }
});

router.get("/:id/posts", mw.validateUserId, async (req, res) => {
  try {
    return res.status(200).json(await db.getUserPosts(req.params.id));
  } catch (error) {
    return res.status(500).json({ message: "Posts could not be retrieved" });
  }
});

router.post(
  "/:id/posts",
  mw.validateUserId,
  mw.validatePost,
  async (req, res) => {
    try {
      return res.status(201).json(
        await postDB.insert({
          user_id: req.params.id,
          text: req.body.text,
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Posts could not be created" });
    }
  }
);

module.exports = router;
