import connection from "../database/database.js";

const getHashtagByName = async (name) => {
  return await connection.query(`SELECT * FROM hashtags WHERE name = $1;`, [
    name,
  ]);
};
const getHashtagByIdPost = async (id) => {
  return await connection.query(`SELECT COALESCE(ARRAY_AGG(hashtags.name),'{}') 
  AS hashtag FROM hashtags LEFT JOIN 
  posts_hashtags ON posts_hashtags.hashtag_id = hashtags.id 
  LEFT JOIN posts ON posts.id = posts_hashtags.post_id 
  WHERE posts_hashtags.post_id = $1;`, [
    id,
  ]);
};
async function getTrends() {
  return connection.query(`SELECT hashtags.name FROM hashtags 
  LEFT JOIN posts_hashtags ON posts_hashtags.hashtag_id = hashtags.id  
  LEFT JOIN posts ON posts.id = posts_hashtags.post_id 
  GROUP BY hashtags.name ORDER BY COUNT(posts.id) DESC LIMIT 10
`);
}
async function getPostsByHashtags(hashtag, cut) {
  return connection.query(
    `SELECT t1.id AS user_id, t1.username, t1.image, 
    posts.id, posts.link, posts.description, COALESCE(n1.repost_number, 0) AS repost_count,
    ARRAY_REMOVE(
      ARRAY_AGG(t2.username 
        ORDER BY likes.id DESC), NULL) AS likes
    FROM posts 
    JOIN users AS t1
    ON posts.user_id = t1.id
    JOIN posts_hashtags ON posts.id = posts_hashtags.post_id
    JOIN hashtags ON posts_hashtags.hashtag_id = hashtags.id
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
    WHERE hashtags.name = $1
    GROUP BY t1.id, posts.id, n1.repost_number
    ORDER BY posts.id DESC
    OFFSET $2 LIMIT 20`,
    [hashtag, cut]
  );
}
const insertNewHashtag = async (name) => {
  return await connection.query(`INSERT INTO hashtags (name) VALUES ($1);`, [
    name,
  ]);
};

const hashtagsRepository = {
  getHashtagByName,
  getTrends,
  getPostsByHashtags,
  getHashtagByIdPost,
  insertNewHashtag,
};


export { hashtagsRepository };
