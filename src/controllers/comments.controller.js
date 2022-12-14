import {
  createdResponse,
  notFoundResponse,
  serverError,
} from "../helpers/controllers.helper.js";
import { postRepository } from "../repositories/posts.repository.js";
import { commentRepository } from "../repositories/comments.repository.js";

async function commentPost(req, res) {
  const { postId } = req.params;
  const userId = res.locals.session;
  const { comment } = res.locals.body;

  try {
    const postExists = (await postRepository.getPostById(postId)).rowCount > 0;
    if (!postExists) return notFoundResponse(res, "Post not found");

    commentRepository.insertComment({ postId, userId, comment });
    createdResponse(res);
  } catch (error) {
    return serverError(res);
  }
}

export { commentPost };
