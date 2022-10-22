import {
  notFoundResponse,
  okResponse,
  serverError,
} from "../helpers/controllers.helper.js";
import * as usersRepository from "../repositories/users.repository.js";
import { hashtagsRepository } from "../repositories/hashtags.repository.js";

async function getUserPosts(req, res) {
  const { id } = req.params;
  try {
    const user = (await usersRepository.getUserById(id)).rows[0];
    if (!user) {
      return notFoundResponse(res);
    }
    const posts = (await usersRepository.getUserPostsById(id)).rows;
    
    const userTimeline = await Promise.all(
      posts.map(async (post) => {
        const hashtags = (await hashtagsRepository.getHashtagByIdPost(post.id))
          .rows[0]?.hashtag;
        return { ...post, hashtags: hashtags };
      })
    );

    user.posts = userTimeline;
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
