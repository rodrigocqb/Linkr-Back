import { createdResponse, notFoundResponse, serverError, noContentResponse, unauthorizedResponse } from "../helpers/controllers.helper.js";
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

async function deleteSharePost(req, res) {
    const { postId } = req.params;
    const userId = res.locals.session;

    try {
        const repostExists = await sharesRepository.getSharedPostById(postId)
        if (!repostExists.rowCount) return notFoundResponse(res, "Re-post not found")

        if (repostExists.rows[0].user_id !== userId) return unauthorizedResponse(res)

        await sharesRepository.deleteSharePostById(postId)
        noContentResponse(res);
    } catch (error) {
        console.log(error)
        return serverError(res);
    }
}

export { sharePost, deleteSharePost };