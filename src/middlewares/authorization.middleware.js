import jwt from "jsonwebtoken";
import {
  serverError,
  unauthorizedResponse,
} from "../helpers/controllers.helper.js";
import * as authRepository from "../repositories/auth.repository.js";
import * as usersRepository from "../repositories/users.repository.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  let userId;
  try {
    userId = jwt.verify(token, process.env.JWT_SECRET).id;
  } catch (error) {
    await authRepository.updateExpiredSession(token);
    return unauthorizedResponse(res);
  }
  try {
    const session = (await authRepository.getSession({ userId, token }))
      .rows[0];
    if (!session) {
      return unauthorizedResponse(res);
    }
    const user = (await usersRepository.getUserById(userId)).rows[0];
    delete user.password;

    res.locals.session = userId;
    res.locals.user = user;
    return next();
  } catch (error) {
    return serverError(res);
  }
};

export { auth };
