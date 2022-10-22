import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

import { createSession } from "../repositories/auth.repository.js";
import { okResponse } from "./controllers.helper.js";

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  await createSession(user.id, token);

  return okResponse(res, {
    message: "Authenticated user!",
    id: user.id,
    username: user.username,
    image: user.image,
    token,
  });
};

export default createUserToken;
