import * as usersRepository from "../repositories/users.repository.js";

async function getUserPosts(req, res) {
  const { id } = req.params;
  // colocar um middleware pra buscar primeiro se esse usuario existe
  // pegar dados do usuario do res.locals e juntar
  // retornar 404 se nao existir
  // middleware de autenticacao tb
  try {
    const posts = (await usersRepository.getUserPostsById(id)).rows;
    return okResponse(res, posts);
  } catch (error) {
    console.log(error.message);
    return serverError(res);
  }
}

export { getUserPosts };
