import { Router } from 'express';
import { getPostsHashtags, getTrends } from '../controllers/hashtag.controller.js';
import { auth } from "../middlewares/authorization.middleware.js";

const hashtagsRouters = Router();

hashtagsRouters.get('/trends',auth, getTrends);
hashtagsRouters.get("/hashtag/:hashtag", auth, getPostsHashtags);
export default hashtagsRouters;