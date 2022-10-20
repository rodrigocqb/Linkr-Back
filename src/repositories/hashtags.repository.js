import connection from "../database/database.js";

const getHashtagByName = async (name) => {
  return await connection.query(`SELECT * FROM hashtags WHERE name = $1;`, [
    name,
  ]);
};
const getHashtagByIdPost = async (id) => {
  return await connection.query(`SELECT ARRAY_AGG(hashtags.name) AS hashtag FROM hashtags JOIN posts_hashtags ON posts_hashtags.hashtag_id = hashtags.id JOIN posts ON posts.id = posts_hashtags.post_id WHERE posts_hashtags.post_id = $1;`, [
    id,
  ]);
};

const insertNewHashtag = async (name) => {
  return await connection.query(`INSERT INTO hashtags (name) VALUES ($1);`, [
    name,
  ]);
};

const hashtagsRepository = {
  getHashtagByName,
  getHashtagByIdPost,
  insertNewHashtag,
};


export { hashtagsRepository };
