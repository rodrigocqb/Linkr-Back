import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";

import validateLogin from '../middlewares/validateLoginMiddleware.js';
import validateRegister from '../middlewares/validateRegisterMiddleware.js';

const authRouter = Router();

authRouter.post("/signup", validateRegister, AuthController.signup);
authRouter.post("/signin", validateLogin, AuthController.signin);

export default authRouter;