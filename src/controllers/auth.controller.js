import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

import {
  getUserByEmail,
  createUser,
  getUserByEmailOrUsername,
} from "../repositories/auth.repository.js";

import createUserToken from "../helpers/create-user-token.js";
import {
  conflictResponse,
  createdResponse,
  serverError,
  unauthorizedResponse,
} from "../helpers/controllers.helper.js";

class AuthController {
  static async signup(req, res) {
    const { email, password, username, image } = req.body;

    const userExists = await getUserByEmailOrUsername(email, username);

    if (userExists.rows.length > 0) return conflictResponse(res);

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      await createUser(email, passwordHash, username, image);

      return createdResponse(res);
    } catch (error) {
      console.log(error.message);
      return serverError(res);
    }
  }

  static async signin(req, res) {
    const { email, password } = req.body;

    const userExists = await getUserByEmail(email);

    if (!userExists.rows[0]) return unauthorizedResponse(res);

    const user = userExists.rows[0];

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) return unauthorizedResponse(res);

    await createUserToken(user, req, res);
    return;
  }
}

export default AuthController;
