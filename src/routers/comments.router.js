import { Router } from 'express';
import { commentPost } from '../controllers/comments.controller.js';
import { auth } from "../middlewares/authorization.middleware.js";
import { schemaMiddleware } from '../middlewares/schema.middleware.js';
import { commentSchema } from '../schemas/comments.schema.js';

const commentsRouter = Router();

commentsRouter.post("/comment/:postId", auth, schemaMiddleware(commentSchema), commentPost);

export default commentsRouter;