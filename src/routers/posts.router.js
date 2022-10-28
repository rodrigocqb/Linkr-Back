import { Router } from "express";
import { addHashtags } from "../controllers/hashtag.controller.js";
import {
  dislikePosts,
  getTimeline,
  likePosts,
  newPost,
  editPost,
  deletePost,
  getNow,
} from "../controllers/posts.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";
import checkPostData from "../middlewares/checkPostData.middleware.js";
import { schemaMiddleware } from "../middlewares/schema.middleware.js";
import { editSchema, postSchema } from "../schemas/post.schema.js";

const router = Router();

router.post("/posts", auth, schemaMiddleware(postSchema), addHashtags, newPost);
router.get("/timeline", auth, getTimeline);
router.post("/posts/like", auth, likePosts);
router.post("/posts/dislike", auth, dislikePosts);
router.put(
  "/posts/:id",
  auth,
  checkPostData,
  schemaMiddleware(editSchema),
  addHashtags,
  editPost
);
router.delete("/posts/:id", auth, checkPostData, deletePost);
router.get("/time", auth, getNow);

export default router;
