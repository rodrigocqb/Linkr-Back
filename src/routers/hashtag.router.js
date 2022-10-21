import { Router } from 'express';
import { getTrends } from '../controllers/hashtag.controller.js';
import { auth } from "../middlewares/authorization.middleware.js";

const hashtagsRouters = Router();

hashtagsRouters.get('/trends',auth, getTrends);

export default hashtagsRouters;