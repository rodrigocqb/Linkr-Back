import { postRepository } from "../repositories/posts.repository.js";
import {
  createdResponse,
  noContentResponse,
  okResponse,
  serverError,
  unprocessableEntityResponse,
} from "../helpers/controllers.helper.js";
import { hashtagsRepository } from "../repositories/hashtags.repository.js";
import { commentRepository } from "../repositories/comments.repository.js";
import sharesRepository from "../repositories/shares.repository.js";

const newPost = async (req, res) => {
  const { link } = res.locals.body;
  const { description } = res.locals;
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
    return createdResponse(res, { link, description, userId, hashtags });
  } catch (error) {
    return serverError(res);
  }
};

async function getTimeline(req, res) {
  const userId = res.locals.session;
  const cut = req.query.cut;
  const time = req.query.time;

  try {
    if (time) {
      const posts = (await postRepository.getNewPosts(userId, time)).rows;
      const shares = (await sharesRepository.getNewSharedPosts(userId, time))
        .rows;
      posts.push(...shares);
      posts.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      const timeline = await Promise.all(
        posts.map(async (post) => {
          const hashtags = (
            await hashtagsRepository.getHashtagByIdPost(post.id)
          ).rows[0]?.hashtag;
          const comments = (await commentRepository.getComments(post.id)).rows;
          return { ...post, hashtags, comments };
        })
      );

      return okResponse(res, timeline);
    }

    const posts = (await postRepository.getPosts(userId)).rows;
    const shares = (await sharesRepository.getSharedPosts(userId)).rows;
    posts.push(...shares);
    posts
      .sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      })
      .slice(cut, cut + 10);

    const timeline = await Promise.all(
      posts.map(async (post) => {
        const hashtags = (await hashtagsRepository.getHashtagByIdPost(post.id))
          .rows[0]?.hashtag;
        const comments = (await commentRepository.getComments(post.id)).rows;
        return { ...post, hashtags, comments };
      })
    );

    return okResponse(res, timeline);
  } catch (error) {
    console.log(error.message);
    return serverError(res);
  }
}

async function editPost(req, res) {
  const { id } = req.params;
  const { description } = res.locals;
  const { hashtags } = res.locals;

  try {
    const postHasHashtag =
      (await postRepository.getUserPostHashtag(id)).rowCount > 0;

    if (postHasHashtag) {
      await postRepository.deletePostHashtag(id);
    }

    const postId = id;
    if (hashtags) {
      hashtags.forEach(async (hashtagId) => {
        await postRepository.insertPostHashtag({ postId, hashtagId });
      });
    }

    await postRepository.editPostById({ description, id });
    createdResponse(res);
  } catch (error) {
    return serverError(res);
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  if (!id) return unprocessableEntityResponse(res);

  try {
    await postRepository.deletePostById(Number(id));
    noContentResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

async function likePosts(req, res) {
  const userId = res.locals.session;
  const { postId } = req.body;

  try {
    await postRepository.likePost({ postId, userId });
    return okResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

async function dislikePosts(req, res) {
  const userId = res.locals.session;
  const { postId } = req.body;

  try {
    await postRepository.dislikePost({ postId, userId });
    return okResponse(res);
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
}

export { newPost, getTimeline, likePosts, dislikePosts, editPost, deletePost };
