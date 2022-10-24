import {
  notFoundResponse,
  serverError,
  unauthorizedResponse,
} from "../helpers/controllers.helper.js";
import { postRepository } from "../repositories/posts.repository.js";

async function checkPostData(req, res, next) {
  const { id } = req.params;
  const userId = res.locals.session;
  try {
    const isIdValid = (await postRepository.getPostById(id)).rows[0];
    if (!isIdValid) {
      return notFoundResponse(res);
    }
    const post = isIdValid;
    if (post.user_id !== userId) {
      return unauthorizedResponse(res);
    }

    return next();
  } catch (error) {
    return serverError(res);
  }
}

export default checkPostData;
