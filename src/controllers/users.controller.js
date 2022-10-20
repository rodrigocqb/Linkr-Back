import {
  notFoundResponse,
  okResponse,
  serverError,
} from "../helpers/controllers.helper.js";
import * as usersRepository from "../repositories/users.repository.js";

async function getUserPosts(req, res) {
  const { id } = req.params;
  try {
    const user = (await usersRepository.getUserById(id)).rows[0];
    if (!user) {
      return notFoundResponse(res);
    }
    const posts = (await usersRepository.getUserPostsById(id)).rows;
    user.posts = posts;
    return okResponse(res, user);
  } catch (error) {
    console.log(error.message);
    return serverError(res);
  }
}

async function getUsersBySearch(req, res) {
  const { name } = req.params;
  try {
    const allUsers = (await usersRepository.getUsersByName(name)).rows;
    return okResponse(res, allUsers);
  } catch (error) {
    console.log(error.message);
    return serverError(res);
  }
}

export { getUserPosts, getUsersBySearch };
