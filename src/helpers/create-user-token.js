import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    message: "Authenticated user!",
    id: user.id,
    username: user.username,
    image: user.image,
    token,
  });
};

export default createUserToken;
