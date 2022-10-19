import connection from "../database/database.js";

async function updateExpiredSession(token) {
  return connection.query(
    `UPDATE sessions SET "valid" = $1 WHERE "token" = $2;`,
    [false, token]
  );
}

async function getSession({ userId, token }) {
  return connection.query(
    `SELECT * FROM sessions WHERE user_id = $1
    AND token = $2 AND valid = TRUE`,
    [userId, token]
  );
}

export { updateExpiredSession, getSession };
