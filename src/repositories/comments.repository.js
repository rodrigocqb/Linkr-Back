import connection from "../database/database.js";

const insertComment = async ({ userId, postId, comment }) => {
    return await connection.query(`INSERT INTO comments (user_id, posts_id, comment) VALUES ($1, $2, $3);`, [userId, postId, comment])
}

export const commentRepository = { insertComment }