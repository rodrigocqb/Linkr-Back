import connection from "../database/database.js";

async function getUserById(id) {
  return connection.query(
    `SELECT id, username, image
    FROM users WHERE id = $1`,
    [id]
  );
}

async function getUserPostsById(id) {
  return connection.query(
    `SELECT t1.id AS user_id, t1.username, t1.image, 
    posts.id, posts.link, posts.description, posts.created_at,  COALESCE(n1.repost_number, 0) AS repost_count,
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
    WHERE t1.id = $1
    GROUP BY t1.id, posts.id, n1.repost_number
    ORDER BY posts.created_at;`,
    [id]
  );
}

async function getUsersByName(search) {
  return connection.query(
    `SELECT users.id, users.username, users.image FROM users WHERE LOWER(username) LIKE '%' || LOWER($1) || '%';`,
    [`${search}`]
  );
}

async function getUsersFollows(userId) {
  return connection.query(
    `
      SELECT j2.username
      FROM followers 
      JOIN users AS j1 ON followers.follower_id = j1.id 
      JOIN users AS j2 ON followers.user_id = j2.id
      WHERE follower_id = $1;
    `,
    [userId]
  );
}

async function followUser(followerId, userId) {
  return connection.query(
    `
      INSERT INTO followers (follower_id, user_id) 
      VALUES ($1, $2)
    `,
    [followerId, userId]
  );
}

async function unfollowUser(unfollowerId, userId) {
  return connection.query(
    `
      DELETE FROM followers
      WHERE follower_id = $1 AND user_id = $2
    `,
    [unfollowerId, userId]
  );
}

async function verifyFollowersById(followerId) {
  return connection.query(
    `
      SELECT user_id FROM followers
      WHERE follower_id = $1
    `,
    [followerId]
  );
}

export {
  getUserById,
  getUserPostsById,
  getUsersByName,
  getUsersFollows,
  followUser,
  unfollowUser,
  verifyFollowersById,
};
