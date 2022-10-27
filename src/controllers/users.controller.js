import connection from '../database/database.js';
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

async function follow(req, res) {

  const infoUser = res.locals.user;

  const idUser = infoUser.id;

  const idFollowedUser = req.body.id;

  const infoFollowedUser = await connection.query(`
      SELECT * FROM users WHERE id = $1
    `, [ idFollowedUser ]);

  const followedUser = infoFollowedUser.rows[0];

  try {

    await usersRepository.followUser(idUser, idFollowedUser);

    return res.status(200).json({
      message: `Você começou a seguir ${followedUser.username}`
    })
    
  } catch (error) {
    
    console.log(error);
    
    return res.status(500).json({
      message: `Erro ao tentar seguir o usuário ${followedUser.username}`
    })

  }

}

async function unfollow(req, res) {

  const infoUser = res.locals.user;

  const idUser = infoUser.id;

  const idUnfollowedUser = req.body.id;

  const infoUnfollowedUser = await connection.query(`
      SELECT * FROM users WHERE id = $1
    `, [ idUnfollowedUser ]);

  const unfollowedUser = infoUnfollowedUser.rows[0];

  try {

    await usersRepository.unfollowUser(idUser, idUnfollowedUser);

    return res.status(200).json({
      message: `Você deixou de seguir ${unfollowedUser.username}`
    })
    
  } catch (error) {
    
    console.log(error);
    
    return res.status(500).json({
      message: `Erro ao tentar deixar de seguir o usuário ${unfollowedUser.username}`
    })

  }

}

async function verifyFollower(req, res) {
  const infoUser = res.locals.user;

  const idUser = infoUser.id;

  // const idPossibleFollower = Number(req.params.follower);

  try {

    const followerFound = (await usersRepository.verifyFollowerById(idUser)).rows;

    const values = [];

    followerFound.map((follower) => {
      // console.log(follower.follower_id);
      values.push(follower.follower_id);
    })

    // console.log(followerFound);
    // console.log(values);

    return res.status(200).json({
      followers_id: values
    })

    
  } catch (error) {
    
    console.log(error);
    
    return res.status(500).json({
      message: error
    })

  }
}

export { getUserPosts, getUsersBySearch, follow, unfollow, verifyFollower };
