import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";
import { schemaMiddleware } from "../middlewares/schema.middleware.js";
import loginSchema from "../schemas/login.schema.js";
import registerSchema from "../schemas/register.schema.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaMiddleware(registerSchema),
  AuthController.signup
);
authRouter.post(
  "/signin",
  schemaMiddleware(loginSchema),
  AuthController.signin
);

export default authRouter;
