import { unprocessableEntityResponse } from "../helpers/controllers.helper";

const schemaMiddleware = (schema) => {
  return (req, res, next) => {
    const body = req.body;

    const validate = schema.validate(body, { abortEarly: false });

    if (validate.error) {
      const errors = validate.error.details.map((detail) => detail.message);
      return unprocessableEntityResponse(res, errors);
    }

    res.locals.body = body;
    return next();
  };
};

export { schemaMiddleware };
