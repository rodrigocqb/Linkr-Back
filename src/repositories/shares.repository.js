import connection from "../database/database.js";

const getSharedPosts = async (followerId) => {
  return await connection.query(
    `
    SELECT shares.post_id as id, shares.id as shared_id, u2.id as user_id, u2.username, 
    posts.link, posts.description, shares.created_at, u1.id as shared_by_id, 
    u1.username as shared_by_username, COALESCE(n1.repost_number, 0) AS repost_count,
         ARRAY_REMOVE(
            ARRAY_AGG(t2.username 
              ORDER BY likes.id DESC), NULL) AS likes
        FROM shares 
        JOIN users as u1 ON shares.user_id=u1.id
        JOIN posts ON shares.post_id=posts.id
        JOIN users as u2 ON posts.user_id=u2.id
        LEFT JOIN likes ON posts.id = likes.post_id
        LEFT JOIN users AS t2 ON likes.user_id = t2.id
          LEFT JOIN (
        SELECT shares.post_id, COUNT(post_id) AS repost_number
          FROM shares
        JOIN posts ON shares.post_id=posts.id
        GROUP BY post_id
        ) n1 ON n1.post_id=posts.id
        WHERE u1.id IN ( SELECT user_id FROM followers WHERE follower_id = $1 )
        OR u1.id IN ( SELECT users.id FROM users WHERE users.id = $1 )
        GROUP BY u1.id, shares.post_id, shares.id, u2.id, posts.link, posts.description, n1.repost_number
        ORDER BY shares.created_at;`,
    [followerId]
  );
};

const getNewSharedPosts = async (followerId, time) => {
  return await connection.query(
    `
    SELECT shares.post_id as id, shares.id as shared_id, u2.id as user_id, u2.username, 
    posts.link, posts.description, shares.created_at, u1.id as shared_by_id, 
    u1.username as shared_by_username, COALESCE(n1.repost_number, 0) AS repost_count,
         ARRAY_REMOVE(
            ARRAY_AGG(t2.username 
              ORDER BY likes.id DESC), NULL) AS likes
        FROM shares 
        JOIN users as u1 ON shares.user_id=u1.id
        JOIN posts ON shares.post_id=posts.id
        JOIN users as u2 ON posts.user_id=u2.id
        LEFT JOIN likes ON posts.id = likes.post_id
        LEFT JOIN users AS t2 ON likes.user_id = t2.id
          LEFT JOIN (
        SELECT shares.post_id, COUNT(post_id) AS repost_number
          FROM shares
        JOIN posts ON shares.post_id=posts.id
        GROUP BY post_id
        ) n1 ON n1.post_id=posts.id
        WHERE (u1.id IN ( SELECT user_id FROM followers WHERE follower_id = $1 )
        OR u1.id IN ( SELECT users.id FROM users WHERE users.id = $1 ))
        AND shares.created_at > $2
        GROUP BY u1.id, shares.post_id, shares.id, u2.id, posts.link, posts.description, n1.repost_number
        ORDER BY shares.created_at;`,
    [followerId, time]
  );
};

const getSharedPostsById = async (userId) => {
  return await connection.query(
    `
    SELECT shares.post_id as id, shares.id as shared_id, u2.id as user_id, u2.username, 
    posts.link, posts.description, shares.created_at, u1.id as shared_by_id, 
    u1.username as shared_by_username, COALESCE(n1.repost_number, 0) AS repost_count,
         ARRAY_REMOVE(
            ARRAY_AGG(t2.username 
              ORDER BY likes.id DESC), NULL) AS likes
        FROM shares 
        JOIN users as u1 ON shares.user_id=u1.id
        JOIN posts ON shares.post_id=posts.id
        JOIN users as u2 ON posts.user_id=u2.id
        LEFT JOIN likes ON posts.id = likes.post_id
        LEFT JOIN users AS t2 ON likes.user_id = t2.id
          LEFT JOIN (
        SELECT shares.post_id, COUNT(post_id) AS repost_number
          FROM shares
        JOIN posts ON shares.post_id=posts.id
        GROUP BY post_id
        ) n1 ON n1.post_id=posts.id
        WHERE u1.id = $1
        GROUP BY u1.id, shares.post_id, shares.id, u2.id, posts.link, posts.description, n1.repost_number
        ORDER BY shares.created_at;`,
    [userId]
  );
};

const insertSharedPost = async ({ userId, postId }) => {
  return await connection.query(
    `
    INSERT INTO shares (user_id, post_id) VALUES ($1, $2)`,
    [userId, postId]
  );
};

const sharesRepository = {
  getSharedPosts,
  getNewSharedPosts,
  getSharedPostsById,
  insertSharedPost,
};

export default sharesRepository;
