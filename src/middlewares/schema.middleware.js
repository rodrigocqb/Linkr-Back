import { unprocessableEntityResponse } from "../helpers/controllers.helper.js";

const schemaMiddleware = (schema) => {
  return (req, res, next) => {
    const body = req.body;

    const validation = schema.validate(body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return unprocessableEntityResponse(res, errors);
    }

    res.locals.body = body;
    return next();
  };
};

export { schemaMiddleware };
