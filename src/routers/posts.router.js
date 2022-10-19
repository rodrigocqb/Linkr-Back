import { Router } from "express";
import { addHashtags } from "../controllers/hashtag.controller.js";
import {
  newPost,
  tesLogin,
  testUser,
} from "../controllers/posts.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";
import { schemaMiddleware } from "../middlewares/schema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const router = Router();

router.post("/posts", auth, schemaMiddleware(postSchema), addHashtags, newPost);
router.post("/test/signin", testUser);
router.post("/test/login", tesLogin);

export default router;
