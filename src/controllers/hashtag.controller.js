import connection from "../database/database.js";

const addHashtags = async (req, res, next) => {
  const { message } = res.locals.body;

  try {
    const hashtagArray = checkHashtag(message);
    const hashtagIdArray = [];

    hashtagArray.forEach(async (hashtag) => {
      const hashtagName = await connection.query(
        `SELECT * FROM hashtags WHERE name = $1;`,
        [hashtag]
      );
      if (hashtagName.rowCount === 0) {
        await connection.query(`INSERT INTO hashtags (name) VALUES ($1);`, [
          hashtag,
        ]);
        const currentHashtag = (
          await connection.query(`SELECT * FROM hashtags WHERE name = $1`, [
            hashtag,
          ])
        ).rows[0];
        hashtagIdArray.push(currentHashtag.id);
      } else {
        hashtagIdArray.push(hashtagName.rows[0].id);
      }
    });

    res.locals.hashtags = [...hashtagIdArray];
    next();
  } catch (error) {
    res.status(400).send({ error });
  }
};

const checkHashtag = (text) => {
  const words = text.split(" ");
  const wordsFiltered = words.filter(
    (word) =>
      word.includes("#") &&
      word.indexOf("#") === 0 &&
      (word.match(/#/g) || []).length === 1
  );
  return wordsFiltered.map((word) => word.slice(-(word.length - 1)));
};
