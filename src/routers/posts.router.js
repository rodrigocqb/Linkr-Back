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

const postRouter = Router();

postRouter.post(
  "/posts",
  auth,
  schemaMiddleware(postSchema),
  addHashtags,
  newPost
);
postRouter.post("/test/signin", testUser);
postRouter.post("/test/login", tesLogin);
export { postRouter };
