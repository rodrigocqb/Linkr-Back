import { Router } from "express";
import {
  newPost,
  tesLogin,
  testUser,
} from "../controllers/posts.controller.js";
import { auth } from "../middlewares/authorization.middleware.js";
import { schemaMiddleware } from "../middlewares/schema.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const postRouter = Router();

postRouter.post("/posts", auth, schemaMiddleware(postSchema), newPost);
postRouter.post("/test/signin", testUser);
postRouter.post("/test/login", tesLogin);
export { postRouter };
