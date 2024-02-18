const express = require("express");
const {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyPost,
  getPostsFeed,
  getUserPosts,
} = require("../controllers/postController");
const { protectRoute } = require("../middleware/protectRoute");

const postRoutes = express.Router();

postRoutes.get("/feed", protectRoute, getPostsFeed);
postRoutes.post("/create", protectRoute, createPost);
postRoutes.get("/:id", getPost);
postRoutes.get("/user/:username", getUserPosts);
postRoutes.delete("/:id", protectRoute, deletePost);
postRoutes.put("/like/:id", protectRoute, likeUnlikePost);
postRoutes.put("/reply/:id", protectRoute, replyPost);

module.exports = {
  postRoutes,
};
