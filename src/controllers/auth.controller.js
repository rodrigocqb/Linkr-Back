import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

import { getUserByEmail, createUser } from "../repositories/auth.repository.js";

import createUserToken from "../helpers/create-user-token.js";

class AuthController {
  static async signup(req, res) {
    const { email, password, username, image } = req.body;

    // Verificando a existência do usuário
    const userExists = await getUserByEmail(email);

    if (userExists.rows.length > 0)
      return res.status(409).json({
        message: "User already registered!",
      });

    // Criptografando a senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      await createUser(email, passwordHash, username, image);

      return res.status(201).json({
        message: "User created successfully!",
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async signin(req, res) {
    const { email, password } = req.body;

    // Verificando a existência do usuário
    const userExists = await getUserByEmail(email);

    if (!userExists.rows[0])
      return res.status(401).json({
        message: "E-mail not found!",
      });

    const user = userExists.rows[0];

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(401).json({
        message: "Invalid password!",
      });

    await createUserToken(user, req, res);
  }
}

export default AuthController;
