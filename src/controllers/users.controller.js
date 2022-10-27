import connection from '../database/database.js';
import {
  notFoundResponse,
  okResponse,
  serverError,
} from "../helpers/controllers.helper.js";
import * as usersRepository from "../repositories/users.repository.js";
import { hashtagsRepository } from "../repositories/hashtags.repository.js";
import sortUsersArray from "../helpers/search.helper.js";
import { commentRepository } from "../repositories/comments.repository.js";

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
        const comments = (await commentRepository.getComments(post.id)).rows;
        return { ...post, hashtags, comments };
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

  const followerId = infoUser.id;

  const userId = req.body.id;

  if(followerId === userId) return res.status(422).json({
    message: "You cannot perform this operation!"
  });

  const infoFollowedUser = await connection.query(`
      SELECT * FROM users WHERE id = $1
    `, [ userId ]);

  const followedUser = infoFollowedUser.rows[0];

  try {

    await usersRepository.followUser(followerId, userId);

    return res.status(200).json({
      message: `You started following ${followedUser.username}`
    })
    
  } catch (error) {
    
    console.log(error);
    
    return res.status(500).json({
      message: `Error trying to follow user ${followedUser.username}`
    })

  }

}

async function unfollow(req, res) {

  const infoUser = res.locals.user;

  const unfollowerId = infoUser.id;

  const userId = req.body.id;

  if(unfollowerId === userId) return res.status(422).json({
    message: "You cannot perform this operation!"
  });

  const infoUnfollowedUser = await connection.query(`
      SELECT * FROM users WHERE id = $1
    `, [ userId ]);

  const unfollowedUser = infoUnfollowedUser.rows[0];

  try {

    await usersRepository.unfollowUser(unfollowerId, userId);

    return res.status(200).json({
      message: `You unfollowed ${unfollowedUser.username}`
    })
    
  } catch (error) {
    
    console.log(error);
    
    return res.status(500).json({
      message: `Error trying to unfollow the user ${unfollowedUser.username}`
    })

  }

}

async function verifyFollowers(req, res) {
  const infoUser = res.locals.user;

  const followerId = infoUser.id;

  try {

    const followersFound = (await usersRepository.verifyFollowersById(followerId)).rows;

    console.log(followersFound);

    const following = [];

    followersFound.map((follower) => {
      following.push(follower.user_id);
    })

    return res.status(200).json({
      followers_id: following
    })

    
  } catch (error) {
    
    console.log(error);
    
    return res.status(500).json({
      message: error
    })

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

export { getUserPosts, getUsersBySearch, follow, unfollow, verifyFollowers, getFollowers };