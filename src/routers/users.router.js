import express from "express";
import { getUserPosts } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/user/:id", getUserPosts);

export default router;
