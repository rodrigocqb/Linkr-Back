import express from "express";
import {
  getUserPosts,
  getUsersBySearch,
} from "../controllers/users.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/user/:id", auth, getUserPosts);
router.get("/search/:name", auth, getUsersBySearch);

export default router;
