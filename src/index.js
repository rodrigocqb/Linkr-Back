import express from "express";
import cors from "cors";
import usersRouter from "./routers/users.router.js";
import postRouter from "./routers/posts.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(postRouter);
app.use(usersRouter);

export default app;
