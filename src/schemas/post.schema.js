import Joi from "joi";

const postSchema = Joi.object({
  link: Joi.string().uri().required(),
  message: Joi.string(),
});

export { postSchema };
