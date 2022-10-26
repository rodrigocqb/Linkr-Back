import express from "express";
import cors from "cors";
import usersRouter from "./routers/users.router.js";
import postRouter from "./routers/posts.router.js";
import authRouter from "./routers/auth.router.js";
import hashtagsRouters from "./routers/hashtag.router.js";
import commentsRouter from "./routers/comments.router.js";
import shareRouter from "./routers/shares.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(postRouter);
app.use(usersRouter);
app.use(authRouter);
app.use(hashtagsRouters);
app.use(commentsRouter);
app.use(shareRouter);

export default app;
