import connection from "../database/database.js";

const insertPost = async ({ userId, link, description }) => {
  return await connection.query(
    `INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3);`,
    [userId, link, description]
  );
};

const getUsersPostsByUserId = async (userId) => {
  return await connection.query(
    `SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC;`,
    [userId]
  );
};

const insertPostHashtag = async ({ postId, hashtagId }) => {
  return await connection.query(
    `INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2);`,
    [postId, hashtagId]
  );
};

const postRepository = {
  insertPost,
  getUsersPostsByUserId,
  insertPostHashtag,
};

export { postRepository };
