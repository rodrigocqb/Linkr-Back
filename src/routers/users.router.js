import express from "express";
import { getUserPosts } from "../controllers/users.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/user/:id", auth, getUserPosts);

export default router;
