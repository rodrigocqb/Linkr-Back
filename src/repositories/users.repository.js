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
    WHERE t1.id = $1
    GROUP BY t1.id, posts.id;`,
    [id]
  );
}

export { getUserById, getUserPostsById };
