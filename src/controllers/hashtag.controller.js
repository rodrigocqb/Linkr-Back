import { serverError } from "../helpers/controllers.helper.js";
import { hashtagsRepository } from "../repositories/hashtags.repository.js";

const addHashtags = async (req, res, next) => {
  const { description } = res.locals.body;

  try {
    const hashtagArray = checkHashtag(description);
    const hashtagIdArray = [];

    for (let i = 0; i < hashtagArray.length; i++) {
      const hashtag = hashtagArray[i];
      const hashtagName = await hashtagsRepository.getHashtagByName(hashtag);

      if (hashtagName.rowCount === 0) {
        await hashtagsRepository.insertNewHashtag(hashtag);

        const currentHashtag = (
          await hashtagsRepository.getHashtagByName(hashtag)
        ).rows[0];

        hashtagIdArray.push(currentHashtag.id);
      } else {
        const hashtagId = hashtagName.rows[0].id;
        hashtagIdArray.push(hashtagId);
      }
    }
    const text = filterDescription(description);
    res.locals.description = text;
    res.locals.hashtags = [...hashtagIdArray];
    return next();
  } catch (error) {
    return serverError(res);
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

const filterDescription = (text) => {
  const words = text.split(" ");
  const description = words.filter(
    (word) => !word.includes("#") && (word.match(/#/g) || []).length === 0
  );
  return description.join(" ");
};

export { addHashtags };
