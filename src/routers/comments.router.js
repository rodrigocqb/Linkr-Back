import { Router } from "express";
import { commentPost } from "../controllers/comments.controller.js";
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

export default router;
