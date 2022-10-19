import connection from "../database/database.js";

const getHashtagByName = async (name) => {
  return await connection.query(`SELECT * FROM hashtags WHERE name = $1;`, [
    name,
  ]);
};

const insertNewHashtag = async (name) => {
  return await connection.query(`INSERT INTO hashtags (name) VALUES ($1);`, [
    name,
  ]);
};

const hashtagsRepository = {
  getHashtagByName,
  insertNewHashtag,
};

export { hashtagsRepository };
