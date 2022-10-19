import Joi from "joi";

const postSchema = Joi.object({
  link: Joi.string().uri().required(),
  description: Joi.string(),
});

export { postSchema };
