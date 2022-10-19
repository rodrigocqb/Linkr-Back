const STATUS_CODE = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
});

const STATUS_TEXT = Object.freeze({
  OK: "OK",
  CREATED: "Created",
  NO_CONTENT: "No content",
  UNAUTHORIZED: "User not authorized",
  NOT_FOUND: "Object not found",
  CONFLICT: "Username or email already registered",
  UNPROCESSABLE_ENTITY: "Unprocessable entity",
  SERVER_ERROR: "Server error",
});

function okResponse(res, body = STATUS_TEXT.OK) {
  return res.status(STATUS_CODE.OK).send(body);
}

function createdResponse(res, body = STATUS_TEXT.CREATED) {
  return res.status(STATUS_CODE.CREATED).send(body);
}

function noContentResponse(res, body = STATUS_TEXT.NO_CONTENT) {
  return res.status(STATUS_CODE.NO_CONTENT).send(body);
}

function unauthorizedResponse(res, body = STATUS_TEXT.UNAUTHORIZED) {
  return res.status(STATUS_CODE.UNAUTHORIZED).send(body);
}

function notFoundResponse(res, body = STATUS_TEXT.NOT_FOUND) {
  return res.status(STATUS_CODE.NOT_FOUND).send(body);
}

function conflictResponse(res, body = STATUS_TEXT.CONFLICT) {
  return res.status(STATUS_CODE.CONFLICT).send(body);
}

function unprocessableEntityResponse(
  res,
  body = STATUS_TEXT.UNPROCESSABLE_ENTITY
) {
  return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(body);
}

function serverError(res, body = STATUS_TEXT.SERVER_ERROR) {
  return res.status(STATUS_CODE.SERVER_ERROR).send(body);
}
