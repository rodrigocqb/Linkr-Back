import { Router } from "express";
import { deleteSharePost, sharePost } from "../controllers/shares.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/share/:postId", auth, sharePost);
router.delete("/share/:postId", auth, deleteSharePost);

export default router;