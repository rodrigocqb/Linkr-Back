import connection from "../database/database.js";

const insertComment = async ({ userId, postId, comment }) => {
  return await connection.query(
    `INSERT INTO comments (user_id, posts_id, comment) VALUES ($1, $2, $3);`,
    [userId, postId, comment]
  );
};

const getComments = async (id) => {
  return await connection.query(
    `SELECT comments.id, comments.user_id, 
    comments.posts_id, comments.comment, 
    users.image, users.username
    FROM comments
    JOIN users
    ON comments.user_id = users.id
    WHERE posts_id = $1`,
    [id]
  );
};

export const commentRepository = { insertComment, getComments };
