import { createdResponse, notFoundResponse, serverError } from "../helpers/controllers.helper.js";
import { postRepository } from "../repositories/posts.repository.js";
import sharesRepository from "../repositories/shares.repository.js";

async function sharePost(req, res) {
    const { postId } = req.params;
    const userId = res.locals.session;

    try {
        if (!(await postRepository.getPostById(postId)).rowCount) return notFoundResponse(res, "Post not found")

        await sharesRepository.insertSharedPost({ postId, userId })
        createdResponse(res);
    } catch (error) {
        return serverError(res);
    }
}

export { sharePost };