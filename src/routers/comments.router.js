import { Router } from "express";
import {
  commentPost,
  getCommentsFromPost,
} from "../controllers/comments.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";
import { schemaMiddleware } from "../middlewares/schema.middleware.js";
import { commentSchema } from "../schemas/comments.schema.js";

const router = Router();

router.post(
  "/comment/:postId",
  auth,
  schemaMiddleware(commentSchema),
  commentPost
);
router.get("/comment/:postId", auth, getCommentsFromPost);

export default router;
