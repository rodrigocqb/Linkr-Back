import express from "express";
import {
  getUserPosts,
  getUsersBySearch,
  follow,
  unfollow,
  verifyFollower
} from "../controllers/users.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/user/:id", auth, getUserPosts);
router.get("/search/:name", auth, getUsersBySearch);
router.post("/follow", auth, follow);
router.post("/unfollow", auth, unfollow);
router.get("/verifyFollower", auth, verifyFollower)

export default router;