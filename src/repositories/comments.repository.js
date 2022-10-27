import connection from "../database/database.js";

const insertComment = async ({ userId, postId, comment }) => {
  return await connection.query(
    `INSERT INTO comments (user_id, post_id, comment) VALUES ($1, $2, $3);`,
    [userId, postId, comment]
  );
};

const getComments = async (id) => {
  return await connection.query(
    `SELECT id, user_id, post_id, comment
    FROM comments WHERE post_id = $1`,
    [id]
  );
};

export const commentRepository = { insertComment, getComments };
