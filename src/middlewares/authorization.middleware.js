import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connection from "../database/database.js";
dotenv.config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = (
      await connection.query(`SELECT * FROM users WHERE id = $1;`, [
        data.userId,
      ])
    ).rows[0];
    delete user.password;

    res.locals.session = data.userId;
    res.locals.user = user;
    next();
  } catch (error) {
    await connection.query(
      `UPDATE sessions SET "valid" = $1 WHERE "token" = $2;`,
      [false, token]
    );

    return res.status(401).send({ error: "Invalid token authorization." });
  }
};

export { auth };
