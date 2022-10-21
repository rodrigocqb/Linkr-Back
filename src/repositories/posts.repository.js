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

const getPosts = async () => {
  return connection.query(`SELECT t1.id AS user_id, t1.username, t1.image, 
  posts.id, posts.link, posts.description,
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
  GROUP BY t1.id, posts.id 
  ORDER BY posts.id DESC
  LIMIT 20;`);
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
  getPosts,
  likePost,
  dislikePost,
};

export { postRepository };
