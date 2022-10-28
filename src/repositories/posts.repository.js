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

const getPostById = async (postId) => {
  return await connection.query(` SELECT * FROM posts WHERE id = $1;`, [
    postId,
  ]);
};

const insertPostHashtag = async ({ postId, hashtagId }) => {
  return await connection.query(
    `INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2);`,
    [postId, hashtagId]
  );
};

const getUserPostHashtag = async (postId) => {
  return await connection.query(
    `SELECT * FROM posts_hashtags WHERE post_id = $1;`,
    [postId]
  );
};

const deletePostHashtag = async (postId) => {
  return await connection.query(
    ` DELETE FROM posts_hashtags WHERE post_id = $1;`,
    [postId]
  );
};

const getPosts = async (followerId, cut) => {
  return connection.query(
    `SELECT t1.id AS user_id, t1.username, t1.image, 
  posts.id, posts.link, posts.description, posts.created_at, COALESCE(n1.repost_number, 0) AS repost_count,
  ARRAY_REMOVE(
    ARRAY_AGG(t2.username 
      ORDER BY likes.id DESC), NULL) AS likes
  FROM posts 
  JOIN users AS t1
  ON posts.user_id = t1.id
  LEFT JOIN likes
  ON posts.id = likes.post_id
  LEFT JOIN users AS t2
  ON likes.user_id = t2.id
  LEFT JOIN (
    SELECT shares.post_id, COUNT(post_id) AS repost_number
      FROM shares
    JOIN posts ON shares.post_id=posts.id
    GROUP BY post_id
    ) n1 ON n1.post_id=posts.id
  WHERE t1.id IN ( SELECT user_id FROM followers WHERE follower_id = $1 )
  OR t1.id IN ( SELECT users.id FROM users WHERE users.id = $1 )
  GROUP BY t1.id, posts.id, n1.repost_number
  ORDER BY posts.created_at OFFSET $2
  LIMIT 20;`,
    [followerId, cut]
  );
};

const editPostById = async ({ id, description }) => {
  return await connection.query(
    `
    UPDATE posts SET description=$1 WHERE id=$2;
  `,
    [description, id]
  );
};

const deletePostById = async (id) => {
  await connection.query(`DELETE FROM posts_hashtags WHERE post_id=$1;`, [id]);
  await connection.query(`DELETE FROM likes WHERE post_id=$1;`, [id]);
  await connection.query(`DELETE FROM comments WHERE post_id = $1`, [id]);
  await connection.query(`DELETE FROM shares WHERE post_id = $1`, [id]);
  return await connection.query(`DELETE FROM posts WHERE id=$1;`, [id]);
};
const likePost = async ({ postId, userId }) => {
  return connection.query(
    `INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`,
    [postId, userId]
  );
};

const dislikePost = async ({ postId, userId }) => {
  return connection.query(
    `DELETE FROM likes WHERE post_id = $1 AND user_id = $2;`,
    [postId, userId]
  );
};

const postRepository = {
  insertPost,
  getUsersPostsByUserId,
  insertPostHashtag,
  getUserPostHashtag,
  deletePostHashtag,
  getPosts,
  editPostById,
  deletePostById,
  likePost,
  dislikePost,
  getPostById,
};

export { postRepository };
