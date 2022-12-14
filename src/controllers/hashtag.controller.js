import { okResponse, serverError } from "../helpers/controllers.helper.js";
import { commentRepository } from "../repositories/comments.repository.js";
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

    res.locals.description = description;
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

export async function getTrends(req, res) {
  try {
    const { rows: trends } = await hashtagsRepository.getTrends();
    res.send(trends);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getPostsHashtags(req, res) {
  const { hashtag } = req.params;
  const cut = req.query.cut;
  try {
    const posts = (await hashtagsRepository.getPostsByHashtags(hashtag, cut)).rows;
    const timeline = await Promise.all(
      posts.map(async (post) => {
        const hashtags = (await hashtagsRepository.getHashtagByIdPost(post.id))
          .rows[0]?.hashtag;
        const comments = (await commentRepository.getComments(post.id)).rows;
        return { ...post, hashtags, comments };
      })
    );
    return okResponse(res, timeline);
  } catch (error) {
    console.log(error.message);
    return serverError(res);
  }
}

export { addHashtags };
