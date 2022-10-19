import express from "express";
import cors from "cors";
import usersRouter from "./routers/users.router.js";
import postRouter from "./routers/posts.router.js";
import authRouter from "./routers/auth.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(postRouter);
app.use(usersRouter);
app.use(authRouter);

export default app;
