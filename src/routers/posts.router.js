import { Router } from "express";
import { addHashtags } from "../controllers/hashtag.controller.js";
import {
  getTimeline,
  newPost,
  tesLogin,
  testUser,
  editPost,
  deletePost
} from "../controllers/posts.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";
import { schemaMiddleware } from "../middlewares/schema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const router = Router();

router.post("/posts", auth, schemaMiddleware(postSchema), addHashtags, newPost);
router.get("/timeline", auth, getTimeline);

router.post("/test/signin", testUser);
router.post("/test/login", tesLogin);

router.put("/posts/:id", auth, editPost);
router.delete("/posts/:id", auth, deletePost);

export default router;
