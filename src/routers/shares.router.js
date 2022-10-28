import { Router } from "express";
import { sharePost } from "../controllers/shares.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/share/:postId", auth, sharePost);

export default router;