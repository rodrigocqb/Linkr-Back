import Joi from "joi";

const postSchema = Joi.object({
  link: Joi.string().uri().required(),
  description: Joi.string().allow(null, ""),
});

export { postSchema };
