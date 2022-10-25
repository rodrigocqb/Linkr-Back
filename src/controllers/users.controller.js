import {
  notFoundResponse,
  okResponse,
  serverError,
} from "../helpers/controllers.helper.js";
import * as usersRepository from "../repositories/users.repository.js";
import { hashtagsRepository } from "../repositories/hashtags.repository.js";
import sortUsersArray from "../helpers/search.helper.js";

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
  const userId = res.locals.session;

  try {
    const allUsers = (await usersRepository.getUsersByName(name)).rows;
    const userFollows = (await usersRepository.getUsersFollows(userId)).rows;

    const usersFiltered = sortUsersArray(allUsers, userFollows);
    return okResponse(res, usersFiltered);
  } catch (error) {
    console.log(error.message);
    return serverError(res);
  }
}

async function getFollowers(req, res) {
  const userId = res.locals.session;

  try {
    const userFollows = (await usersRepository.getUsersFollows(userId)).rows;

    return okResponse(res, userFollows);
  } catch (error) {
    console.log(error.message);
    return serverError(res);
  }
}

export { getUserPosts, getUsersBySearch, getFollowers };
