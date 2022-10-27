import express from "express";
import {
  getFollowers,
  getUserPosts,
  getUsersBySearch,
  follow,
  unfollow,
  verifyFollowers
} from "../controllers/users.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/user/:id", auth, getUserPosts);
router.get("/followers/user", auth, getFollowers);
router.get("/search/:name", auth, getUsersBySearch);
router.post("/follow", auth, follow);
router.post("/unfollow", auth, unfollow);
router.get("/verifyFollowers", auth, verifyFollowers)

export default router;