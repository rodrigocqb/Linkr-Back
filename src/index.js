import express from "express";
import cors from "cors";
import { postRouter } from "./routers/posts.router.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(postRouter);

export default app;
