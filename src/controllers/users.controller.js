import * as usersRepository from "../repositories/users.repository.js";

async function getUserPosts(req, res) {
  const { id } = req.params;
  // colocar um middleware pra buscar primeiro se esse usuario existe
  // pegar dados do usuario do res.locals e juntar
  // retornar 404 se nao existir
  // middleware de autenticacao tb
  try {
    const posts = (await usersRepository.getUserPostsById(id)).rows;
    return res.status(200).send(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: "Server error" });
  }
}

export { getUserPosts };
