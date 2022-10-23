import { postRepository } from "../repositories/posts.repository.js";
import {
  createdResponse,
  noContentResponse,
  okResponse,
  serverError,
  unauthorizedResponse,
  unprocessableEntityResponse,
} from "../helpers/controllers.helper.js";
import { hashtagsRepository } from "../repositories/hashtags.repository.js";

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
  try {
    const posts = (await postRepository.getPosts()).rows;
    const timeline = await Promise.all(
      posts.map(async (post) => {
        const hashtags = (await hashtagsRepository.getHashtagByIdPost(post.id))
          .rows[0]?.hashtag;
        return { ...post, hashtags: hashtags };
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
  const userId = res.locals.session;
  const { hashtags } = res.locals;

  const isIdValid = await postRepository.getPostById(id);

  if (!(isIdValid.rowCount > 0)) {
    return unprocessableEntityResponse(res, "This post doesn't exists.");
  }
  const post = isIdValid.rows[0];

  if (post.user_id !== userId) {
    return unauthorizedResponse(
      res,
      "You don't have the permission to edit this post"
    );
  }

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
