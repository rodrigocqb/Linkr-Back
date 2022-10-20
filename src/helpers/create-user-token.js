import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const createUserToken = async(user, req, res) => {

    // Criando o token
    const token = jwt.sign({
        id: user.id
    }, `${process.env.TOKEN_SECRET}`);

    res.status(200).json({
        message: "Authenticated user!",
        id: user.id,
        username: user.username,
        image: user.image,
        token
    });

}

export default createUserToken;