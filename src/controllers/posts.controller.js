import connection from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { postRepository } from "../repositories/posts.repository.js";

const newPost = async (req, res) => {
  const { link, description } = res.locals.body;
  const userId = res.locals.session;
  const { hashtags } = res.locals;

  try {
    await postRepository.insertPost({ userId, link, description });

    const post = (await postRepository.getUsersPostsByUserId(userId)).rows[0];

    const postId = post.id;
    if (hashtags) {
      hashtags.forEach(async (hashtagId) => {
        await postRepository.insertPostHashtag({ postId, hashtagId });
      });
    }
    return res.status(201).send({
      link,
      description,
      userId,
      hashtags,
    });
  } catch (error) {
    return res.status(500).send({ error: "An error." });
  }
};

const testUser = async (req, res) => {
  const { email, username, password, image } = req.body;

  if (password === undefined) {
    return res.status(404).send({ message: "Password is undefined" });
  }

  const passHash = bcrypt.hashSync(password, 12);

  try {
    await connection.query(
      `INSERT INTO users (email, username, password, image) VALUES ($1, $2, $3, $4);`,
      [email, username, passHash, image]
    );
    return res.status(201).send({ message: "User created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const tesLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userIsValid = await connection.query(
      `SELECT * FROM users where email = $1;`,
      [email]
    );
    if (userIsValid.rowCount == 0) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const user = userIsValid.rows[0];
    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const data = { userId: user.id };
    const token = jwt.sign(data, process.env.JWT_SECRET);

    await connection.query(
      `INSERT INTO sessions (token, user_id) VALUES ($1, $2);`,
      [token, user.id]
    );

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { testUser, tesLogin, newPost };
